import React from 'react';
import Profile from '~/profile/Profile';

/**
 * Routing page for the Profile
 * @returns {JSX.Element}
 */
function ProfileScreen() {
  const ProfilePageClasses = `flex flex-col items-center justify-center bg-emerald-400 min-h-16`;
  return (
    <div className={ProfilePageClasses}>
      <Profile />
    </div>
  );
}

export default ProfileScreen;
