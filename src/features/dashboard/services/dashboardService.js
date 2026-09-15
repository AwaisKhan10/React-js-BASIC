/** Mock data service — swap for apiClient calls when a backend exists. */
export async function fetchDashboardStats() {
  await delay(400);
  return [
    { id: 'users', value: '12,480', delta: '+12%' },
    { id: 'revenue', value: '$84.2k', delta: '+8%' },
    { id: 'orders', value: '1,942', delta: '+3%' },
    { id: 'growth', value: '24%', delta: '+5%' },
  ];
}
export async function fetchDashboardOrders() {
  await delay(600);
  return [
    {
      id: 'ORD-1001',
      customer: 'Ayesha Khan',
      status: 'completed',
      amount: 240,
      date: '2026-09-10',
    },
    { id: 'ORD-1002', customer: 'Omar Farooq', status: 'pending', amount: 120, date: '2026-09-11' },
    { id: 'ORD-1003', customer: 'Sara Ali', status: 'active', amount: 560, date: '2026-09-12' },
    { id: 'ORD-1004', customer: 'Hassan Raza', status: 'failed', amount: 80, date: '2026-09-13' },
    {
      id: 'ORD-1005',
      customer: 'Fatima Noor',
      status: 'completed',
      amount: 310,
      date: '2026-09-14',
    },
  ];
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
