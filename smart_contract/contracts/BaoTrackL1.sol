// SPDX-License-Identifier: MIT
pragma solidity >=0.8.16;

//import "@openzeppelin/contracts/access/Ownable.sol";
import "@scroll-tech/contracts/libraries/IScrollMessenger.sol";

contract BaoTrack {
    struct Transaction {
        uint256 productId;
        uint256 amount;
        uint256 priceHundred;
        uint256 blockStamp;
        uint256 localId;
        uint256 timestampTransaction;
    }

    struct Proposal {
        Transaction transaction;
        address receiver;
    }

    mapping(address => Proposal[]) private proposals;
    mapping(uint => mapping(uint => Transaction[])) private transactions;//Product Id to LocalId to Transactions

    event ProposalAdded(address indexed receiver, uint256 indexed index);
    event answeredTransaction(uint256 indexed transactionId, bool decision);

    function addProposal(
        uint256 _productId,
        uint256 _amount,
        uint256 _priceHundred,
        uint256 _timestampTransaction,
        uint256 _localId,
        address _receiver
    ) public {
        Transaction memory newTransaction = Transaction({
            productId: _productId,
            amount: _amount,
            priceHundred: _priceHundred,
            blockStamp: block.timestamp,
            localId: _localId,
            timestampTransaction: _timestampTransaction
        });

        Proposal memory proposal = Proposal({
            transaction: newTransaction, 
            receiver: _receiver
        });

        proposals[_receiver].push(proposal);
        emit ProposalAdded(_receiver, proposals[_receiver].length - 1);
    }

    function getProposals() public view returns (Proposal[] memory) {
        return proposals[msg.sender];
    }

    function answerProposal(uint _index, bool _decision) public {
        require((proposals[msg.sender].length - 1) <= _index, "O index buscado nao existe");
        Proposal memory proposal = proposals[msg.sender][_index];
        require(msg.sender == proposal.receiver, "Voce deve ser o destinatario para responder essa proposta");
        if (_decision) {
            Transaction memory transaction = proposal.transaction;
            transactions[transaction.productId][transaction.localId].push(transaction);
            delete proposals[msg.sender][_index];
        } else {
            delete proposals[msg.sender][_index];
        }

        emit answeredTransaction(_index, _decision);
    }

    function getTransactions(uint256 _productId, uint256 _localId) internal view returns (Transaction[] memory) {
        return transactions[_productId][_localId];
    }

    function executeFunctionCrosschain(
        address _scrollMessengerAddress,
        address _targetAddress,
        uint256 _value,
        uint32 _gasLimit,
        uint256 _productId,
        uint _localId
    ) public payable {
            IScrollMessenger scrollMessenger = IScrollMessenger(_scrollMessengerAddress);
            
            Transaction[] memory newTransactions = transactions[_productId][_localId];

            scrollMessenger.sendMessage{ value: msg.value }(
            _targetAddress,
            _value,
            abi.encodeWithSignature("getAveragePrice(Transaction[])", newTransactions),
            _gasLimit,
            msg.sender
        );
    }
}