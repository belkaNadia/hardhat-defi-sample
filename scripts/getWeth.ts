//@ts-ignore
import { ethers, getNamedAccounts, network } from "hardhat";
import { networkConfig } from "../helper-hardhat-config";

export const AMOUNT = ethers.utils.parseEther("0.1").toString();

export async function getWeth() {
  console.log("Getting WETH", AMOUNT);
  const { deployer } = (await getNamedAccounts()) as { deployer: any };
  console.log(`Getting WETH for ${deployer}`);
  const iWeth = await ethers.getContractAt(
    "IWeth",
    networkConfig[network.config!.chainId!].wethToken!,
    deployer
  );
  const txResponse = await iWeth.deposit({
    value: AMOUNT,
  });
  await txResponse.wait(1);
  const wethBalance = await iWeth.balanceOf(deployer);
  console.log(`Got ${wethBalance.toString()} WETH`);
}
