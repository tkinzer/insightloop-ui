import React from 'react';
import Profile from '~/profile/Profile';

/**
 * Routing page for the Profile
 * @returns {JSX.Element}
 */
function ProfilePage() {
  const ProfilePageClasses = `flex flex-col items-center justify-center h-screen`;
  return (
    <div className={ProfilePageClasses}>
      <Profile />
    </div>
  );
}

export default ProfilePage;
