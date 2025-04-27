import axios from 'axios';

interface Order {
    id: number;
    amount: number;
    price: number;
    type: 'BUY' | 'SELL';
}

type ActiveOrdersProps = {
    orders: Order[];
    onOrderCancelled: () => Promise<void>;
};

const ActiveOrders = ({ orders, onOrderCancelled }: ActiveOrdersProps) => {
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
            await onOrderCancelled();
        } catch (error) {
            console.error('Erro ao cancelar ordem:', error);
            alert('Erro ao cancelar ordem.');
        }
    };
};

export default ActiveOrders;
