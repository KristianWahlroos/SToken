const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const metadata = require('../build/contracts/slavetoken');
const abi = metadata.abi;
const contractAddress = "0xFa4d529B331dBA1a1b2383A93d7f3150f3222254";
const counter = new web3.eth.Contract(abi, contractAddress).then((receipt) => console.log(counter));



function getMainAccount() {
    let accounts = web3.eth.getAccounts(); 
    console.log("hh");
    return accounts[0];
}

    function main() {
        let mainAccount = getMainAccount();
        counter.methods.work(0).send({from: "0x893ba6b0794300695bd2bcb08e59dec5138b9486"})
        .then((receipt) => {
        // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
    })
    .catch((e) => console.log(e));
}
    
  
    
main();