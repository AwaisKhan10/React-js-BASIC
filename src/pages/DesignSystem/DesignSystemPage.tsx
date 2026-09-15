import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Plus } from 'lucide-react';
import {
  Accordion,
  Alert,
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardSubtitle,
  CardTitle,
  Checkbox,
  ConfirmationDialog,
  Dropdown,
  EmptyState,
  Input,
  LoadingState,
  Modal,
  PasswordInput,
  Progress,
  SearchInput,
  Select,
  Skeleton,
  Spinner,
  Switch,
  Table,
  Tabs,
  Textarea,
  useToast,
} from '@/components/ui';
import { LanguageSwitcher, ThemeSwitcher } from '@/components/navigation';
import {
  BodySmall,
  BodyText,
  Caption,
  Display,
  Heading,
  HintText,
  Label,
  PageTitle,
  SectionTitle,
  Subtitle,
} from '@/components/typography';
import { Grid } from '@/components/layout/Grid';
import { Page, PageContent, PageHeader } from '@/components/layout/Page';
import { HStack, VStack } from '@/components/layout/Stack';
import { useDisclosure } from '@/hooks/useDisclosure';
import styles from './DesignSystem.module.css';

const colorTokens = [
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
  'background',
  'surface',
  'text-primary',
  'border',
] as const;

export function DesignSystemPage() {
  const { t } = useTranslation();
  const { show } = useToast();
  const modal = useDisclosure();
  const confirm = useDisclosure();
  const [switchOn, setSwitchOn] = useState(true);

  return (
    <Page>
      <PageHeader title={t('designSystem.title')} subtitle={t('designSystem.subtitle')} />
      <PageContent>
        <section className={styles.section}>
          <SectionTitle>{t('designSystem.sections.theme')}</SectionTitle>
          <HStack gap={3} wrap>
            <ThemeSwitcher />
            <LanguageSwitcher />
            <Caption>{t('designSystem.sections.localization')} / RTL</Caption>
          </HStack>
        </section>

        <section className={styles.section}>
          <SectionTitle>{t('designSystem.sections.colors')}</SectionTitle>
          <div className={styles.swatches}>
            {colorTokens.map((token) => (
              <div key={token} className={styles.swatch}>
                <div
                  className={styles.swatchColor}
                  style={{ background: `var(--color-${token})` }}
                />
                <Caption>--color-{token}</Caption>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <SectionTitle>{t('designSystem.sections.typography')}</SectionTitle>
          <VStack gap={3}>
            <Display>Display</Display>
            <Heading level={1}>Heading 1</Heading>
            <Heading level={2}>Heading 2</Heading>
            <Heading level={3}>Heading 3</Heading>
            <PageTitle>PageTitle</PageTitle>
            <SectionTitle>SectionTitle</SectionTitle>
            <Subtitle>Subtitle</Subtitle>
            <BodyText>Body text — the default reading style.</BodyText>
            <BodySmall>Body small secondary copy.</BodySmall>
            <Label>Label</Label>
            <HintText>Hint text</HintText>
            <Caption>Caption</Caption>
          </VStack>
        </section>

        <section className={styles.section}>
          <SectionTitle>{t('designSystem.sections.buttons')}</SectionTitle>
          <HStack gap={2} wrap>
            <Button variant="primary">{t('common.actions.save')}</Button>
            <Button variant="secondary">{t('common.actions.edit')}</Button>
            <Button variant="outline">{t('common.actions.cancel')}</Button>
            <Button variant="ghost">{t('common.actions.view')}</Button>
            <Button variant="danger">{t('common.actions.delete')}</Button>
            <Button variant="success">{t('common.actions.confirm')}</Button>
            <Button variant="link">{t('common.actions.next')}</Button>
            <Button loading>{t('common.loading')}</Button>
            <Button disabled>{t('common.actions.save')}</Button>
            <Button icon={<Plus size={16} />}>{t('common.actions.create')}</Button>
            <Button size="xs">XS</Button>
            <Button size="sm">SM</Button>
            <Button size="md">MD</Button>
            <Button size="lg">LG</Button>
            <Button size="xl">XL</Button>
          </HStack>
        </section>

        <section className={styles.section}>
          <SectionTitle>{t('designSystem.sections.inputs')}</SectionTitle>
          <Grid columns={2}>
            <Input label={t('common.labels.name')} placeholder="Jane Doe" />
            <Input
              label={t('common.labels.email')}
              leftIcon={<Mail size={16} />}
              error={t('common.validation.invalidEmail')}
              defaultValue="bad-email"
            />
            <PasswordInput label={t('common.labels.password')} required />
            <SearchInput label={t('common.labels.search')} />
            <Select
              label={t('common.labels.status')}
              placeholder={t('common.actions.filter')}
              options={[
                { value: 'active', label: t('common.status.active') },
                { value: 'pending', label: t('common.status.pending') },
              ]}
            />
            <Textarea label={t('common.labels.description')} helperText={t('common.optional')} />
            <Checkbox label={t('common.required')} defaultChecked />
            <Switch
              label={t('theme.label')}
              checked={switchOn}
              onChange={(e) => setSwitchOn(e.target.checked)}
            />
          </Grid>
        </section>

        <section className={styles.section}>
          <SectionTitle>{t('designSystem.sections.cards')}</SectionTitle>
          <Grid columns={2}>
            <Card>
              <CardHeader>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
              </CardHeader>
              <CardContent>
                <BodyText>Card content uses surface tokens and --radius-card.</BodyText>
              </CardContent>
              <CardFooter>
                <Button size="sm">{t('common.actions.apply')}</Button>
              </CardFooter>
            </Card>
            <Card interactive>
              <CardHeader>
                <CardTitle>Interactive card</CardTitle>
              </CardHeader>
              <CardContent>
                <BodySmall>Hover uses --color-surface-hover.</BodySmall>
              </CardContent>
            </Card>
          </Grid>
        </section>

        <section className={styles.section}>
          <SectionTitle>{t('designSystem.sections.badges')}</SectionTitle>
          <HStack gap={2} wrap>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">{t('common.status.active')}</Badge>
            <Badge variant="warning">{t('common.status.pending')}</Badge>
            <Badge variant="error">{t('common.status.failed')}</Badge>
            <Badge variant="info">{t('common.status.draft')}</Badge>
          </HStack>
        </section>

        <section className={styles.section}>
          <SectionTitle>{t('designSystem.sections.alerts')}</SectionTitle>
          <VStack gap={3}>
            <Alert variant="info" title="Info">
              Semantic alert using tokens.
            </Alert>
            <Alert variant="success" title="Success">
              Saved successfully.
            </Alert>
            <Alert variant="warning" title="Warning">
              Check this value.
            </Alert>
            <Alert variant="error" title="Error">
              Something failed.
            </Alert>
          </VStack>
        </section>

        <section className={styles.section}>
          <SectionTitle>{t('designSystem.sections.modal')}</SectionTitle>
          <HStack gap={2} wrap>
            <Button onClick={modal.open}>{t('designSystem.sections.modal')}</Button>
            <Button variant="danger" onClick={confirm.open}>
              Confirmation
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                show({ title: 'Toast', description: 'Global feedback', intent: 'success' })
              }
            >
              Toast
            </Button>
          </HStack>
          <Modal
            open={modal.isOpen}
            onClose={modal.close}
            title={t('designSystem.sections.modal')}
            footer={<Button onClick={modal.close}>{t('common.actions.close')}</Button>}
          >
            <BodyText>Accessible dialog with focus restore and Escape to close.</BodyText>
          </Modal>
          <ConfirmationDialog
            open={confirm.isOpen}
            onClose={confirm.close}
            onConfirm={confirm.close}
            title={t('common.actions.delete')}
            description={t('states.error.description')}
            confirmLabel={t('common.actions.confirm')}
            cancelLabel={t('common.actions.cancel')}
            tone="danger"
          />
        </section>

        <section className={styles.section}>
          <SectionTitle>{t('designSystem.sections.dropdown')}</SectionTitle>
          <Dropdown
            trigger={<Button variant="outline">Menu</Button>}
            items={[
              { id: '1', label: t('common.actions.edit') },
              { id: '2', label: t('common.actions.delete'), danger: true },
            ]}
          />
        </section>

        <section className={styles.section}>
          <SectionTitle>{t('designSystem.sections.tabs')}</SectionTitle>
          <Tabs
            items={[
              { id: 'a', label: 'One', content: <BodyText>Tab panel one</BodyText> },
              { id: 'b', label: 'Two', content: <BodyText>Tab panel two</BodyText> },
            ]}
          />
          <Accordion
            items={[
              {
                id: '1',
                title: 'Accordion item',
                content: <BodySmall>Uses logical padding and shared tokens.</BodySmall>,
              },
            ]}
          />
        </section>

        <section className={styles.section}>
          <SectionTitle>{t('designSystem.sections.table')}</SectionTitle>
          <Table
            striped
            stickyHeader
            getRowId={(r) => r.id}
            columns={[
              { id: 'name', header: t('common.labels.name'), cell: (r) => r.name },
              { id: 'role', header: t('common.labels.role'), cell: (r) => r.role },
              {
                id: 'status',
                header: t('common.labels.status'),
                cell: (r) => <Badge variant="success">{r.status}</Badge>,
              },
            ]}
            rows={[
              { id: '1', name: 'Ayesha', role: 'Admin', status: t('common.status.active') },
              { id: '2', name: 'Omar', role: 'Editor', status: t('common.status.active') },
            ]}
          />
        </section>

        <section className={styles.section}>
          <SectionTitle>{t('designSystem.sections.loading')}</SectionTitle>
          <HStack gap={4} wrap>
            <Spinner />
            <Skeleton width={180} height={16} />
            <Progress value={64} label="Progress" />
          </HStack>
          <LoadingState title={t('states.loading.title')} description={t('states.loading.description')} />
        </section>

        <section className={styles.section}>
          <SectionTitle>{t('designSystem.sections.empty')}</SectionTitle>
          <EmptyState
            title={t('states.empty.title')}
            description={t('states.empty.description')}
            action={<Button>{t('common.actions.create')}</Button>}
          />
        </section>
      </PageContent>
    </Page>
  );
}
