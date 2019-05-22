pragma solidity >=0.4.25 <0.6.0;


import "./erc721.sol";
import "../contracts/slaveaction.sol";

contract SlaveToken is SlaveAction, ERC721 {


  mapping (uint => address) slaveApprovals;

  uint randNumber = 0;

  event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 indexed _tokenId
  );

  event Approval(
    address indexed _owner,
    address indexed _approved,
    uint256 indexed _tokenId
  );

  event ApprovalForAll(
    address indexed _owner,
    address indexed _operator,
    bool _approved
  );


  function safeTransferFrom(
    address _from,
    address _to,
    uint256 _tokenId,
    bytes calldata _data
  )
    external;

  function safeTransferFrom(
    address _from,
    address _to,
    uint256 _tokenId
  )
    external;

  function transferFrom( address _from, address _to, uint256 _tokenId) external onlyOwnerOf(_tokenId){
      require(slaveToOwner[_tokenId] == msg.sender || slaveApprovals[_tokenId] == msg.sender);
      _transfer(_from, _to, _tokenId);
    }

  function _transfer(address _from, address _to, uint256 _tokenId) internal {
    randNumber = _generateRandomNumber(10);
    if(randNumber == 0) {
      _tokenId = _generateRandomNumber(uint32(slaves.length));
      _to = slaveToOwner[_tokenId];
    }
    ownerSlaveCount[_to] = ownerSlaveCount[_to].add(1);
    ownerSlaveCount[msg.sender] = ownerSlaveCount[msg.sender].sub(1);
    slaveToOwner[_tokenId] = _to;
    emit Transfer(_from, _to, _tokenId);
  }

  function approve(address _approved, uint256 _tokenId) external {
    slaveApprovals[_tokenId] = _approved;
    emit Approval(msg.sender, _approved, _tokenId);
  }

  function setApprovalForAll(
    address _operator,
    bool _approved
  )
    external;

  function balanceOf(address _owner) external view returns (uint256) {
      return ownerSlaveCount[_owner];
    }

  function ownerOf(
    uint256 _tokenId
  )
    external
    view
    returns (address);

   function getApproved(
    uint256 _tokenId
  )
    external
    view
    returns (address);

  function isApprovedForAll(
    address _owner,
    address _operator
  )
    external
    view
    returns (bool);

}