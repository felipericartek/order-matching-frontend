import { useState } from 'react';
import axios from 'axios';

const BuyForm = () => {
    const [amount, setAmount] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Você precisa estar logado.');
                return;
            }

            await axios.post(
                'http://localhost:3001/api/orders',
                {
                    amount,
                    price,
                    type: 'BUY',
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert('Ordem de compra criada com sucesso!');
            setAmount(0);
            setPrice(0);
        } catch (error) {
            console.error('Erro ao criar ordem de compra:', error);
            alert('Erro ao criar ordem. Tente novamente.');
        }
    };

    return (
        <div>
            <h5>Comprar BTC</h5>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="buyAmount" className="form-label">Quantidade (BTC)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="buyAmount"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        required
                        min="0.0001"
                        step="0.0001"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="buyPrice" className="form-label">Preço (USD)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="buyPrice"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                        min="1"
                        step="0.01"
                    />
                </div>

                <button type="submit" className="btn btn-success">Comprar</button>
            </form>
        </div>
    );
};

export default BuyForm;
