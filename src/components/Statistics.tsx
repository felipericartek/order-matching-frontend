import { useEffect, useState } from 'react';
import axios from 'axios';

export interface StatisticsData {
    lastPrice: number;
    volumeBTC: number;
    volumeUSD: number;
    high: number;
    low: number;
    usdBalance: number;
    btcBalance: number;
}

type StatisticsProps = {
    stats: StatisticsData;
};

const Statistics = ({ stats }: StatisticsProps) => {
    return (
        <div className="mb-4">
            <h4>Estatísticas</h4>
            <div className="row">
                <div className="col-md-4">
                    <ul className="list-group">
                        <li className="list-group-item"><strong>Último preço:</strong> ${stats.lastPrice.toFixed(2)}</li>
                        <li className="list-group-item"><strong>Volume 24h (BTC):</strong> {stats.volumeBTC.toFixed(4)}</li>
                        <li className="list-group-item"><strong>Volume 24h (USD):</strong> ${stats.volumeUSD.toFixed(2)}</li>
                        <li className="list-group-item"><strong>High 24h:</strong> ${stats.high.toFixed(2)}</li>
                        <li className="list-group-item"><strong>Low 24h:</strong> ${stats.low.toFixed(2)}</li>
                    </ul>
                </div>
                <div className="col-md-4">
                    <ul className="list-group">
                        <li className="list-group-item"><strong>Saldo USD:</strong> ${stats.usdBalance.toFixed(2)}</li>
                        <li className="list-group-item"><strong>Saldo BTC:</strong> {stats.btcBalance.toFixed(4)}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
