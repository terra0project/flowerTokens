/*global artifacts, web3, contract, before, it, accounts, context*/

const { expect } = require('chai');
const { constants, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const FlowerToken = artifacts.require('FlowerToken');
const Buyable = artifacts.require('buyable');
const Metadata = artifacts.require('Metadata');
const InfrastructurePool = artifacts.require('infrastructurePool')
const { toWei } = web3.utils;


contract('FlowerToken', (accounts) => {
    let flowertoken;
    let buyable;
    let infra; 
    let metadata;

    before('deploy', async () => {
        legacy = await Buyable.new();
        // console.log(`TEST LEGACY ADDRESS: ${buyable.address}`)
        infra = await InfrastructurePool.new();
        // console.log(`TEST INFRA ADDRESS: ${infra.address}`)
        metadata = await Metadata.new();
        // console.log(`TEST METADATA ADDRESS: ${metadata.address}`)
        flowertoken = await FlowerToken.new(metadata.address,legacy.address);
        // console.log(`TEST FLOWERTOKENNEW ADDRESS: ${flowertoken.address}`)
     });

     context("» contract deploys properly", () => {
        context("» parameters are valid", () => {
            it("deploys properly", async () => {    
                expect((await flowertoken.legacy()).toString()).to.equal((legacy.address).toString());
                expect((await flowertoken.metadata()).toString()).to.equal((metadata.address).toString());
            });
        });
        context("» convertToNew()", () => {
            before("before ", async () => {
                await legacy.initialisation(infra.address);
                await legacy._mint(accounts[0],1);
                await legacy._mint(accounts[2],2);
            });
            it("mints a new flowertoken & transfers the old one from caller", async () => {
                expect((await legacy.balanceOf(accounts[0])).toString()).to.equal('1');
                await legacy.approve(flowertoken.address,1);
                let tx = await flowertoken.convertToNew(1, { from: accounts[0]});
                await expectEvent.inTransaction(tx.tx, flowertoken, "minted");
                expect((await legacy.balanceOf(accounts[0])).toString()).to.equal('0');
                expect((await flowertoken.balanceOf(accounts[0])).toString()).to.equal('1')
            });
            it("doesn't if the caller doesn't own a legacy token", async () => {
                expect((await legacy.balanceOf(accounts[1])).toString()).to.equal('0');
                await expectRevert(
                    flowertoken.convertToNew(2, { from: accounts[1] }),
                    "FlowerToken: covertToNew(): you can't convert flower you don't own"
                );
            });
            it("doesn't if it already exists", async () => {
                expect((await legacy.balanceOf(accounts[2])).toString()).to.equal('1');
                expect((await flowertoken.balanceOf(accounts[2])))
                await legacy.approve(flowertoken.address,2, { from: accounts[2] });
                let tx = await flowertoken.convertToNew(2, { from: accounts[2] });
                expectEvent.inTransaction(tx.tx, flowertoken, "Transfer");
                expectEvent.inTransaction(tx.tx, flowertoken, "minted");

                await flowertoken.convertToOld(2, { from: accounts[2] });
                await legacy.approve(flowertoken.address,2, { from: accounts[2] });
                await flowertoken.convertToNew(2, { from: accounts[2] });
            });
        });
        context("» convertToOld()", () => {
            it("returns the legacy token to the owner", async () => {
                expect((await legacy.balanceOf(accounts[0])).toString()).to.equal('0');
                expect((await flowertoken.balanceOf(accounts[0])).toString()).to.equal('1');
                await flowertoken.convertToOld(1);
                expect((await legacy.balanceOf(accounts[0])).toString()).to.equal('1');
                expect((await flowertoken.balanceOf(accounts[0])).toString()).to.equal('0');
            });
            it("doesn't if the caller doesn't own a new flowertoken", async () => {
                expect((await legacy.balanceOf(accounts[1])).toString()).to.equal('0');
                await expectRevert(
                    flowertoken.convertToOld(2, { from: accounts[1] }),
                    "FlowerToken: covertToOld(): you can't convert flower you don't own"
                );            
            });
        }); 
        context(" generic", () => {
            it('returns token data', async () => {
                expect(await flowertoken.tokenURI(1)).to.equal("https://ipfs.terra0.org/ipfs/QmaGev3DaQdzvoFRADQneNndv7tZQVY3LsPnat9EHK4hF3/1.json");
            });
            it('only owner can set a new metadata contract', async () => {
                let newMetadata = await Metadata.new();
                await expectRevert(
                    flowertoken.updateMetadata(newMetadata.address,{from:accounts[1]}),
                    'Ownable: caller is not the owner'
                );
            });
            it('sets a new metadata contract', async () => {
                let newMetadata = await Metadata.new();
                await flowertoken.updateMetadata(newMetadata.address);
                expect(await flowertoken.metadata()).to.equal(newMetadata.address);
            });        
        });
    });

});