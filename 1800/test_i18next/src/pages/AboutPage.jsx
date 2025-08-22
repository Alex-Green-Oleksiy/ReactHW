import { useTranslation } from 'react-i18next'

export default function AboutPage() {
  const { t } = useTranslation()
  return (
    <div>
      <h2>{t('about.title')}</h2>
      <p>{t('about.text')}</p>
    </div>
  )
}
