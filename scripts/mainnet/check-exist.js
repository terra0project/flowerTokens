const Metadata = artifacts.require('./Metadata.sol');
const FlowerToken = artifacts.require('./FlowerToken.sol');
const contracts = require('../../contractAddresses.json');
require('dotenv').config()
const fs = require('fs');
const BigNumber = require('bignumber.js');
const { toWei } = web3.utils;


module.exports = async function(callback) {

    const user = process.env.MAINNET_ACCOUNT;
    const flowertoken = await FlowerToken.at(contracts.mainnet.FLOWERTOKENS);
    const metadata = await Metadata.at(contracts.mainnet.METADATA);

    try {
    
        let now = await web3.eth.getBlockNumber();
        let prev = now - BigNumber(60*60*24*30); // now - 1 month
    
        let wrapped = await flowertoken.getPastEvents('minted', {
            fromBlock: 11271944,
            toBlock: now
        });
        
        console.log(`number of tokens wrapped: ${wrapped.length}`);

        let i;
        for(i=0;i<wrapped.length;i++){

            console.log(`token ${new BigNumber(wrapped[i].args.tokenid)} has been wrapped`)

        }


    } catch (error) {
        
        console.log(error);
    }

    callback();

}

