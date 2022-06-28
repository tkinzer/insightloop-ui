import React from 'react';
import Insights from '~/insights/Insights';

/**
 * Routing page for the Insights entries
 * @returns {JSX.Element}
 */
function InsightsPage() {
  const InsightsPageClasses = `flex flex-col items-center justify-center h-screen`;
  return (
    <div className={InsightsPageClasses}>
      <Insights />
    </div>
  );
}

export default InsightsPage;
