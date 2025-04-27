import React from 'react';

interface Props {
    stats: any;
}

const Statistics: React.FC<Props> = ({ stats }) => {
    if (!stats) return <p>Carregando estatísticas...</p>;

    return (
        <div>
            <h3>Estatísticas do Mercado</h3>
            <p>Último Preço: ${stats.lastPrice}</p>
            <p>Volume BTC (24h): {stats.volumeBTC}</p>
            <p>Volume USD (24h): ${stats.volumeUSD}</p>
            <p>Maior Preço (24h): ${stats.high}</p>
            <p>Menor Preço (24h): ${stats.low}</p>
            <p>Seu saldo USD: ${stats.usdBalance}</p>
            <p>Seu saldo BTC: {stats.btcBalance}</p>
        </div>
    );
};

export default Statistics;
