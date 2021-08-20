pragma solidity ^0.6.8;

import "./Metadata.sol";
import "./buyable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


/**
 * Written by billyrennekamp & small changes by paul & max
 * The FlowerToken contract does this and that...
 */
contract FlowerToken is ERC721, Ownable {

    Metadata public metadata;
    ERC721Basic public legacy;

    event minted(
        uint256 tokenid
    );

    mapping(uint256 => bool) public converted;

    constructor(Metadata _metadata, ERC721Basic _legacy) public ERC721("terra0 Flowertoken", "tr0") {
        metadata = _metadata;
        legacy = _legacy;
    }

    function convertToNew(uint256 tokenId) public {
        require(legacy.ownerOf(tokenId) == msg.sender, "FlowerToken: covertToNew(): you can't convert flower you don't own");
        // check if token has already been converted 
        bool exists = _exists(tokenId);
        // if true: mint & transfer 
        if (exists == false) {
            _mint(legacy.ownerOf(tokenId), tokenId);
            emit minted(tokenId);
            legacy.transferFrom(msg.sender, address(this), tokenId);
            converted[tokenId] = true;
            address currentOwner = ownerOf(tokenId);
            if (currentOwner != msg.sender) {
                _transfer(currentOwner, msg.sender, tokenId);
            }
        // else: just transfer 
        } else {
            legacy.transferFrom(msg.sender, address(this), tokenId);
            converted[tokenId] = true;
            address currentOwner = ownerOf(tokenId);
            if (currentOwner != msg.sender) {
                _transfer(currentOwner, msg.sender, tokenId);
            }
        }
    }

    function convertToOld(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "FlowerToken: covertToOld(): you can't convert flower you don't own");
        require(converted[tokenId] == true, "Flowertoken: covertToOld(): flower already old token type");
        _transfer(msg.sender, address(this), tokenId);
        legacy.transferFrom(address(this), msg.sender, tokenId);
    }

    /**
     * @dev See {IERC721-transferFrom}.
     */
    function transferFrom(address from, address to, uint256 tokenId) public virtual override {
        require(converted[tokenId], "Must convert original flower");
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");

        _transfer(from, to, tokenId);
    }

    function updateMetadata(Metadata _metadata) public onlyOwner {
        metadata = _metadata;
    }
    function tokenURI(uint256 _tokenId) public override view returns (string memory _infoUrl) {
        return Metadata(metadata).tokenURI(_tokenId);
    }
}
