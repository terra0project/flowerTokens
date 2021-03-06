const Metadata = artifacts.require('./Metadata.sol');
const FlowerToken = artifacts.require('./FlowerToken.sol');
const LegacyFlowerToken = artifacts.require('./buyable.sol');
const contracts = require('../contractAddresses.json');
require('dotenv').config()

module.exports = async function(callback) {

const user = process.env.RINKEBYACCOUNT;
const legacy = await LegacyFlowerToken.at(contracts.rinkeby.LEGACY);
const flowertoken = await FlowerToken.at(contracts.rinkeby.FLOWERTOKENS);

    try {

        console.log('minting legacy');
        await legacy._mint(user, 1, { from: user }); 
        console.log('legacy minted, approving legacy -> flowertokens transfer');
        await legacy.approve(flowertoken.address,1, { from: user });
        console.log('approved, converting token');
        let tx = await flowertoken.convertToNew(1, { from: user });
        console.log('token converted to new token!')
        console.log(tx); 

    } catch (error) {
        console.log(error);
    }

    callback();

}

