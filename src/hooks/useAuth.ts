import { useState } from 'react';
import { login } from '../services/auth.service';

export function useAuth() {
    const [loading, setLoading] = useState(false);

    async function handleLogin(username: string) {
        setLoading(true);
        try {
            const data = await login(username);
            localStorage.setItem('token', data.token);
            return true;
        } catch (error) {
            console.error('Erro no login', error);
            return false;
        } finally {
            setLoading(false);
        }
    }

    function logout() {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    return { handleLogin, logout, loading };
}
