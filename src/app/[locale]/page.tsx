'use client';

import { Achievements } from '@/components/Achievements/Achievements';
import { PlatformSection } from '@/components/PlatformSection/PlatformSection';
import { SpecialistSection } from '@/components/SpecialistSection/SpecialistSection';
import { useState } from 'react';
import styles from './page.module.css';

export default function HomePage() {
  const [selectedCol, setSelectedCol] = useState(0);

  return (
    <main className={styles.main}>
      <Achievements selectedCol={selectedCol} setSelectedCol={setSelectedCol} />
      {selectedCol === 0 && (
        <>
          <PlatformSection />
          <SpecialistSection />
        </>
      )}
      {selectedCol === 1 && <PlatformSection />}
      {selectedCol === 2 && <SpecialistSection />}
    </main>
  );
}