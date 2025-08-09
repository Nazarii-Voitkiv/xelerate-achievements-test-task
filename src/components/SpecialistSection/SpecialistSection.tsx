import styles from './SpecialistSection.module.scss';
import { AchievementCard } from '../AchievementCard/AchievementCard';
import { useTranslation } from '@/hooks/useTranslation';
import { Achievement } from '@/types/achievements';
import { specialistAchievements } from '@/data/achievements';

export const SpecialistSection = () => {
  const count = specialistAchievements.length;
  const { t } = useTranslation();

  return (
    <section className={styles.specialistSectionContainer}>
      <header className={styles.contentContainer}>
        <span className={styles.title}>{t('specialistSection.title')}</span>
        <span className={styles.count}>{count}</span>
      </header>
      <ul className={styles.cardsRow}>
        {specialistAchievements.map((achievement: Achievement) => (
          <li key={achievement.id}>
            <AchievementCard
              achievement={achievement}
              {...(achievement.progress ? { progress: achievement.progress, variant: 'extended' } : {})}
              version={achievement.version}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
