import React from 'react';
import Profile from '~/profile/Profile';

/**
 * Routing page for the Profile
 * @returns {JSX.Element}
 */
function ProfileScreen() {
  const ProfilePageClasses = `flex flex-col items-center justify-center bg-emerald-400 min-h-16`;

  // TODO: Add a Profile component with a ProfileProvider
  // TODO: use the user to get robohash img
  return (
    <div className={ProfilePageClasses}>
      <h1>Anonymous</h1>
      <img src="https://robohash.org/tim" alt="contact image" />
      <Profile />
    </div>
  );
}

export default ProfileScreen;
