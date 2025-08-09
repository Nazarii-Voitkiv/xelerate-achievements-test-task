import { useParams } from 'next/navigation';
import { translations } from '@/data/translations';
import { TranslationKeys } from '@/types/i18n';

export const useTranslation = () => {
  const params = useParams();
  const locale = params.locale as keyof typeof translations || 'ua'; 

  const t = (key: TranslationKeys): string => {
    const keys = key.split('.');
    let current: any = translations[locale];

    for (const k of keys) {
      if (typeof current === 'object' && current !== null && k in current) {
        current = current[k];
      } else {
        return `Translation missing for ${key}`;
      }
    }
    return typeof current === 'string' ? current : `Translation missing for ${key}`;
  };

  return { t, locale };
};
