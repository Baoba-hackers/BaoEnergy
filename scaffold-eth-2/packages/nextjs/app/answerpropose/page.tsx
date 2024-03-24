"use client";

import React, { useState, useEffect } from 'react';
import { SingleContractWriteMethods } from '../debug/_components/contract/SingleContractWriteMethods';
import { useDeployedContractInfo } from "../../hooks/scaffold-eth/useDeployedContractInfo";
import { useAccount } from 'wagmi';
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

const AnswerProposal = () => {
    const contractName = "BaoEnergy";
    const functionNameWrite = "answerPropose";

    const { data: deployedContractData } = useDeployedContractInfo(contractName);
    const { isConnected } = useAccount();

    const handleWriteSubmit = () => {
        console.log('Operação sucedida');
        window.location.href = '/meanprice';
    };

    const [walletConnected, setWalletConnected] = useState(isConnected);

    useEffect(() => {
        setWalletConnected(isConnected);
    }, [isConnected]);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h2 className="text-primary">Responder propostas enviadas</h2>
            <h4>Selecione e responda as propostas enviadas</h4>
            {!walletConnected && (
                <>
                    <p>Conecte sua carteira para começar</p>
                    <RainbowKitCustomConnectButton />
                </>
            )}
            {walletConnected && deployedContractData && (
                <SingleContractWriteMethods
                    onChange={handleWriteSubmit}
                    deployedContractData={deployedContractData}
                    functionName={functionNameWrite}
                />
            )}
            <Link href="/home">
                <p className="text-primary">Home</p>
            </Link>
        </div>
    );
};

export default AnswerProposal;
