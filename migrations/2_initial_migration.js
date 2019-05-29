var SlaveToken = artifacts.require("./slavetoken.sol");

module.exports = function(deployer) {
  deployer.deploy(SlaveToken);
};
