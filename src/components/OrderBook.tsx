interface Order {
    id: number;
    amount: number;
    price: number;
    type: 'BUY' | 'SELL';
}

type OrderBookProps = {
    book: Order[];
};

const OrderBook = ({ book }: OrderBookProps) => {
    const bids = book.filter(order => order.type === 'BUY').sort((a, b) => b.price - a.price);
    const asks = book.filter(order => order.type === 'SELL').sort((a, b) => a.price - b.price);

    return (
        <div>
            <h5>Order Book (Bid/Ask)</h5>

            <div className="row">
                <div className="col">
                    <h6>Compras (Bids)</h6>
                    <table className="table table-sm table-striped">
                        <thead>
                        <tr>
                            <th>Preço (USD)</th>
                            <th>Quantidade (BTC)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bids.map((bid) => (
                            <tr key={bid.id}>
                                <td>${bid.price.toFixed(2)}</td>
                                <td>{bid.amount.toFixed(4)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="col">
                    <h6>Vendas (Asks)</h6>
                    <table className="table table-sm table-striped">
                        <thead>
                        <tr>
                            <th>Preço (USD)</th>
                            <th>Quantidade (BTC)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {asks.map((ask) => (
                            <tr key={ask.id}>
                                <td>${ask.price.toFixed(2)}</td>
                                <td>{ask.amount.toFixed(4)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderBook;
