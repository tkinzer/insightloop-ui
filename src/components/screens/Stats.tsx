import React from 'react';
import Stats from '~/stats/Stats';

/**
 * Routing page for the Stats entries
 * @returns {JSX.Element}
 */
function StatsScreen() {
  const StatsPageClasses = `flex flex-col items-center justify-center h-screen`;
  return (
    <div className={StatsPageClasses}>
      <Stats />
    </div>
  );
}

export default StatsScreen;
