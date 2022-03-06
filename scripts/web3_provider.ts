import { ethers } from "ethers";
declare const window: any;

let web3Provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    web3Provider = new ethers.providers.Web3Provider(window.ethereum);
}
else {
    web3Provider = new ethers.providers.JsonRpcProvider(`${process.env.RINKEBY_API}`)
}

export default web3Provider;
