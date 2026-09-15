import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
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
}) {
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
          <Button variant={isDanger ? 'danger' : 'primary'} onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      {description ? <p className="typo-body-small">{description}</p> : null}
    </Modal>
  );
}
