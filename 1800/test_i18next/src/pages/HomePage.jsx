import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const { t } = useTranslation()
  return (
    <div>
      <h2>{t('home.title')}</h2>
      <p>{t('home.description')}</p>
    </div>
  )
}
