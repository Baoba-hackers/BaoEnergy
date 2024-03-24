"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/img/Logo.png"; // Ajuste o caminho conforme necessário
import "./style.scss";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  return (
    <>
      <div className="container">
        {/* Inserção do logo, título e slogan */}
        <div className="hero-section">
          <div className="bao-big-section">
            <Image src={Logo} alt="BaoEnergy Logo" width={200} height={200} />
          </div>
          <h1 className="text-primary">Conheça a BaoEnergy</h1>
          <p className="hero-slogan">Negocie diretamente com fornecedores e economize na conta de energia. Entre no Mercado Livre de Energia descentralizado.</p>
        </div>
        {/* Seção de conteúdo já existente */}
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
      </div> {/* Fechamento correto do container */}
      {/* Nova seção para "Como fazemos isso?" */}
      <h1 className="text-primary">Como fazemos isso?</h1>
      <div className="content">
        <div className="card-how">
          <h3>Unimos as Duas Pontas Da Transação</h3>
          <p>Facilitamos o encontro entre compradores e fornecedores de energia, simplificando o processo de contratação no Mercado Livre de Energia</p>
        </div>

        <div className="card-how">
          <h3>Utilizamos Tecnologia Blockchain</h3>
          <p>Utilizamos blockchain para garantir transações seguras e transparentes entre compradores e fornecedores.</p>
        </div>

        <div className="card-how">
          <h3>Realizamos a transação</h3>
          <p>Fornecemos informações transparentes sobre o preço médio praticado por região, permitindo uma tomada de decisão informada pelos usuários.</p>
        </div>
      </div>
      <div className="cta">
          <p>Pronto para explorar as possibilidades do Mercado Livre de Energia Descentralizado em nossa plataforma? Crie uma conta e faça parte dessa rede!</p>
      </div>
    </>
  );
};

export default Home;