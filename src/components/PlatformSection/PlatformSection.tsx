import styles from './PlatformSection.module.scss';
import { AchievementCard } from '../AchievementCard/AchievementCard';
import { useTranslation } from '@/hooks/useTranslation';
import { Achievement } from '@/types/achievements';
import { platformAchievements } from '@/data/achievements';

export const PlatformSection = () => {
  const topRow = platformAchievements.filter((_: Achievement, i: number) => i % 2 === 0);
  const bottomRow = platformAchievements.filter((_: Achievement, i: number) => i % 2 === 1);
  const count = platformAchievements.length;
  const { t } = useTranslation();

  return (
    <section className={styles.newSectionContainer}>
      <header className={styles.contentContainer}>
        <span className={styles.title}>{t('platformSection.title')}</span>
        <span className={styles.count}>{count}</span>
      </header>
      <div className={styles.rowsContainer}>
        <ul className={styles.cardsRow}>
          {topRow.map((achievement: Achievement) => (
            <li key={achievement.id}>
              <AchievementCard
                achievement={achievement}
                {...(achievement.progress ? { progress: achievement.progress, variant: 'extended' } : {})}
                version={achievement.version}
              />
            </li>
          ))}
        </ul>
        <ul className={styles.cardsRow}>
          {bottomRow.map((achievement: Achievement) => (
            <li key={achievement.id}>
              <AchievementCard
                achievement={achievement}
                {...(achievement.progress ? { progress: achievement.progress, variant: 'extended' } : {})}
                version={achievement.version}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
