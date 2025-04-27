import React from 'react';

interface Order {
    id: number;
    amount: number;
    price: number;
    type: 'BUY' | 'SELL';
}

interface Props {
    orders: Order[];
    onCancel?: (id: number) => void;
}

const OrderList: React.FC<Props> = ({ orders, onCancel }) => {
    return (
        <div>
            <h3>Minhas Ordens Ativas</h3>
    <table>
    <thead>
        <tr>
            <th>Tipo</th>
    <th>Quantidade</th>
    <th>Preço</th>
    {onCancel && <th>Ações</th>}
    </tr>
    </thead>
    <tbody>
    {orders.map((order) => (
            <tr key={order.id}>
                <td>{order.type}</td>
                <td>{order.amount}</td>
                <td>${order.price}</td>
        {onCancel && (
            <td>
                <button onClick={() => onCancel(order.id)}>Cancelar</button>
        </td>
        )}
        </tr>
    ))}
        </tbody>
        </table>
        </div>
    );
    };

    export default OrderList;
