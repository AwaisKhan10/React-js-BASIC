import { Filter, Plus, RefreshCw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui/LoadingState';
import { SearchInput } from '@/components/ui/SearchInput';
import { Table } from '@/components/ui/Table';
import { ErrorState } from '@/components/feedback/ErrorState';
import { Grid } from '@/components/layout/Grid';
import { Page, PageContent, PageHeader } from '@/components/layout/Page';
import { HStack } from '@/components/layout/Stack';
import { useDashboardData } from '@/features/dashboard/hooks/useDashboardData';
import styles from './Dashboard.module.css';
const statusVariant = {
  completed: 'success',
  pending: 'warning',
  failed: 'error',
  active: 'info',
};
export function DashboardPage() {
  const { t } = useTranslation();
  const { stats, orders, loading, error } = useDashboardData();
  const [query, setQuery] = useState('');
  const [showEmpty, setShowEmpty] = useState(false);
  const filtered = useMemo(() => {
    if (showEmpty) return [];
    const q = query.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter(
      (o) => o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q),
    );
  }, [orders, query, showEmpty]);
  const columns = [
    { id: 'id', header: t('dashboard.table.id'), cell: (row) => row.id },
    { id: 'customer', header: t('dashboard.table.customer'), cell: (row) => row.customer },
    {
      id: 'status',
      header: t('dashboard.table.status'),
      cell: (row) => (
        <Badge variant={statusVariant[row.status]}>{t(`common.status.${row.status}`)}</Badge>
      ),
    },
    {
      id: 'amount',
      header: t('dashboard.table.amount'),
      cell: (row) => `$${row.amount.toFixed(2)}`,
    },
    { id: 'date', header: t('dashboard.table.date'), cell: (row) => row.date },
    {
      id: 'actions',
      header: t('dashboard.table.actions'),
      cell: () => (
        <Button variant="ghost" size="sm">
          {t('common.actions.view')}
        </Button>
      ),
    },
  ];
  return (
    <Page>
      <PageHeader
        title={t('dashboard.title')}
        subtitle={t('dashboard.subtitle')}
        actions={
          <HStack gap={2} wrap>
            <Button
              variant="outline"
              icon={<RefreshCw size={16} />}
              onClick={() => setShowEmpty(false)}
            >
              {t('common.actions.refresh')}
            </Button>
            <Button variant="primary" icon={<Plus size={16} />}>
              {t('common.actions.create')}
            </Button>
          </HStack>
        }
      />
      <PageContent>
        {loading ? <LoadingState title={t('dashboard.loading')} /> : null}
        {!loading && error ? <ErrorState /> : null}
        {!loading && !error ? (
          <>
            <Grid columns={4}>
              {stats.map((stat) => (
                <Card key={stat.id}>
                  <CardHeader>
                    <p className="typo-caption">{t(`dashboard.stats.${stat.id}`)}</p>
                    <CardTitle>{stat.value}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <span className={styles.delta}>{stat.delta}</span>
                  </CardContent>
                </Card>
              ))}
            </Grid>

            <Card>
              <CardHeader>
                <HStack justify="between" wrap gap={3}>
                  <CardTitle>{t('dashboard.recentOrders')}</CardTitle>
                  <HStack gap={2} wrap>
                    <div className={styles.search}>
                      <SearchInput
                        placeholder={t('dashboard.searchPlaceholder')}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label={t('common.labels.search')}
                      />
                    </div>
                    <Button
                      variant="outline"
                      icon={<Filter size={16} />}
                      onClick={() => setShowEmpty(true)}
                    >
                      {t('dashboard.filters')}
                    </Button>
                  </HStack>
                </HStack>
              </CardHeader>
              <CardContent>
                {filtered.length === 0 ? (
                  <EmptyState
                    title={t('dashboard.emptyTitle')}
                    description={t('dashboard.emptyDescription')}
                    action={
                      <Button variant="primary" onClick={() => setShowEmpty(false)}>
                        {t('common.actions.reset')}
                      </Button>
                    }
                  />
                ) : (
                  <Table
                    columns={columns}
                    rows={filtered}
                    getRowId={(row) => row.id}
                    striped
                    stickyHeader
                  />
                )}
              </CardContent>
            </Card>
          </>
        ) : null}
      </PageContent>
    </Page>
  );
}
