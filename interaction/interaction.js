const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const metadata = require('../tokens/slavetoken.sol');
const abi = metadata.abi;
const contractAddress = "0x634Fc06a56803b0Dd200e35E72896f81503F3DCA";


async function getMainAccount() {
    let accounts = await web3.eth.getAccounts();
    return accounts[0];
  }
  
async function main() {
    const mainAccount = await getMainAccount();
    const counter = new web3.eth.Contract(abi, contractAddress);
    counter.methods.balanceOf(getMainAccount).call();
}

main();