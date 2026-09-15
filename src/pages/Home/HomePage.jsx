import { ArrowRight, Languages, Moon, Palette, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Grid } from '@/components/layout/Grid';
import { Page, PageContent, PageHeader } from '@/components/layout/Page';
import { HStack } from '@/components/layout/Stack';
import styles from './Home.module.css';
export function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const features = [
    { icon: Palette, text: t('home.featureTokens') },
    { icon: Moon, text: t('home.featureTheme') },
    { icon: Languages, text: t('home.featureI18n') },
    { icon: ShieldCheck, text: t('home.featureA11y') },
  ];
  return (
    <Page>
      <PageHeader
        title={t('home.title')}
        subtitle={t('home.subtitle')}
        actions={
          <HStack gap={3} wrap>
            <Button
              variant="primary"
              icon={<ArrowRight size={16} />}
              iconPosition="end"
              onClick={() => navigate('/dashboard')}
            >
              {t('home.ctaDashboard')}
            </Button>
            <Button variant="outline" onClick={() => navigate('/design-system')}>
              {t('home.ctaDesignSystem')}
            </Button>
          </HStack>
        }
      />
      <PageContent>
        <section className={styles.heroCard}>
          <p className="typo-section-title">{t('home.featuresTitle')}</p>
          <Grid columns={2}>
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.text}>
                  <CardHeader>
                    <HStack gap={3}>
                      <span className={styles.iconWrap}>
                        <Icon size={18} aria-hidden />
                      </span>
                      <CardTitle>{feature.text}</CardTitle>
                    </HStack>
                  </CardHeader>
                  <CardContent>
                    <p className="typo-body-small">{t('app.tagline')}</p>
                  </CardContent>
                </Card>
              );
            })}
          </Grid>
        </section>
      </PageContent>
    </Page>
  );
}
