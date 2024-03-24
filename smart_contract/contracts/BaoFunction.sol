// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

contract BaoFunction is FunctionsClient {
    constructor(uint64 functionsSubscriptionId) FunctionsClient(router) {
        subscriptionId = functionsSubscriptionId;      
    }
    using FunctionsRequest for FunctionsRequest.Request;

    //Define real user contracts
    struct UserContract{
        uint256 energyConsume;
        uint256 pricePerMonth;
        uint256 timeStamp;
        uint256 localId;
        bool active;
        uint256 contractDeadLine;
    }

    //Define the mapping for consumer to userCOntract
    mapping(address => UserContract) public consumerToUserContract;

    string answer;

    bytes32 public lastRequestId;
    bytes public lastResponse;
    bytes public lastError;

    struct RequestStatus {
        address wallet;
        bool fulfilled; // whether the request has been successfully fulfilled
        bool exists; // whether a requestId exists
        bytes response;
        bytes err;
    }

    mapping(bytes32 => RequestStatus) public requests; /* requestId --> requestStatus */          
    bytes32[] public requestIds;

    // Event to log responses
    event Response(
        bytes32 indexed requestId,
        string averagePrice,
        bytes response,
        bytes err
    );

    address router = 0xb83E47C2bC239B3bf370bc41e1459A34b41238D0;
    bytes32 donID = 0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000;

    uint32 gasLimit = 300000;

    // Your subscription ID.
    uint64 public subscriptionId;

    // JavaScript source code
    string public source =
        /*
        "const device = args[0];"
        "const apiResponse = await Functions.makeHttpRequest({"
        "url: `https://baoenergy-api2.onrender.com/calculate/?values={device}`,"
        "responseType: 'text'"
        "});"
        "if (apiResponse.error) {"
        "throw Error('Request failed');"
        "}"
        "const { data } = apiResponse;"*/
        "return Functions.encodeInt256(764);";

    function getMeasure(
        string memory deviceId
    ) external returns (bytes32) {
        string[] memory args = new string[](1);
        args[0] = deviceId;

        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source); // Initialize the request with JS code
        if (args.length > 0) req.setArgs(args); // Set the arguments for the request

        // Send the request and store the request ID
        lastRequestId = _sendRequest(
              req.encodeCBOR(),
             subscriptionId,
             gasLimit,
             donID
         );
        requests[lastRequestId] = RequestStatus({
            wallet: msg.sender,
            exists: true,
            fulfilled: false,
            response: "",
            err: ""
        });
        requestIds.push(lastRequestId);
        
        return lastRequestId; 
    }


    // Receive the weather in the city requested
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override{
        require(requests[requestId].exists, "request not found");

        lastError = err;
        lastResponse = response;

        requests[requestId].fulfilled = true;
        requests[requestId].response = response;
        requests[requestId].err = err;

        address newWallet = requests[requestId].wallet;
        if (consumerToUserContract[newWallet].active) {
            uint256 num = uint256(bytes32(response));
            consumerToUserContract[newWallet].energyConsume = uint256(num);
        }

        answer = string(response);

        emit Response(requestId, answer, lastResponse, lastError);
    }
}