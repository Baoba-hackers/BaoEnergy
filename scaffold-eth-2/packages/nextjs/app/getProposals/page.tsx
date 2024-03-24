"use client";

import React from 'react';
import { SingleContractReadMethods } from '../debug/_components/contract/SingleContractReadMethods';
import { useDeployedContractInfo } from "../../hooks/scaffold-eth/useDeployedContractInfo";

const Index = () => {
    const contractName = "BaoEnergy";
    const functionName = "proposes"; 

    const { data: deployedContractData } = useDeployedContractInfo(contractName);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1>Ver Propostas</h1>
            {deployedContractData ? (
                <SingleContractReadMethods deployedContractData={deployedContractData} functionName={functionName} />
            ) : (
                <p>Carregando dados do contrato...</p>
            )}
        </div>
    );
};

export default Index;
