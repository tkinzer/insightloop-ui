// FIX: import Partners from '~/components/screens/Partners';

import RoboHash from '../shared/RoboHash';

function PartnersScreen() {
  return <Partners />;
}

function Partners() {
  const currentDate = new Date();
  return (
    <div>
      Partners
      <RoboHash />
    </div>
  );
}

/* This example requires Tailwind CSS v2.0+ */

export default PartnersScreen;
