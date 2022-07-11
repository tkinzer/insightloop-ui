import React, { useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUserState } from '~/components/contexts/UserContext';
import { SignInButton } from '~/components/domain/auth/SignInButton';
import { SignOutButton } from '~/components/domain/auth/SignOutButton';
import { Head } from '~/components/shared/Head';
import { Splash } from '~/components/screens/Splash';
import { getAuth, GoogleAuthProvider, signInAnonymously, signInWithPopup, signInWithRedirect } from 'firebase/auth';

function Index() {
  const { state } = useUserState();
  const navigate = useNavigate();
  const auth = getAuth();

  const loginGuest = () => {
    async () => {
      console.log('current state', state);
      const result = await signInAnonymously(auth);
      if (result) {
        console.log('login with google reuslt');
        console.log(result);
      }
    };
  };

  const continueWithNoLogin = () => {
    navigate('journal');
  };

  return (
    <>
      <Head title="Insight Loop" />
      <div className="hero min-h-screen">
        <div className="text-center hero-content">
          <div className="mt-4 grid gap-2">
            {state.state === 'UNKNOWN' ? (
              <SignInButton />
            ) : state.state === 'SIGNED_OUT' ? (
              <SignInButton />
            ) : (
              <SignOutButton />
            )}
            {/* <Navigate to="/home" /> */}
            <button onClick={loginGuest}>Continue as Guest</button>
            <button onClick={continueWithNoLogin}>Continue as Guest</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
