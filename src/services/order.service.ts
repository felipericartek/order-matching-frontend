import API from './api';

export async function createOrder(type: 'BUY' | 'SELL', amount: number, price: number) {
    const response = await API.post('/orders', {
        type,
        amount,
        price,
    });
    return response.data;
}

export async function getMyActiveOrders() {
    const response = await API.get('/orders/active');
    return response.data;
}

export async function getMyOrderHistory() {
    const response = await API.get('/orders/history');
    return response.data;
}

export async function cancelOrder(orderId: number) {
    const response = await API.delete(`/orders/${orderId}`);
    return response.data;
}
