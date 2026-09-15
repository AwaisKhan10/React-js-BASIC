import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import styles from './Pagination.module.css';

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
  siblingCount?: number;
}

function range(start: number, end: number): number[] {
  const out: number[] = [];
  for (let i = start; i <= end; i += 1) out.push(i);
  return out;
}

function getPages(page: number, pageCount: number, siblingCount: number): Array<number | 'ellipsis'> {
  if (pageCount <= siblingCount * 2 + 5) return range(1, pageCount);

  const left = Math.max(page - siblingCount, 1);
  const right = Math.min(page + siblingCount, pageCount);
  const showLeftEllipsis = left > 2;
  const showRightEllipsis = right < pageCount - 1;
  const pages: Array<number | 'ellipsis'> = [1];

  if (showLeftEllipsis) pages.push('ellipsis');
  else pages.push(...range(2, left - 1));

  pages.push(...range(left, right));

  if (showRightEllipsis) pages.push('ellipsis');
  else pages.push(...range(right + 1, pageCount - 1));

  if (pageCount > 1) pages.push(pageCount);
  return [...new Set(pages)];
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  className,
  siblingCount = 1,
}: PaginationProps) {
  if (pageCount < 1) return null;
  const pages = getPages(page, pageCount, siblingCount);

  return (
    <nav className={cn(styles.root, className)} aria-label="Pagination">
      <button
        type="button"
        className={styles.btn}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      {pages.map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`e-${i}`} className={styles.ellipsis} aria-hidden>
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            className={cn(styles.btn, p === page && styles.active)}
            aria-current={p === page ? 'page' : undefined}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        className={styles.btn}
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
