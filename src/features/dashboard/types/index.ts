export type OrderStatus = 'pending' | 'completed' | 'failed' | 'active';

export interface DashboardOrder {
  id: string;
  customer: string;
  status: OrderStatus;
  amount: number;
  date: string;
}

export interface DashboardStat {
  id: 'users' | 'revenue' | 'orders' | 'growth';
  value: string;
  delta: string;
}
