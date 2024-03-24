"use client";
import React from 'react';
import { CallContractFunction } from '../debug/_components/contract/CallContractFunction'; // Adjust the import path as per your project structure
import { useDeployedContractInfo } from "../../hooks/scaffold-eth/useDeployedContractInfo";

const Index = () => {
    const contractName = "BaoEnergy";
    const functionName = "getProposes"; 

    const { data: deployedContractData } = useDeployedContractInfo(contractName);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h2 className="text-primary">Página Vazia</h2>
            <p>Aqui está apenas o componente que chama a função {functionNameRead} do smart contract.</p>
            {deployedContractData && (
                <CallContractFunction
                    functionName={functionNameRead}
                    refreshDisplayVariables={true} // Or set it to false based on your logic
                    deployedContractData={deployedContractData}
                />
            )}
        </div>
    );
};

export default Index;