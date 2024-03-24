"use client";
import React from 'react';
import { CallContractFunction } from '../debug/_components/contract/CallContractFunction'; // Adjust the import path as per your project structure
import { useDeployedContractInfo } from "../../hooks/scaffold-eth/useDeployedContractInfo";
import Link from 'next/link';

const Index = () => {
    const contractName = "BaoEnergy";
    const functionNameRead = "getProposes";

    const { data: deployedContractData } = useDeployedContractInfo(contractName);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h2 className="text-primary">Minhas propostas</h2>
            <p>Aqui está apenas o componente que chama a função do smart contract.</p>
            {deployedContractData && (
                <CallContractFunction
                    functionName={functionNameRead}
                    refreshDisplayVariables={true} // Or set it to false based on your logic
                    deployedContractData={deployedContractData}
                />
            )}
            <Link href="/answerpropose">
                <p className="text-primary">Responder Proposta</p>
            </Link>
            
        </div>
    );
};

export default Index;   