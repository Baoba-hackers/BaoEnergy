import { Abi, AbiFunction } from "abitype";
import { WriteOnlyFunctionForm } from "~~/app/debug/_components/contract";
import { Contract, ContractName, GenericContract, InheritedFunctions } from "~~/utils/scaffold-eth/contract";

export const SingleContractWriteMethods = ({
  onChange,
  deployedContractData,
  functionName, // Add a prop for the function name you want to display.
}: {
  onChange: () => void;
  deployedContractData: Contract<ContractName>;
  functionName?: string; // This prop is optional and will be used to filter the displayed function.
}) => {
  if (!deployedContractData) {
    return null;
  }

  // Filter functions to include only the function with the given name (if provided).
  const functionsToDisplay = (
    (deployedContractData.abi as Abi).filter(part => part.type === "function") as AbiFunction[]
  )
    .filter(fn => {
      const isWriteableFunction = fn.stateMutability !== "view" && fn.stateMutability !== "pure";
      const isTargetFunction = functionName ? fn.name === functionName : true;
      return isWriteableFunction && isTargetFunction;
    })
    .map(fn => {
      return {
        fn,
        inheritedFrom: ((deployedContractData as GenericContract)?.inheritedFunctions as InheritedFunctions)?.[fn.name],
      };
    })
    .sort((a, b) => (b.inheritedFrom ? b.inheritedFrom.localeCompare(a.inheritedFrom) : 1));

  if (!functionsToDisplay.length) {
    return <>No write methods</>;
  }

  return (
    <>
      {functionsToDisplay.map(({ fn, inheritedFrom }, idx) => (
        <WriteOnlyFunctionForm
          abi={deployedContractData.abi as Abi}
          key={`${fn.name}-${idx}}`}
          abiFunction={fn}
          onChange={onChange}
          contractAddress={deployedContractData.address}
          inheritedFrom={inheritedFrom}
        />
      ))}
    </>
  );
};
