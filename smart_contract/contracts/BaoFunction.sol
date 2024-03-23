// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

contract BaoFunction is FunctionsClient {
    constructor(uint64 functionsSubscriptionId) FunctionsClient(router) {
        subscriptionId = functionsSubscriptionId;      
    }


    using FunctionsRequest for FunctionsRequest.Request;

    string answer;

    bytes32 public lastRequestId;
    bytes public lastResponse;
    bytes public lastError;

    struct RequestStatus {
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
        "const energyContracts = args[0];"
        "const apiResponse = await Functions.makeHttpRequest({"
        "url: `https://baoenergy-api2.onrender.com/calculate/?values={energyContracts}`,"
        "responseType: 'text'"
        "});"
        "if (apiResponse.error) {"
        "throw Error('Request failed');"
        "}"
        "const { data } = apiResponse;"
        "let newData = JSON.stringify(data)"
        "return Functions.encodeString(newData);";

    function getAllMeanPrice(
        uint256 _localId
    ) external returns (bytes32) {
        /*
        UserContract[] memory localsStruct = localToContract[_localId];
        string[] memory contracts;
        for(uint256 i = 0; i < localsStruct.length; i++) {
            contracts[i] = 
            concatenateStrings(
                concatenateStrings(
                    concatenateStrings(
                        concatenateStrings(
                            concatenateStrings(
                                concatenateStrings(
                                    Strings.toHexString(localsStruct[i].consumer), 
                                    Strings.toString(localsStruct[i].energyConsume)), 
                                Strings.toString(localsStruct[i].pricePerMonth)), 
                            Strings.toString(localsStruct[i].timeStamp)),
                        Strings.toString(localsStruct[i].localId)),
                    (localsStruct[i].active ? "true" : "false")), 

    //     //     Strings.toString(localsStruct[i].contractDeadLine));
    //     // }

    //     string[] memory args = new string[](1);

    //     FunctionsRequest.Request memory req;
    //     req.initializeRequestForInlineJavaScript(source); // Initialize the request with JS code
    //     if (args.length > 0) req.setArgs(contracts); // Set the arguments for the request

    //     // Send the request and store the request ID
    //     lastRequestId = _sendRequest(
    //         req.encodeCBOR(),
    //         subscriptionId,
    //         gasLimit,
    //         donID
    //     );
        requests[lastRequestId] = RequestStatus({
            exists: true,
            fulfilled: false,
            response: "",
            err: ""
        });
        requestIds.push(lastRequestId);
        */
        return bytes32(0x666f6f6261720000000000000000000000000000000000000000000000000000); 
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

        answer = string(response);

        emit Response(requestId, answer, lastResponse, lastError);
    }

    function concatenateStrings(string memory _str1, string memory _str2) internal pure returns (string memory) {
        return string(abi.encodePacked(_str1, _str2));
    }
}