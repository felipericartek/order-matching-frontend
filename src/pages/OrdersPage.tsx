import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/api';
import Statistics from '../components/Statistics';
import BuyForm from '../components/BuyForm';
import SellForm from '../components/SellForm';
import ActiveOrders from '../components/ActiveOrders';
import MatchHistory from '../components/MatchHistory';
import OrderBook from '../components/OrderBook';
import socket from '../socket'; // <-- Adicionado a conexão com o socket

const OrdersPage = () => {
    const navigate = useNavigate();
    const [statistics, setStatistics] = useState<any>(null);
    const [activeOrders, setActiveOrders] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [orderBook, setOrderBook] = useState([]);

    const fetchStatistics = async () => {
        const { data } = await api.get('/statistics');
        setStatistics(data);
    };

    const fetchActiveOrders = async () => {
        const { data } = await api.get('/orders/active');
        setActiveOrders(data);
    };

    const fetchOrderHistory = async () => {
        const { data } = await api.get('/orders/history');
        setOrderHistory(data);
    };

    const fetchOrderBook = async () => {
        const { data } = await api.get('/orderbook');
        setOrderBook(data);
    };

    const refreshAll = async () => {
        await fetchStatistics();
        await fetchActiveOrders();
        await fetchOrderHistory();
        await fetchOrderBook();
    };

    useEffect(() => {
        refreshAll();

        // Conecta nos eventos de socket
        socket.on('new_order', () => {
            console.log('⚡ Nova ordem recebida via socket');
            refreshAll();
        });

        socket.on('order_cancelled', () => {
            console.log('⚡ Ordem cancelada via socket');
            refreshAll();
        });

        socket.on('match_occurred', () => {
            console.log('⚡ Novo match via socket');
            refreshAll();
        });

        // Remove listeners ao desmontar
        return () => {
            socket.off('new_order');
            socket.off('order_cancelled');
            socket.off('match_occurred');
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Dashboard de Ordens</h2>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>

            {statistics && <Statistics stats={statistics} />}

            <div className="row mt-4">
                <div className="col-md-6">
                    <BuyForm onOrderCreated={refreshAll} />
                </div>
                <div className="col-md-6">
                    <SellForm onOrderCreated={refreshAll} />
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-6">
                    <ActiveOrders orders={activeOrders} onOrderCancelled={refreshAll} />
                </div>
                <div className="col-md-6">
                    <MatchHistory orders={orderHistory} />
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-12">
                    <OrderBook book={orderBook} />
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;
