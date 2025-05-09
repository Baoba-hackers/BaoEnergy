"use client";

import React, { useState, useEffect } from 'react';
import { SingleContractWriteMethods } from '../debug/_components/contract/SingleContractWriteMethods';
import { useDeployedContractInfo } from "../../hooks/scaffold-eth/useDeployedContractInfo";
import { useAccount } from 'wagmi';
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

import Link from 'next/link';

const AddDistributor = () => {
    const contractName = "BaoEnergy";
    const functionNameWrite = "addDistributor";

    const { data: deployedContractData } = useDeployedContractInfo(contractName);
    const { isConnected } = useAccount();

    const handleWriteSubmit = () => {
        console.log('Operação sucedida');
        window.location.href = '/answerPropose';
    };

    const [walletConnected, setWalletConnected] = useState(isConnected);

    useEffect(() => {
        setWalletConnected(isConnected);
    }, [isConnected]);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h2 className="text-primary">Consumidor, faça o seu registro</h2>
            <h4>Solicitamos informações específicas no cadastro de novos usuários para garantir transparência e eficiência em nossas operações.</h4>
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

export default AddDistributor;
