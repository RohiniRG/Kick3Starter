import { ethers } from "ethers";
declare const window: any;

const web3Provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum);

export default web3Provider;
