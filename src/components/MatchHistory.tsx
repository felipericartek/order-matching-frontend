interface Match {
    id: number;
    price: number;
    amount: number;
    type: 'BUY' | 'SELL';
}

type MatchHistoryProps = {
    orders: Match[];
};

const MatchHistory = ({ orders }: MatchHistoryProps) => {
    return (
        <div className="mt-3">
            <h5>Histórico de Matches</h5>
            {orders.length === 0 ? (
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
                    {orders.map((match) => (
                        <tr key={match.id}>
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
