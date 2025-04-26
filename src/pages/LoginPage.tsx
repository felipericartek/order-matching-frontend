import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/auth/login', { username });

            const { token } = response.data;

            localStorage.setItem('token', token);

            navigate('/orders');
        } catch (err) {
            console.error('Erro no login:', err);
            setError('Erro ao fazer login. Verifique o servidor.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">Entrar</button>
            </form>
        </div>
    );
};

export default LoginPage;
