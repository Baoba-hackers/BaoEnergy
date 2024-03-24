import { Abi, AbiFunction } from "abitype";
import { ReadOnlyFunctionForm } from "~~/app/debug/_components/contract";
import { Contract, ContractName, GenericContract, InheritedFunctions } from "~~/utils/scaffold-eth/contract";

export const SingleContractReadMethods = ({
  deployedContractData,
  functionName
}: {
  deployedContractData: Contract<ContractName>,
  functionName: string
}) => {
  if (!deployedContractData) {
    return null;
  }

  // Encontra a função especificada pelo nome no ABI do contrato.
  const functionToDisplay = (
    (deployedContractData.abi as Abi).find(part => part.type === "function" && part.name === functionName) as AbiFunction
  );

  // Verifica se a função é queryable (view ou pure e tem parâmetros)
  const isQueryableWithParams = functionToDisplay && 
                                (functionToDisplay.stateMutability === "view" || functionToDisplay.stateMutability === "pure") &&
                                functionToDisplay.inputs.length > 0;

  if (!functionToDisplay || !isQueryableWithParams) {
    return <>Function not found or not queryable</>;
  }

  const inheritedFrom = ((deployedContractData as GenericContract)?.inheritedFunctions as InheritedFunctions)?.[functionToDisplay.name];

  return (
    <ReadOnlyFunctionForm
      abi={deployedContractData.abi as Abi}
      contractAddress={deployedContractData.address}
      abiFunction={functionToDisplay}
      key={functionToDisplay.name}
      inheritedFrom={inheritedFrom}
    />
  );
};
