pragma solidity >=0.4.25 <0.6.0;

import "./safemath.sol";
/**
 * @title CustomFunctions
 * @dev Custom functions (Generate random number, subtract until zero)
 */
contract CustomFunctions {

    using SafeMath for uint256;
    uint nonceNumber = 0;

    /**
    * @dev Substracts two numbers, returns zero if subtrahend is greater than minuend.
    */
    function subUntilZero(uint32 a, uint32 b) internal pure returns (uint32) {
        if(b >= a){
          return 0;
        }
        return a - b;
    }

    function _generateRandomNumber(uint32 _modulus) internal returns(uint) {
        nonceNumber = nonceNumber.add(1);
        return uint(keccak256(abi.encodePacked(now, msg.sender, nonceNumber))) % _modulus;
    }
}
