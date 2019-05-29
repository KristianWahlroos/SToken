pragma solidity >=0.4.25 <0.6.0;
import "./ownable.sol";
import "./customfunctions.sol";

contract SlaveFactory is CustomFunctions, Ownable{

    using SafeMath for uint256;

    event NewSlave(uint slaveId);

    uint cooldownTime = 36 hours;

    struct Slave {
        uint32 level;
        uint32 readyTime;
    }

    Slave[] public slaves;

    mapping (uint => address) public slaveToOwner;
    mapping (address => uint) ownerSlaveCount;

    function _createSlave(address _owner, uint32 _maxLevel) public payable{
        uint id = slaves.push(Slave(uint32(_generateRandomNumber(_maxLevel)), uint32(now + cooldownTime))) - 1;
        slaveToOwner[id] = _owner;
        ownerSlaveCount[_owner] = ownerSlaveCount[_owner].add(1);
        emit NewSlave(id);
    }

    function createFirstSlave() public {
        require(ownerSlaveCount[msg.sender] == 0, "You already own a slave!");
        _createSlave(msg.sender, 1);
    }

    function setCooldownTime(uint _seconds) public onlyOwner{
        cooldownTime = _seconds;
    }


}