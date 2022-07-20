import React from 'react';

const InsightContext = React.createContext({
  insights: [],
});

/**
 * Data hook for insights.
 */
export default function useInsights() {
  const context = React.useContext(InsightContext);
  if (context === undefined) {
    throw new Error('useInsights must be used within an InsightsProvider');
  }

  function addEntry() {
    // TODO
  }

  function createEntry() {}

  return {
    entries: context.insights,
    addEntry,
    createEntry,
  };
}
