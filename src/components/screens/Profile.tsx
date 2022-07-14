import React from 'react';
import Profile from '~/profile/Profile';
import { UserState, useUserState } from '../context/UserContext';
import { SignInButton } from '../domain/auth/SignInButton';

/**
 * Routing page for the Profile
 * @returns {JSX.Element}
 */
function ProfileScreen() {
  const ProfilePageClasses = `flex flex-col items-center justify-center h-screen`;
  return (
    <div className={ProfilePageClasses}>
      <Profile />
    </div>
  );
}

export default ProfileScreen;
