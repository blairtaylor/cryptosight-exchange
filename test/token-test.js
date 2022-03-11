const { expect } = require('chai')
const { ethers } = require('hardhat')
const Web3 = require('web3')
//const { web3 } = require("web3");

//const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'

const name = 'Capstone Token'
const symbol = 'CSTK'
const decimals = '18'
//const totalSupply = 1000000 * (10 ** decimals).toString();

describe('Greeter', function () {
  it('Running Greeter test cases', async function () {
    const Greeter = await ethers.getContractFactory('Greeter')
    const greeter = await Greeter.deploy('Hello, world!')
    await greeter.deployed()

    expect(await greeter.greet()).to.equal('Hello, world!')

    const setGreetingTx = await greeter.setGreeting('Hola, mundo!')

    // wait until the transaction is mined
    await setGreetingTx.wait()

    expect(await greeter.greet()).to.equal('Hola, mundo!')
  })
})

describe('Token', function () {
  it('Running Token test cases', async function () {
    const Token = await ethers.getContractFactory('Token')
    const token = await Token.deploy()
    await token.deployed()
    const oneEther = ethers.BigNumber.from('1000000000000000000')
    const totalTokens = 1000000
    const totalSupplyTokens = oneEther.mul(totalTokens)

    //const [owner] = await ethers.getSigners()
    //const transactionCount = await owner.getTransactionCount()

    before(async function () {
      //accounts = await web3.eth.getAccounts();
    })

    expect(await token.name()).to.equal(name)
    expect(await token.symbol()).to.equal(symbol)
    expect(await token.decimals()).to.equal(decimals)
    // total supply is tokens * 10^18
    expect(await token.totalSupply()).to.equal(totalSupplyTokens)
    //expect(transactionCount).to.equal(owner)
    //expect(await token.balanceOf(owner)).to.equal(totalSupplyTokens);
  })
})
