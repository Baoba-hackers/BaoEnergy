"use client";   

import React, { useState, useEffect } from 'react';
import { SingleContractReadMethods } from '../debug/_components/contract/SingleContractReadMethods';
import { useDeployedContractInfo } from "../../hooks/scaffold-eth/useDeployedContractInfo";

const Index = () => {
    const contractName = "BaoEnergy";
    const functionName = "proposes"; 
    const [walletAddressPlaceholder, setWalletAddressPlaceholder] = useState("insira seu endereço de carteira aqui");
    const { data: deployedContractData } = useDeployedContractInfo(contractName);

    useEffect(() => {
        // Update the placeholder text when the component mounts
        setWalletAddressPlaceholder("Insira seu endereço de carteira");
    }, []);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1>Ver Distribuidores Locais</h1>
            <span>{walletAddressPlaceholder}</span>
            {deployedContractData ? (
                <SingleContractReadMethods deployedContractData={deployedContractData} functionName={functionName} />
            ) : (
                <p>Carregando dados do contrato...</p>
            )}
        </div>
    );
};

export default Index;
