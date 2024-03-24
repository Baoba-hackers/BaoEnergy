"use client";

import { Dispatch, SetStateAction } from "react";
import { Tuple } from "./Tuple";
import { TupleArray } from "./TupleArray";
import { AbiParameter } from "abitype";
import {
  AddressInput,
  Bytes32Input,
  BytesInput,
  InputBase,
  IntegerInput,
  IntegerVariant,
} from "~~/components/scaffold-eth";
import { AbiParameterTuple } from "~~/utils/scaffold-eth/contract";

type ContractInputProps = {
  setForm: Dispatch<SetStateAction<Record<string, any>>>;
  form: Record<string, any> | undefined;
  stateObjectKey: string;
  paramType: AbiParameter;
};

const getPortugueseDescription = (paramType: AbiParameter) => {
  const typeDescriptions = {
    address: 'Endereço de Carteira',
    bytes32: 'Sequência de 32 Bytes',
    bytes: 'Sequência de Bytes',
    string: 'Texto',
    bool: 'Verdadeiro ou Falso',
    uint256: 'Número Inteiro sem Sinal',
    int256: 'Número Inteiro com Sinal',
    // Adicione mais tipos e descrições conforme necessário
  };

  return typeDescriptions[paramType.type] || paramType.type;
};


export const ContractInput = ({ setForm, form, stateObjectKey, paramType }: ContractInputProps) => {
  const placeholder = paramType.name ? `Insira o valor para ${getPortugueseDescription(paramType)}` : `Insira o valor`;

  const inputProps = {
    name: stateObjectKey,
    value: form?.[stateObjectKey],
    placeholder: placeholder,
    onChange: (value: any) => {
      setForm((form) => ({ ...form, [stateObjectKey]: value }));
    },
  };

  const renderInput = () => {
    switch (paramType.type) {
      case "address":
        return <AddressInput {...inputProps} />;
      case "bytes32":
        return <Bytes32Input {...inputProps} />;
      case "bytes":
        return <BytesInput {...inputProps} />;
      case "string":
        return <InputBase {...inputProps} />;
      case "bool":
        return <InputBase {...inputProps} type="checkbox" />;
      case "tuple":
        return (
          <Tuple
            setParentForm={setForm}
            parentForm={form}
            abiTupleParameter={paramType as AbiParameterTuple}
            parentStateObjectKey={stateObjectKey}
          />
        );
      // Adiciona tratamento para outros tipos, como inteiros e arrays de tuplas
      default:
        if (paramType.type.includes("int")) {
          return <IntegerInput {...inputProps} variant={paramType.type as IntegerVariant} />;
        } else if (paramType.type.startsWith("tuple[")) {
          return (
            <TupleArray
              setParentForm={setForm}
              parentForm={form}
              abiTupleParameter={paramType as AbiParameterTuple}
              parentStateObjectKey={stateObjectKey}
            />
          );
        } else {
          return <InputBase {...inputProps} />;
        }
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center ml-2">
        <span className="text-xs font-medium mr-2 leading-none">
          {paramType.name
            ? `${paramType.name.replace(/^_/, '')} (${getPortugueseDescription(paramType)})`
            : getPortugueseDescription(paramType)}
        </span>
      </div>
      {renderInput()}
    </div>
  );
};
