import { useLandingPage } from '../hooks/useLandingPage';
import type React from 'react';

export default function LandingPage(): React.ReactElement {
  const { sectionGroups } = useLandingPage();

  return (
    <div className="min-h-screen flex flex-col">
      {sectionGroups.map((group, idx) => (
        <div
          key={idx}
          className={`${group.background}${group.flex ? ' flex flex-col flex-1' : ''}`}
        >
          {group.components.map((Component, i) => (
            <Component key={i} />
          ))}
        </div>
      ))}
    </div>
  );
}
