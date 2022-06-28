import React from 'react';

interface InsightsContextProps {
  insights: {
    [insightId: string]: any;
  };
  setInsights: (insights: { [insightId: string]: any }) => void;
}

const defaultInsightsContext: InsightsContextProps = {
  insights: {},
  setInsights: () => {},
};

const InsightsContext = React.createContext(defaultInsightsContext);

/**
 * Data hook for insights.
 */
export function useInsights() {
  const context = React.useContext(InsightsContext);
  if (context === undefined) {
    throw new Error('useInsights must be used within an InsightsProvider');
  }
  return context;
}
