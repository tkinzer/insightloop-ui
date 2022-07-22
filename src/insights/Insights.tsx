// import List from '@material-ui/core/List';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FloatingButton from '~/components/shared/ui/FloatingButton';
import useInsights from './useInsights';

export default function Insights() {
  const { insights } = useInsights();
  const navigate = useNavigate();

  const goToCreateInsight = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/insights/new');
  };

  return (
    <main>
      <h1>Insights</h1>
      <ul>
        {insights.map((insight) => (
          <li key={insight.id}>
            <Link to={`/insights/${insight.id}`}>{insight.text}</Link>
          </li>
        ))}
      </ul>
      <FloatingButton onClick={goToCreateInsight} />
    </main>
  );
}
