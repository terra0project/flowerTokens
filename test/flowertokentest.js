const { expect } = require('chai');
//const { constants, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const FlowerToken = artifacts.require('FlowerToken');
const Metadata = artifacts.require('Metadata');
const { toWei } = web3.utils;

const { toWei } = web3.utils;

console.log("HEYYY")

// contract('Newflowertoken', (accounts) => {
//     let newtoken;
//     let metadata;
//
//     before('deploy', async () => {
//        flowerToken = await FlowerToken.new();
//        tempOracle = await Metadata.new();
//      });
//
//      it('get tokenURI', async () => {
//        console.log("get here")
//     );
//     });
// }
//
