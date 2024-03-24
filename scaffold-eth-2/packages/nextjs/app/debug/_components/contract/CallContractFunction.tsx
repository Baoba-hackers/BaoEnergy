import { DisplayVariable } from "./DisplayVariable";
import { Abi, AbiFunction } from "abitype";
import { Contract, ContractName } from "~~/utils/scaffold-eth/contract";

export const CallContractFunction = ({
  functionName,
  refreshDisplayVariables,
  deployedContractData,
}: {
  functionName: string;
  refreshDisplayVariables: boolean;
  deployedContractData: Contract<ContractName>;
}) => {
  if (!deployedContractData) {
    return null;
  }

  const functionToDisplay = ((deployedContractData.abi as Abi).find(
    part => part.type === "function" && part.name === functionName,
  ) as AbiFunction | undefined);

  if (!functionToDisplay || functionToDisplay.inputs.length > 0) {
    return <div>No matching function or function requires parameters</div>;
  }

  return (
    <DisplayVariable
      abi={deployedContractData.abi as Abi}
      abiFunction={functionToDisplay}
      contractAddress={deployedContractData.address}
      key={functionToDisplay.name}
      refreshDisplayVariables={refreshDisplayVariables}
    />
  );
};
