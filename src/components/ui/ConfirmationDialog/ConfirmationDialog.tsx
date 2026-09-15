import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import type { ReactNode } from 'react';

export interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: ReactNode;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Prefer `danger` for destructive confirms (also accepts tone for flexibility) */
  danger?: boolean;
  tone?: 'danger' | 'primary';
  loading?: boolean;
}

export function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger,
  tone = 'primary',
  loading,
}: ConfirmationDialogProps) {
  const isDanger = danger || tone === 'danger';

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={isDanger ? 'danger' : 'primary'}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      {description ? <p className="typo-body-small">{description}</p> : null}
    </Modal>
  );
}
