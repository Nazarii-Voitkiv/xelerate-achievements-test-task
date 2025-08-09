'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import styles from './Achievements.module.scss';
import { useTranslation } from '@/hooks/useTranslation';
import { platformAchievements, specialistAchievements } from '@/data/achievements';
import Image from 'next/image';
import { Portal } from '@/components/ui/Portal/Portal';

interface AchievementsProps {
  selectedCol: number;
  setSelectedCol: (n: number) => void;
}

export const Achievements = ({ selectedCol, setSelectedCol }: AchievementsProps) => {
  const [isFooterOpen, setIsFooterOpen] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  const dataMap = [
    [...platformAchievements, ...specialistAchievements],
    platformAchievements,
    specialistAchievements,
  ];
  const currentData = dataMap[selectedCol] || [];

  const { t } = useTranslation();

  const unlockedAchievements = currentData.filter((ach) => ach.unlocked).length;
  const totalAchievements = currentData.length;
  const progressPercentage = totalAchievements > 0 ? (unlockedAchievements / totalAchievements) * 100 : 0;

  const rank1Count = currentData.filter(a => a.unlocked && a.version === 'default').length;
  const rank2Count = currentData.filter(a => a.unlocked && a.version === 'silver').length;
  const rank3Count = currentData.filter(a => a.unlocked && a.version === 'gold').length;
  const lockedCount = totalAchievements - unlockedAchievements;

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (!document.getElementById('achievements-portal')) {
      const div = document.createElement('div');
      div.id = 'achievements-portal';
      document.body.appendChild(div);
    }
  }, []);

  useLayoutEffect(() => {
    if (isFooterOpen && footerRef.current) {
      const rect = footerRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: 'fixed',
        left: rect.left,
        top: rect.bottom,
        width: rect.width,
        zIndex: 1000,
      });
    }
  }, [isFooterOpen]);

  return (
    <section className={styles.achievementsContainer}>
      <div className={styles.achievementsContainerBg} />
      <header className={styles.achievementsHeaderBlock}>
        <h1 className={styles.achievementsTitle}>{t('achievements.title')}</h1>
        <div className={styles.achievementsSubtitle}>
          {t('achievements.subtitle').replace('{{percentage}}', Math.round(progressPercentage).toString())}
        </div>
      </header>
      <div className={styles.achievementsContentBlock}>
        <div className={styles.achievementsInnerBlock}>
          <div className={`${styles.achievementsInnerContent} ${styles.achievementsInnerContentMain}`}>
            <div className={styles.achievementsInnerHeader}>
              <Image src="/icons/badge.svg" alt="badge" width={24} height={24} />
              <span className={styles.achievementsHeaderTitle}>{t('achievements.unlocked')}</span>
              <span className={styles.achievementsHeaderCount}>
                <span className={styles.achievementsHeaderCountValue}>{unlockedAchievements}</span>
                <span className={styles.achievementsHeaderCountSeparator}> / {totalAchievements}</span>
              </span>
            </div>
            <div className={styles.achievementsProgressBar}>
              <div
                className={styles.achievementsProgressBarDone}
                style={{ width: `${progressPercentage}%` }}
              />
              <div
                className={styles.achievementsProgressBarRemaining}
                style={{ width: `${100 - progressPercentage}%` }}
              />
            </div>
            <div className={styles.achievementsInnerBg} />
          </div>
          <div className={`${styles.achievementsInnerContent} ${styles.achievementsInnerContentSecondary}`}>
            <div className={styles.achievementsSecondaryValue}>{rank1Count}</div>
            <div className={styles.achievementsSecondaryLabel}>{t('achievements.rank1Unlocked')}</div>
          </div>
          <div className={`${styles.achievementsInnerContent} ${styles.achievementsInnerContentSecondary}`}>
            <div className={styles.achievementsSecondaryValue}>{rank2Count}</div>
            <div className={styles.achievementsSecondaryLabel}>{t('achievements.rank2Unlocked')}</div>
          </div>
          <div className={`${styles.achievementsInnerContent} ${styles.achievementsInnerContentSecondary}`}>
            <div className={styles.achievementsSecondaryValue}>{rank3Count}</div>
            <div className={styles.achievementsSecondaryLabel}>{t('achievements.rank3Unlocked')}</div>
          </div>
          <div className={`${styles.achievementsInnerContent} ${styles.achievementsInnerContentSecondary}`}>
            <div className={styles.achievementsSecondaryValue}>{lockedCount}</div>
            <div className={styles.achievementsSecondaryLabel}>{t('achievements.locked')}</div>
          </div>
        </div>
        <div className={styles.achievementsBottomBlock}>
          <div className={styles.achievementsBottomInner}>
            {['01', '02', '03'].map((label, idx) => (
              <>
                <div
                  key={label}
                  className={`${styles.achievementsBottomCol} ${selectedCol === idx ? styles.selected : ''}`}
                  onClick={() => setSelectedCol(idx)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className={styles.achievementsBottomColLabel}>{label}</span>
                  <div className={styles.achievementsBottomRowInfo}>
                    <span className={styles.achievementsBottomRowLabel}>
                      {idx === 0 ? t('achievements.allAchievements') : idx === 1 ? t('achievements.platformAchievements') : t('achievements.specialistAchievements')}
                    </span>
                    <span className={styles.achievementsBottomRowValue}>
                      {idx === 0
                        ? platformAchievements.length + specialistAchievements.length
                        : idx === 1
                        ? platformAchievements.length
                        : specialistAchievements.length}
                    </span>
                  </div>
                </div>
                {idx < 2 && (
                  <div className={styles.achievementsBottomColDivider} />
                )}
              </>
            ))}
          </div>
          <div
            className={styles.achievementsBottomFooter}
            style={{ cursor: 'pointer' }}
            onClick={() => setIsFooterOpen((v) => !v)}
            ref={footerRef}
          >
            <div className={styles.achievementsBottomFooterRow}>
              <span className={styles.achievementsHeaderTitle}>{t('achievements.allRanks')}</span>
              <Image
                src="/icons/arrow_down.svg"
                alt="badge"
                width={24}
                height={24}
                className={isFooterOpen ? styles.rotated : ''}
                style={{ transition: 'transform 0.3s' }}
              />
            </div>
            {isFooterOpen && (
              <Portal>
                <ul className={styles.achievementsRanksDropdown} style={dropdownStyle}>
                  <li className={styles.achievementsRankRow}>
                    <span>{t('achievements.rank1')}</span>
                    <span>{rank1Count}</span>
                  </li>
                  <li className={styles.achievementsRankRow}>
                    <span>{t('achievements.rank2')}</span>
                    <span>{rank2Count}</span>
                  </li>
                  <li className={styles.achievementsRankRow}>
                    <span>{t('achievements.rank3')}</span>
                    <span>{rank3Count}</span>
                  </li>
                  <li className={styles.achievementsRankRow}>
                    <span>{t('achievements.closed')}</span>
                    <span>{lockedCount}</span>
                  </li>
                </ul>
              </Portal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
