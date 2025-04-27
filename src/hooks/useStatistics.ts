import { useState, useEffect } from 'react';
import { getStatistics } from '../services/statistics.service';

export function useStatistics() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    async function fetchStatistics() {
        setLoading(true);
        try {
            const data = await getStatistics();
            setStats(data);
        } catch (error) {
            console.error('Erro ao buscar estatísticas', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchStatistics();
    }, []);

    return { stats, loading };
}
