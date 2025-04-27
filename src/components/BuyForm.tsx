import React, { useState } from 'react';

interface Props {
    onSubmit: (amount: number, price: number) => void;
}

const BuyForm: React.FC<Props> = ({ onSubmit }) => {
    const [amount, setAmount] = useState(0);
    const [price, setPrice] = useState(0);

    return (
        <div>
            <h3>Comprar BTC</h3>
            <input type="number" placeholder="Quantidade" value={amount} onChange={e => setAmount(Number(e.target.value))} />
            <input type="number" placeholder="Preço USD" value={price} onChange={e => setPrice(Number(e.target.value))} />
            <button onClick={() => onSubmit(amount, price)}>Comprar</button>
        </div>
    );
};

export default BuyForm;
