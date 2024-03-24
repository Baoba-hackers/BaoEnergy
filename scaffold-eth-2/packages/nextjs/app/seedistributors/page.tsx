"use client";

import React, { useState, useEffect } from 'react';
import { SingleContractWriteMethods } from '../debug/_components/contract/SingleContractWriteMethods';
import { useDeployedContractInfo } from "../../hooks/scaffold-eth/useDeployedContractInfo";
import { useAccount } from 'wagmi';
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

const RegisterConsumer = () => {
    const contractName = "BaoEnergy";
    const functionNameWrite = "registerConsumer";

    const { data: deployedContractData } = useDeployedContractInfo(contractName);
    const { isConnected } = useAccount();

    const handleWriteSubmit = () => {
        console.log('Operação sucedida');
        window.location.href = "/seedistributors"

    };

    const [walletConnected, setWalletConnected] = useState(isConnected);

    useEffect(() => {
        setWalletConnected(isConnected);
    }, [isConnected]);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h2 className="text-primary">Consumidor, adcione sua proposta</h2>
            <h4>Solicitamos informações específicas para alcançarmos a melhor decisão com você.</h4>
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
        </div>
    );
};

export default RegisterConsumer;
