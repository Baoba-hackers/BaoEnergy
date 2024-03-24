import React from 'react';
import "./style.scss";
import Image from "next/image";
import Link from 'next/link';

import Consumidor from "../../assets/img/consumidor.png";
import Fornecedor from "../../assets/img/fornecedor.png";

const EscolhaPerfil = () => {
    return (
        <div className="content">
            <div className="user">
                <Image
                    src={Fornecedor}
                    alt="Fornecedor"
                    width={300}
                    height={300}
                    className="cursor-pointer"
                />
                <h2>Como usuário, quero escolher meu fornecedor de energia para reduzir custos e ter controle sobre meu consumo.</h2>
                <Link href="/registerconsumer">
                    <div className="btn">Consumidor</div>
                </Link>
            </div>
            <div className="user">
                <Image
                    src={Consumidor}
                    alt="Consumidor"
                    width={300}
                    height={300}
                />
                <h2>Como fornecedor, desejo oferecer meu serviço de forma eficiente para ampliar minha margem de lucro.</h2>
                <Link href="/addDistributor">
                    <div className="btn">Fornecedor</div>
                </Link>
            </div>
        </div>
    );
};

export default EscolhaPerfil;
