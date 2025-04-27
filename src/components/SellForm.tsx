import { useState } from 'react';
import axios from 'axios';

type SellFormProps = {
    onOrderCreated: () => Promise<void>;
};

const SellForm = ({ onOrderCreated }: SellFormProps) => {
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

            await axios.post('http://localhost:3001/api/orders', {
                amount,
                price,
                type: 'SELL',
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('Ordem de venda criada com sucesso!');
            setAmount(0);
            setPrice(0);

            await onOrderCreated();
        } catch (error) {
            console.error('Erro ao criar ordem de venda:', error);
            alert('Erro ao criar ordem. Tente novamente.');
        }
    };

    return (
        <div>
            <h5>Vender BTC</h5>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="sellAmount" className="form-label">Quantidade (BTC)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="sellAmount"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        required
                        min="0.0001"
                        step="0.0001"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="sellPrice" className="form-label">Preço (USD)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="sellPrice"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                        min="1"
                        step="0.01"
                    />
                </div>

                <button type="submit" className="btn btn-danger">Vender</button>
            </form>
        </div>
    );
};

export default SellForm;
