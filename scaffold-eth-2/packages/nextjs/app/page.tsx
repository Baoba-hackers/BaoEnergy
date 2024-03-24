"use client";

import Image from "next/image";
import Link from "next/link";
//import { Logo } from "../assets/img/Logo.png";
import { Header } from "../components/Header";
import "./style.scss";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  return (
    <>
      <Header />

      <div className="container">

        <h1 className="text-primary">BaoEnergy</h1>
        <section className="content">
          <div className="card">
            <h2>
              Para Você,
              <br />
              Consumidor de Energia Elétrica
            </h2>
            <ul className="benefits">
              <li>Elimine totalmente os intermediários</li>
              <li>Diminua o preço da sua conta de energia em até 35%</li>
              <li>Pague preços justos, tendo acesso ao preço médio praticado no mercado</li>
              <li>Aumente a eficiência das negociações ao se conectar diretamente com o distribuidor</li>
            </ul>
          </div>

          <div className="card">
            <h2>
              Para a Sua Empresa,
              <br />
              Fornecedor de Energia Elétrica
            </h2>
            <ul className="benefits">
              <li>Aumente sua prospecção de clientes ao se conectar diretamente com o consumidor final</li>
              <li>Aumente a eficiência dos seus processos de venda</li>
              <li>Agregue valor aos seus clientes criando experiências valiosas e econômicas</li>
              <li>Não dependa de agentes intermediários</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
