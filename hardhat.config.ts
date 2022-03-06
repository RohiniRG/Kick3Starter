import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";

module.exports = {
  solidity: "0.7.3",
    networks: {
     rinkeby: {
       url: `${process.env.RINKEBY_API}`, 
       accounts: [`${process.env.PRIVATE_KEY}`] // add the account that will deploy the contract (private key)
      },
    }  
};
