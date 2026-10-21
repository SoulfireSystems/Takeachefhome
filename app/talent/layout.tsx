import type { ReactNode } from 'react';
import TalentGuide from './TalentGuide';
import TalentJoinRedirect from './TalentJoinRedirect';

export default function TalentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TalentGuide />
      <TalentJoinRedirect />
      {children}
    </>
  );
}
