import Statistics from '../components/Statistics';
import BuyForm from '../components/BuyForm';
import SellForm from '../components/SellForm';
import OrderBook from '../components/OrderBook';
import ActiveOrders from '../components/ActiveOrders';
import MatchHistory from '../components/MatchHistory';

const OrdersPage = () => {
    return (
        <div className="container mt-5">
            <Statistics />

            <div className="row">
                <div className="col-md-6">
                    <BuyForm />
                </div>
                <div className="col-md-6">
                    <SellForm />
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-6">
                    <OrderBook />
                </div>
                <div className="col-md-6">
                    <ActiveOrders />
                    <MatchHistory />
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;
