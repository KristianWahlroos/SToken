var Counter = artifacts.require("../tokens/slavetoken.sol");

module.exports = function(deployer) {
    deployer.deploy(Counter);
};