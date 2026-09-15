import { useEffect, useState } from 'react';
import { fetchDashboardOrders, fetchDashboardStats } from '../services/dashboardService';
export function useDashboardData() {
  const [stats, setStats] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [nextStats, nextOrders] = await Promise.all([
          fetchDashboardStats(),
          fetchDashboardOrders(),
        ]);
        if (cancelled) return;
        setStats(nextStats);
        setOrders(nextOrders);
      } catch {
        if (!cancelled) setError('failed');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);
  return { stats, orders, loading, error };
}
