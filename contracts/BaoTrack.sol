// SPDX-License-Identifier: MIT
pragma solidity >=0.8.5;

import "./access/Ownable.sol";

contract BaoTrack is Ownable {
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
    Transaction[] private transactions;

    constructor(address initialOwner) Ownable(initialOwner) {}

    event ProposalAdded(address indexed receiver, uint256 indexed index);
    event TransactionAdded(Transaction transaction);

    function addProposal(
        uint256 productId,
        uint256 amount,
        uint256 priceHundred,
        uint256 timestampTransaction,
        uint256 localId,
        address receiver
    ) public {
        Transaction memory newTransaction = Transaction(
            productId,
            amount,
            priceHundred,
            block.timestamp,
            localId,
            timestampTransaction
        );

        Proposal memory proposal = Proposal(newTransaction, receiver);

        proposals[receiver].push(proposal);
        emit ProposalAdded(receiver, proposals[receiver].length - 1);
    }

    function getProposals() public view returns (Proposal[] memory) {
        return proposals[msg.sender];
    }

    function answerProposal(uint index, bool decision) public {
        if (decision) {
            Proposal memory proposal = proposals[msg.sender][index];
            Transaction memory transaction = Transaction(
                proposal.transaction.productId,
                proposal.transaction.amount,
                proposal.transaction.priceHundred,
                block.timestamp,
                proposal.transaction.localId,
                proposal.transaction.timestampTransaction
            );

            transactions.push(transaction);
            delete proposals[msg.sender][index];
            emit TransactionAdded(transaction);
        } else {
            delete proposals[msg.sender][index];
        }
    }

    function getTransactions() external view returns (Transaction[] memory) {
        return transactions;
    }
}