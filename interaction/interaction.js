var ethers = require('ethers');
var httpProvider = new ethers.providers.JsonRpcProvider();

let abi = [
    "function createFirstSlave() public",
    "function balanceOf(address _owner) external view returns (uint256)",
    "function work(uint _slaveId) external",
    "function beFruitful(uint _slaveId, uint _targetId) external",
    "function transferFrom( address _from, address _to, uint256 _tokenId) external",
    "function ownerOf(uint256 _tokenId) external view returns (address)",
    "function setCooldownTime(uint _seconds) public"
]

//INSERT HERE YOUR OWN CONTRACT ADDRESS!
const contractAddress = "0x20dc1E6bb28eE94e39Fd7Df817eE8D2c6062027d";

var signer0 = httpProvider.getSigner(0);
var signer1 = httpProvider.getSigner(1);
var signer2 = httpProvider.getSigner(2);
var signer3 = httpProvider.getSigner(3);
var contract = new ethers.Contract(contractAddress, abi, httpProvider);


let contractAsSigner0 = contract.connect(signer0);
let contractAsSigner1 = contract.connect(signer1);
let contractAsSigner2 = contract.connect(signer2);
let contractAsSigner3 = contract.connect(signer3);

testSlaves();

async function testSlaves(){
    await _setCooldownTime(0);
    await _createSlave(contractAsSigner0);
    await _createSlave(contractAsSigner1);
    await _createSlave(contractAsSigner2);
    await _createSlave(contractAsSigner3);
    await httpProvider.listAccounts().then(result => _getBalance(result, 0));
    await httpProvider.listAccounts().then(result => _getBalance(result, 1));
    await httpProvider.listAccounts().then(result => _getBalance(result, 2));
    await httpProvider.listAccounts().then(result => _getBalance(result, 3));
    for(i = 0; i < 50; i++) {
        await _beFruitful(contractAsSigner0, 0, 1);
        await _beFruitful(contractAsSigner2, 2, 3);
        await _work(contractAsSigner0, 0);
        await _work(contractAsSigner1, 1);
        await _work(contractAsSigner2, 2);
        await httpProvider.listAccounts().then(result => _getBalance(result, 0));
        await httpProvider.listAccounts().then(result => _getBalance(result, 1));
        await httpProvider.listAccounts().then(result => _getBalance(result, 2));
        await httpProvider.listAccounts().then(result => _getBalance(result, 3));
    }
    await httpProvider.listAccounts().then(result => _transferFrom(contractAsSigner1, result[1],result[0], 1));
    await httpProvider.listAccounts().then(result => _transferFrom(contractAsSigner2, result[2],result[0], 2));
    await httpProvider.listAccounts().then(result => _getBalance(result, 0));
    await httpProvider.listAccounts().then(result => _getBalance(result, 1));
    await httpProvider.listAccounts().then(result => _getBalance(result, 2));
    await httpProvider.listAccounts().then(result => _getBalance(result, 3));
}

function _work(contractAsSigner, slaveId){
    var workPromise = contractAsSigner.work(slaveId);
    workPromise.then(function(tx) {
        console.log("slave " + slaveId + " working!");
    })
    .catch((e) => console.log(e));
}

function _beFruitful(contractAsSigner, slaveId, targetId){
    var workPromise = contractAsSigner.beFruitful(slaveId, targetId);
    workPromise.then(function(tx) {
        console.log("slave " + slaveId + " being fruitful with slave " + targetId + "!");
    })
    .catch((e) => console.log(e));
}

function _transferFrom(contractAsSigner, fromId, toId, slaveId){
    var workPromise = contractAsSigner.transferFrom(fromId, toId, slaveId);
    workPromise.then(function(tx) {
        console.log("Trying to transfer slave " + slaveId);
    })
    .catch((e) => console.log(e));
}

function _setCooldownTime(amount){
    var createSlavePromise = contractAsSigner0.setCooldownTime(amount);
    createSlavePromise.then(function(tx) {
        console.log("Cooldown time is now " + amount + " in seconds");
    })
    .catch((e) => console.log(e));
}

function _createSlave(contractAsSigner){
    var createSlavePromise = contractAsSigner.createFirstSlave();
    createSlavePromise.then(function(tx) {
        console.log("Creating a slave!");
    })
    .catch((e) => console.log(e));
}
function _getBalance(result, accountId){
    var checkBalancePromise = contractAsSigner2.balanceOf(ethers.utils.getAddress(result[accountId]));
    checkBalancePromise
    .then(function(tx) {
        console.log("User" + accountId + " has " + tx + " slaves");
    })
    .catch((e) => console.log(e));
}