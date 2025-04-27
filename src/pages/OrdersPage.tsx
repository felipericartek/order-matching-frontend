import React from 'react';
import { useOrders } from '../hooks/useOrders';
import { useStatistics } from '../hooks/useStatistics';
import BuyForm from '../components/BuyForm';
import SellForm from '../components/SellForm';
import OrderList from '../components/OrderList';
import Statistics from '../components/Statistics';
import LoadingSpinner from '../components/LoadingSpinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrdersPage: React.FC = () => {
    const { activeOrders, history, loading, submitOrder, cancelMyOrder } = useOrders();
    const { stats } = useStatistics();

    const handleBuy = async (amount: number, price: number) => {
        try {
            await submitOrder('BUY', amount, price);
            toast.success('Ordem de compra criada com sucesso!');
        } catch (error) {
            toast.error('Erro ao criar ordem de compra.');
        }
    };

    const handleSell = async (amount: number, price: number) => {
        try {
            await submitOrder('SELL', amount, price);
            toast.success('Ordem de venda criada com sucesso!');
        } catch (error) {
            toast.error('Erro ao criar ordem de venda.');
        }
    };

    const handleCancel = async (id: number) => {
        try {
            await cancelMyOrder(id);
            toast.success('Ordem cancelada com sucesso!');
        } catch (error) {
            toast.error('Erro ao cancelar ordem.');
        }
    };

    return (
        <div className="container mt-4">
            <ToastContainer />
            <h1 className="mb-4">Painel de Ordens</h1>

            <div className="row mb-4">
                <div className="col-md-6 mb-3">
                    <div className="card p-3">
                        <BuyForm onSubmit={handleBuy} />
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="card p-3">
                        <SellForm onSubmit={handleSell} />
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-12">
                    <div className="card p-3">
                        {stats ? <Statistics stats={stats} /> : <LoadingSpinner />}
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-12">
                    <div className="card p-3">
                        <h3>Histórico de Ordens</h3>
                        {loading ? <LoadingSpinner /> : <OrderList orders={history} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;
