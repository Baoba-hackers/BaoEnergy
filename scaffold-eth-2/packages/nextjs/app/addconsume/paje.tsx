// pages/index.js
import { useState } from 'react';
import Cookies from 'js-cookie';

const estados = [
  { nome: 'Acre', codigo: 1 },
  { nome: 'Alagoas', codigo: 2 },
  { nome: 'Amapá', codigo: 3 },
  { nome: 'Amazonas', codigo: 4 },
  { nome: 'Bahia', codigo: 5 },
  { nome: 'Ceará', codigo: 6 },
  { nome: 'Distrito Federal', codigo: 7 },
  { nome: 'Espírito Santo', codigo: 8 },
  { nome: 'Goiás', codigo: 9 },
  { nome: 'Maranhão', codigo: 10 },
  { nome: 'Mato Grosso', codigo: 11 },
  { nome: 'Mato Grosso do Sul', codigo: 12 },
  { nome: 'Minas Gerais', codigo: 13 },
  { nome: 'Pará', codigo: 14 },
  { nome: 'Paraíba', codigo: 15 },
  { nome: 'Paraná', codigo: 16 },
  { nome: 'Pernambuco', codigo: 17 },
  { nome: 'Piauí', codigo: 18 },
  { nome: 'Rio de Janeiro', codigo: 19 },
  { nome: 'Rio Grande do Norte', codigo: 20 },
  { nome: 'Rio Grande do Sul', codigo: 21 },
  { nome: 'Rondônia', codigo: 22 },
  { nome: 'Roraima', codigo: 23 },
  { nome: 'Santa Catarina', codigo: 24 },
  { nome: 'São Paulo', codigo: 25 },
  { nome: 'Sergipe', codigo: 26 },
  { nome: 'Tocantins', codigo: 27 },
];

export default function Home() {
  const [selectedState, setSelectedState] = useState('');
  const [gasto, setGasto] = useState('');

  const handleSelectChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleGastoChange = (event) => {
    setGasto(event.target.value);
  };

  const handleSave = () => {
    if (selectedState && gasto) {
      const selectedStateCode = estados.find((estado) => estado.nome === selectedState)?.codigo;
      if (selectedStateCode !== undefined) {
        const data = { gasto, selectedState: selectedStateCode };
        Cookies.set('gasto', JSON.stringify(data));
        alert('Dados salvos com sucesso!');
      } else {
        alert('Estado selecionado inválido!');
      }
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  };

  return (
    <div>
      <h1>Selecione um Estado e Insira o Gasto:</h1>
      <select value={selectedState} onChange={handleSelectChange}>
        <option value="">Selecione um Estado</option>
        {estados.map((estado) => (
          <option key={estado.codigo} value={estado.nome}>
            {estado.nome}
          </option>
        ))}
      </select>
      <br />
      <input type="text" value={gasto} onChange={handleGastoChange} placeholder="Insira o gasto" />
      <br />
      <button onClick={handleSave}>Salvar</button>
    </div>
  );
}
