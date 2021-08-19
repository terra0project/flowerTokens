var Metadata = artifacts.require('./Metadata.sol')
var FlowerToken = artifacts.require('./FlowerToken.sol')
var LegacyFlowerToken = artifacts.require('./buyable.sol')
const fs = require('fs');
let _ = '        '

module.exports = (deployer, helper, accounts) => {
  deployer.then(async () => {

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
