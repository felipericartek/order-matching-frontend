import API from './api';

export async function getStatistics() {
    const response = await API.get('/statistics');
    return response.data;
}
