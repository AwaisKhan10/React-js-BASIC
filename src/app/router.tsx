import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoadingState } from '@/components/ui/LoadingState';
import { AppLayout } from '@/layouts/AppLayout';

const HomePage = lazy(() => import('@/pages/Home').then((m) => ({ default: m.HomePage })));
const DashboardPage = lazy(() =>
  import('@/pages/Dashboard').then((m) => ({ default: m.DashboardPage })),
);
const DesignSystemPage = lazy(() =>
  import('@/pages/DesignSystem').then((m) => ({ default: m.DesignSystemPage })),
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFound').then((m) => ({ default: m.NotFoundPage })),
);

function RouteFallback() {
  return <LoadingState />;
}

/**
 * Central route table — add feature routes here, keep feature code in features/.
 */
export function AppRouter() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="design-system" element={<DesignSystemPage />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
