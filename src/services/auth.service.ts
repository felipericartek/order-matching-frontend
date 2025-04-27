import API from './api';

export async function login(username: string) {
    const response = await API.post('/auth/login', { username });
    return response.data;
}
