import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  const name = process.env.TOKEN_NAME || "MyToken";
  const symbol = process.env.TOKEN_SYMBOL || "MYT";
  const initialSupply = BigInt(process.env.TOKEN_INITIAL_SUPPLY || "1000000") * 10n ** 18n;

  const MyToken = await ethers.getContractFactory("MyToken");
  const token = await MyToken.deploy(name, symbol, deployer.address, initialSupply);
  await token.waitForDeployment();

  console.log("MyToken deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


