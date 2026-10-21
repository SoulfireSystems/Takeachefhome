import type { ReactNode } from 'react';
import TalentGuide from './TalentGuide';

export default function TalentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TalentGuide />
      {children}
    </>
  );
}
