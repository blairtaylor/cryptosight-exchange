const { expect } = require("chai");
const { ethers } = require("hardhat");

const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'

describe("Greeter", function () {
  it("Running Greeter test cases", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

describe("Token", function () {
  it("Running Token test cases", async function () {
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    await token.deployed();

    expect(await token.name()).to.equal("Capstone Token");

  });
});
