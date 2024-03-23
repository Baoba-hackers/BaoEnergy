import React from 'react';
import "./style.scss";
import Image from "next/image";
import Consumidor from "../../assets/img/fornecedor.png"; // Corrigido para importar a imagem corretamente
import Fornecedor from "../../assets/img/consumidor.png"; // Corrigido para importar a imagem corretamente

const EscolhaPerfil = () => {
    return (
        <>
            <div className="content">
                <div className="user">
                    <Image alt="SE2 logo" className="cursor-pointer" src={Fornecedor}/>
                    <h2 className="text-bg-secundary">Como usuário, quero escolher meu fornecedor de energia para reduzir custos e ter controle sobre meu consumo.</h2>
                    <div className="btn">Consumidor</div>
                </div>
                <div className="user">
                    <Image src={Consumidor} alt="Imagem consumidor" />
                    <h2 className="text-bg-secundary">Como fornecedor, desejo oferecer meu serviço de forma eficiente para ampliar minha margem de lucro.</h2>
                    <div className='btn'>Fornecedor</div>
                </div>
            </div>
        </>
    );
};

export default EscolhaPerfil;
