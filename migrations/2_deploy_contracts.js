var Metadata = artifacts.require('./Metadata.sol')
var FlowerToken = artifacts.require('./FlowerToken.sol')
var LegacyFlowerToken = artifacts.require('./buyable.sol')
const fs = require('fs');
let _ = '        '
//localtest
//const legacy = '0x43c9b7b7ce699ac2c1d3aad3b5a78274a0f9c86d'
var file = String(process.env.PATHTOLEGACY)

module.exports = (deployer, helper, accounts) => {
  deployer.then(async () => {
    // let rawdata = fs.readFileSync(file);
    // let theabi = JSON.parse(rawdata);
    // console.log("legacy contract deployed at:")
    // console.log(theabi)
    //localtest
    //let legacy = theabi["networks"]["5777"]["address"];

    // let legacy = "0x8c1fb8B9a159D3F0aB00Bf1E067F46d30A9a1b3E"
    // console.log(legacy)
    try {
      // deploy legacy 
      await deployer.deploy(LegacyFlowerToken)
      let legacy = await LegacyFlowerToken.deployed()
      console.log(_ + 'Legacy deployed at: ' + legacy.address)
      // Deploy Metadata.sol
      await deployer.deploy(Metadata)
      let metadata = await Metadata.deployed()
      console.log(_ + 'Metadata deployed at: ' + metadata.address)

       // Deploy FlowerToken.sol
       await deployer.deploy(FlowerToken, metadata.address, legacy.address)
       let flowerToken = await FlowerToken.deployed()
       console.log(_ + 'FlowerToken deployed at: ' + flowerToken.address)

    } catch (error) {
      console.log(error)
    }
  })
}
