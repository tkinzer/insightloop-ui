import React, { useEffect } from 'react';

interface InsightProps {
  text: string;
  id: string;
}

interface InsightsContext {
  insights: InsightProps[];
}

const InsightContext = React.createContext<InsightsContext>({
  insights: [],
});

export const InsightsProvider = InsightContext.Provider;

/**
 * Data hook for insights.
 */
export default function useInsights() {
  const { insights } = React.useContext(InsightContext);

  useEffect(() => {
    insights.forEach((insight) => {
      console.log(insight);
    });
  }, [insights]);

  return {
    insights,
  };
}
