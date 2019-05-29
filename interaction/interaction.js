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
const contractAddress = "0xC5e3ad48205A0BF14031E28732BE3Ef5c1F5F5ED";

var signer0 = httpProvider.getSigner(0);
var signer1 = httpProvider.getSigner(1);
var signer2 = httpProvider.getSigner(2);
var signer3 = httpProvider.getSigner(3);
var contract = new ethers.Contract(contractAddress, abi, httpProvider);


let contractAsSigner0 = contract.connect(signer0);
let contractAsSigner1 = contract.connect(signer1);
let contractAsSigner2 = contract.connect(signer2);
let contractAsSigner3 = contract.connect(signer3);

init();
//testSlaves();

function init(){
    _setCooldownTime(1);
    _createSlave(contractAsSigner0);
    _createSlave(contractAsSigner1);
    _createSlave(contractAsSigner2);
    _createSlave(contractAsSigner3);
    httpProvider.listAccounts().then(result => _transferFrom(contractAsSigner1, result[1],result[0], 6));
    httpProvider.listAccounts().then(result => _getBalance(result, 0));
    httpProvider.listAccounts().then(result => _getBalance(result, 1));
    httpProvider.listAccounts().then(result => _getBalance(result, 2));
    httpProvider.listAccounts().then(result => _getBalance(result, 3));
}

function testSlaves(){
    // _work(contractAsSigner0, 0);
    // _work(contractAsSigner1, 1);
    _beFruitful(contractAsSigner0, 0, 1);
    _beFruitful(contractAsSigner2, 2, 3);
    //httpProvider.listAccounts().then(result => _transferFrom(contractAsSigner1, result[1],result[0], 6));
    httpProvider.listAccounts().then(result => _getBalance(result, 0));
    httpProvider.listAccounts().then(result => _getBalance(result, 1));
    httpProvider.listAccounts().then(result => _getBalance(result, 2));
    httpProvider.listAccounts().then(result => _getBalance(result, 3));
}

function _work(contractAsSigner, slaveId){
    var workPromise = contractAsSigner.work(slaveId);
    workPromise.then(function(tx) {
        console.log(tx);
    })
    .catch((e) => console.log(e));
}

function _beFruitful(contractAsSigner, slaveId, targetId){
    var workPromise = contractAsSigner.beFruitful(slaveId, targetId);
    workPromise.then(function(tx) {
        console.log(tx);
    })
    .catch((e) => console.log(e));
}

function _transferFrom(contractAsSigner, fromId, toId, slaveId){
    var workPromise = contractAsSigner.transferFrom(fromId, toId, slaveId);
    workPromise.then(function(tx) {
        console.log(tx);
    })
    .catch((e) => console.log(e));
}

function _setCooldownTime(amount){
    var createSlavePromise = contractAsSigner0.setCooldownTime(amount);
    createSlavePromise.then(function(tx) {
        console.log(tx);
    })
    .catch((e) => console.log(e));
}

function _createSlave(contractAsSigner){
    var createSlavePromise = contractAsSigner.createFirstSlave();
    createSlavePromise.then(function(tx) {
        console.log(tx);
    })
    .catch((e) => console.log(e));
}
function _getBalance(result, accountId){
    var checkBalancePromise = contractAsSigner2.balanceOf(ethers.utils.getAddress(result[accountId]));
    checkBalancePromise
    .then(function(tx) {
        console.log(tx);
    })
    .catch((e) => console.log(e));
}