"use client"; // Adicione esta linha para usar o useRef em componentes do lado do cliente
import React from "react";
import Link from "next/link";
import "./style.scss";
import { Header } from "../../components/Header";
import 'chartjs-adapter-date-fns';
import 'chartjs-adapter-moment';
import { Line } from "react-chartjs-2";

const ChartComponent = () => {
  const chartRef = React.useRef(null);

  const fakeData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Vendas",
        data: [12, 19, 3, 5, 25, 18],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="search-bar">
          <input type="text" placeholder="Faça sua consulta" />
        </div>

        <main className="main">
          <h1 className="title">DADOS DO ITEM</h1>

          <div className="select-state">
            <select>
              <option value="">Selecione o Estado que deseja analisar</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
            </select>
          </div>

          <div className="chart">
            <Line ref={chartRef} data={fakeData} />
          </div>

          <div className="data">
            <div className="item">
              <h2 className="label">Preço unitário médio</h2>
              <h3 className="value">R$ 0,99</h3>
            </div>

            <div className="item">
              <h2 className="label">Preço unitário máximo</h2>
              <h3 className="value">R$ 1,29</h3>
            </div>

            <div className="item">
              <h2 className="label">Preço unitário mínimo</h2>
              <h3 className="value">R$ 0,79</h3>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ChartComponent;
