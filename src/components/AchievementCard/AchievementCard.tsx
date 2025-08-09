import styles from './AchievementCard.module.scss';
import Image from 'next/image';
import { Achievement } from '@/types/achievements';

import { useTranslation } from '@/hooks/useTranslation';

interface AchievementCardProps {
  achievement: Achievement;
  progress?: {
    current: number;
    total: number;
  };
  variant?: 'default' | 'extended';
  version?: 'default' | 'gold' | 'silver';
}

export const AchievementCard = ({
  achievement,
  progress,
  variant = 'default',
  version = 'default',
}: AchievementCardProps) => {
  const { title, description, unlocked } = achievement;
  const versionClass = styles[version];
  const progressPercentage = progress ? (progress.current / progress.total) * 100 : 0;
  const { t } = useTranslation();

  return (
    <div className={`${styles.cardContainerBase} ${versionClass}`}>
      <div className={styles.contentWrapper}>
        <Image className={styles.iconContainer} src="/icons/info_icon.svg" alt="info" width={24} height={24} />
        <Image
          className={unlocked ? '' : styles.shieldIcon}
          src={unlocked ? '/icons/shield.svg' : '/icons/locked.svg'}
          alt={unlocked ? 'shield' : 'locked'}
          width={unlocked ? 116 : 80}
          height={unlocked ? 116 : 80}
        />
      </div>
      <div className={styles.divider}></div>
      <div className={styles.textContainer}>
        <span className={styles.cardTitle}>{t(title)}</span>
        {variant === 'default' ? (
          <span className={styles.cardDescription}>{t(description)}</span>
        ) : (
          <div className={styles.extendedContainer}>
            <div className={styles.horizontalContainer}>
              <span className={styles.cardDescription}>{t('achievementCard.label')}</span>
              {progress && (
                <div>
                  <span className={styles.progressTextTotal}>{progress.current} </span>
                  <span className={styles.progressText}>/ {progress.total}</span>
                </div>
              )}
            </div>
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBarCompleted} style={{ width: `${progressPercentage}%` }}></div>
              <div className={styles.progressBarRemaining} style={{ width: `${100 - progressPercentage}%` }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};