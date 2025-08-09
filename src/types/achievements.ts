import { TranslationKeys } from './i18n';

export interface Achievement {
  id: number;
  title: TranslationKeys;
  description: TranslationKeys;
  unlocked: boolean;
  progress?: {
    current: number;
    total: number;
  };
  version?: 'default' | 'gold' | 'silver';
}