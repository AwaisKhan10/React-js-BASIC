import { Input, type InputProps } from '@/components/ui/Input';

export type DateInputProps = Omit<InputProps, 'type'>;

export function DateInput(props: DateInputProps) {
  return <Input type="date" {...props} />;
}
