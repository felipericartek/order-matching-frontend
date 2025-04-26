import { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
    id: number;
    amount: number;
    price: number;
    type: 'BUY' | 'SELL';
}

const ActiveOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    const fetchActiveOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await axios.get('http://localhost:3001/api/orders/active', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setOrders(response.data);
        } catch (error) {
            console.error('Erro ao buscar ordens ativas:', error);
        }
    };

    const cancelOrder = async (orderId: number) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            await axios.delete(`http://localhost:3001/api/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('Ordem cancelada com sucesso!');
            fetchActiveOrders(); // Atualiza a lista
        } catch (error) {
            console.error('Erro ao cancelar ordem:', error);
            alert('Erro ao cancelar ordem.');
        }
    };

    useEffect(() => {
        fetchActiveOrders();
    }, []);

    return (
        <div>
            <h5>Minhas Ordens Ativas</h5>
            {orders.length === 0 ? (
                <p>Você não tem ordens ativas.</p>
            ) : (
                <table className="table table-sm">
                    <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Quantidade</th>
                        <th>Preço (USD)</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.type}</td>
                            <td>{order.amount}</td>
                            <td>{order.price}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => cancelOrder(order.id)}
                                >
                                    Cancelar
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ActiveOrders;
