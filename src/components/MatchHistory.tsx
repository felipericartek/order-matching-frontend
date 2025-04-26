import { useEffect, useState } from 'react';
import axios from 'axios';

interface Match {
    id: number;
    price: number;
    amount: number;
    type: 'BUY' | 'SELL';
}

const MatchHistory = () => {
    const [history, setHistory] = useState<Match[]>([]);

    const fetchMatchHistory = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await axios.get('http://localhost:3001/api/orders/history', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setHistory(response.data);
        } catch (error) {
            console.error('Erro ao buscar histórico de matches:', error);
        }
    };

    useEffect(() => {
        fetchMatchHistory();

        // Atualiza a cada 5 segundos (padrão)
        const interval = setInterval(fetchMatchHistory, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mt-3">
            <h5>Histórico de Matches</h5>
            {history.length === 0 ? (
                <p>Você ainda não tem trades realizados.</p>
            ) : (
                <table className="table table-sm table-striped">
                    <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Preço (USD)</th>
                        <th>Quantidade (BTC)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {history.map((match, index) => (
                        <tr key={index}>
                            <td>{match.type}</td>
                            <td>${match.price.toFixed(2)}</td>
                            <td>{match.amount.toFixed(4)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MatchHistory;
