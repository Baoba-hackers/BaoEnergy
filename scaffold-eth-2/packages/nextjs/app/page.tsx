import React from 'react';
import "./style.scss";
import Link from 'next/link';

const Index = () => {

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-primary">BaoEnergy</h1>
                <h2 className="text-secondary-content">Descentralizando a energia, democratizando o futuro.</h2>
                <div className="botoes">
                    <div className="btn">Entenda como funciona</div>
                    <Link href="/aboutus">
                        <h1 className="btn bg-primary">Entre e Mude o Mundo</h1>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Index;
