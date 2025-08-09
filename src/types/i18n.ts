import { translations } from '@/data/translations';

export type NestedKeys<T> = {
  [K in keyof T]: T[K] extends object ? `${K & string}.${NestedKeys<T[K]>}` : K & string;
}[keyof T];

export type TranslationKeys = NestedKeys<typeof translations['en']>;