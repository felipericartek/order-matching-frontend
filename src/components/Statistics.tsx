import { useEffect, useState } from 'react';
import axios from 'axios';

interface StatisticsData {
    lastPrice: number;
    volumeBTC: number;
    volumeUSD: number;
    high: number;
    low: number;
    usdBalance: number;
    btcBalance: number;
}

const Statistics = () => {
    const [stats, setStats] = useState<StatisticsData | null>(null);

    const fetchStatistics = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await axios.get('http://localhost:3001/api/statistics', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setStats(response.data);
        } catch (error) {
            console.error('Erro ao buscar estatísticas:', error);
        }
    };

    useEffect(() => {
        fetchStatistics();

        const interval = setInterval(fetchStatistics, 5000);
        return () => clearInterval(interval);
    }, []);

    if (!stats) {
        return <p>Carregando estatísticas...</p>;
    }

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
