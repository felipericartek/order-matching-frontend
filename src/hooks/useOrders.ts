import { useState, useEffect } from 'react';
import { createOrder, getMyActiveOrders, getMyOrderHistory, cancelOrder } from '../services/order.service';

export function useOrders() {
    const [activeOrders, setActiveOrders] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchActiveOrders() {
        setLoading(true);
        try {
            const data = await getMyActiveOrders();
            setActiveOrders(data);
        } catch (error) {
            console.error('Erro ao buscar ordens ativas', error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchOrderHistory() {
        setLoading(true);
        try {
            const data = await getMyOrderHistory();
            setHistory(data);
        } catch (error) {
            console.error('Erro ao buscar histórico', error);
        } finally {
            setLoading(false);
        }
    }

    async function submitOrder(type: 'BUY' | 'SELL', amount: number, price: number) {
        await createOrder(type, amount, price);
        await fetchActiveOrders();
    }

    async function cancelMyOrder(orderId: number) {
        await cancelOrder(orderId);
        await fetchActiveOrders();
    }

    useEffect(() => {
        fetchActiveOrders();
        fetchOrderHistory();
    }, []);

    return { activeOrders, history, loading, submitOrder, cancelMyOrder };
}
