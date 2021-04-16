var Metadata = artifacts.require('./Metadata.sol')
var FlowerToken = artifacts.require('./FlowerToken.sol')
let _ = '        '
const legacy = '0x43c9b7b7ce699ac2c1d3aad3b5a78274a0f9c86d'
module.exports = (deployer, helper, accounts) => {

  deployer.then(async () => {
    try {
      // Deploy Metadata.sol
      await deployer.deploy(Metadata)
      let metadata = await Metadata.deployed()
      console.log(_ + 'Metadata deployed at: ' + metadata.address)

       // Deploy FlowerToken.sol
       await deployer.deploy(FlowerToken, metadata.address, legacy)
       let flowerToken = await FlowerToken.deployed()
       console.log(_ + 'FlowerToken deployed at: ' + flowerToken.address)

    } catch (error) {
      console.log(error)
    }
  })
}
