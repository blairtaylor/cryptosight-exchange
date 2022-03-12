const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Exchange', function () {
  it('Running Exchange test cases', async function () {
    // get accounts
    const accounts = await ethers.getSigners() // get list of accounts
    const deployer = accounts[0]
    const feeAccount = accounts[1]
    const user1 = accounts[2]
    const feePercent = 10
    let balance;

    // address constant ETHER = address(0); // store Ether in tokens mapping with blank address

    // deploy Token
    const Token = await ethers.getContractFactory('Token')
    const token = await Token.deploy()
    await token.deployed()

    // deploy Exchange
    const Exchange = await ethers.getContractFactory('Exchange')
    const exchange = await Exchange.deploy(feeAccount.address, feePercent)
    await exchange.deployed()

    // Transfer 100 tokens to user1
    const oneEther = ethers.BigNumber.from('1000000000000000000')
    const oneHundredTokens = oneEther.mul(100)
    token.transfer(user1.address, oneHundredTokens, { from: deployer.address })

    // tracks the fee account
    expect(await exchange.feeAccount()).to.equal(feeAccount.address)

    // tracks the fee percent
    expect(await exchange.feePercent()).to.equal(feePercent)

    // check user1 balance
    balance = await exchange.balanceOf(token.address, user1.address)
    expect(balance).to.equal(oneHundredTokens);
  })
})
