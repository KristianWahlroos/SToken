pragma solidity >=0.4.25 <0.6.0;

import "./slavefactory.sol";
contract SlaveAction is SlaveFactory {

    using SafeMath32 for uint32;

    modifier onlyOwnerOf(uint _slaveId) {
        require(msg.sender == slaveToOwner[_slaveId], "This is not your slave.");
        _;
    }

    function _triggerCooldown(Slave storage _slave) internal {
        _slave.readyTime = uint32(now + cooldownTime);
    }

    function _isReady(Slave storage _slave) internal view returns (bool) {
        return (_slave.readyTime <= now);
    }

    function work(uint _slaveId) external onlyOwnerOf(_slaveId) {
        Slave storage mySlave = slaves[_slaveId];
        require(_isReady(mySlave), "Your slave is too tired");
        mySlave.level = mySlave.level.add(1);
        _triggerCooldown(mySlave);
    }

    function beFruitful(uint _slaveId, uint _targetId) external onlyOwnerOf(_slaveId) {
        Slave storage mySlave = slaves[_slaveId];
        require(_isReady(mySlave), "Your slave has headache from working too much and is unable to cooperate.");
        Slave storage targetSlave = slaves[_targetId];
        require(_isReady(targetSlave), "Target slave has headache from working too much and is unable to cooperate.");
        uint randomNumber = _generateRandomNumber(100);
        if(randomNumber>=50+mySlave.level-targetSlave.level)
        {
            _createSlave(msg.sender, targetSlave.level);
        } else {
            _createSlave(slaveToOwner[_targetId], mySlave.level);
        }
        _triggerCooldown(mySlave);
        _triggerCooldown(targetSlave);
        targetSlave.level = subUntilZero(targetSlave.level,1);

    }

}