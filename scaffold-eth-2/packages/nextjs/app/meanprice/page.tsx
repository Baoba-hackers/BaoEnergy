"use client";
import React from 'react';
import Image from 'next/image';
import './style.scss';
import graph from "../../assets/img/graph.png";
import Link from "next/link"

const App: React.FC = () => {
  return (
    <div className="page-container">
      <div className="content-container">
        {/* Gráfico */}
        <div className="graph-container">
          <Image alt="Gráfico" src={graph} layout="responsive" width={700} height={350} />
        </div>
        {/* Dados do Item */}
        <div className="data-item">
          <p><strong>DADOS DO ITEM</strong></p>
          <p>Preço unitário médio: 0,99</p>
          <p>Preço unitário máximo: 1,29</p>
          <p>Preço unitário mínimo: 0,79</p>
        </div>
      </div>
      <Link href="/addpropose">
        <p>Adicionar Proposta</p>
      </Link>
    </div>
  );
};

export default App;