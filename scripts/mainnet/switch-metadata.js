const Metadata = artifacts.require('./Metadata.sol');
const FlowerToken = artifacts.require('./FlowerToken.sol');
const LegacyFlowerToken = artifacts.require('./buyable.sol');
const contracts = require('../../contractAddresses.json');
require('dotenv').config()

module.exports = async function(callback) {

const user = process.env.RINKEBYACCOUNT;
// const legacy = await LegacyFlowerToken.at(contracts.rinkeby.LEGACY);
const flowertoken = await FlowerToken.at(contracts.mainnet.FLOWERTOKENS);
const metadata = await Metadata.at(contracts.mainnet.METADATA);

    try {

        console.log(flowertoken.address)
        console.log(metadata.address)

        console.log('updating metadata contract');
        await flowertoken.updateMetadata(metadata.address);
        console.log('updated!'); 

    } catch (error) {
        
        console.log(error);
    }

    callback();

}
