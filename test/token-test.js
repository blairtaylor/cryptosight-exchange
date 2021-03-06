const { expect } = require('chai')
const { ethers } = require('hardhat')

const name = 'Capstone Token'
const symbol = 'CSTK'
const decimals = '18'

describe('Token', function () {
  it('Running Token test cases', async function () {
    const Token = await ethers.getContractFactory('Token')
    const token = await Token.deploy()
    await token.deployed()
    const oneEther = ethers.BigNumber.from('1000000000000000000')
    const totalTokens = 1000000
    const totalSupplyTokens = oneEther.mul(totalTokens)
    const accounts = await ethers.getSigners(); // get list of accounts
    const deployer = accounts[0];

    // test name
    expect(await token.name()).to.equal(name)
    // test symbol
    expect(await token.symbol()).to.equal(symbol)
    // test decimals
    expect(await token.decimals()).to.equal(decimals)
    // test total supply is tokens * 10^18
    expect(await token.totalSupply()).to.equal(totalSupplyTokens)
    // test that all tokens are assigned to deployer
    expect(await token.balanceOf(deployer.address)).to.equal(totalSupplyTokens);
  })
})
