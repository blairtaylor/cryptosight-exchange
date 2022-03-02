// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat')
const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // deploy Greeter
  const Greeter = await hre.ethers.getContractFactory('Greeter')
  const greeter = await Greeter.deploy('Hello, Hardhat!')

  await greeter.deployed()

  console.log('Greeter deployed to:', greeter.address)

  // deploy Migrations
  const Migrations = await hre.ethers.getContractFactory('Migrations')
  const migrations = await Migrations.deploy()

  await migrations.deployed()

  console.log('Migrations deployed to:', migrations.address)

  // deploy Token
  const Token = await hre.ethers.getContractFactory('Token')
  const token = await Token.deploy()

  await token.deployed()

  console.log('Token deployed to:', token.address)

  // deploy Exchange
  const Exchange = await hre.ethers.getContractFactory('Exchange')
  const exchange = await Exchange.deploy(ETHER_ADDRESS, 1)

  await exchange.deployed()

  console.log('Exchange deployed to:', exchange.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
