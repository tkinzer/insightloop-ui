import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '~/components/contexts/UserContext';
import { SignInButton } from '~/components/domain/auth/SignInButton';
import { SignOutButton } from '~/components/domain/auth/SignOutButton';
import { Head } from '~/components/shared/Head';
import { Splash } from '~/components/screens/Splash';

function Index() {
  const { state } = useUserState();
  const navigate = useNavigate();

  const handleComplete = () => {
    // if (completeButtonRef.current) completeButtonRef.current.focus();
    console.log(`User is ${state ? 'signed in' : 'signed out'}`, state);
    // completeButtonRef.current.focus();
    navigate('/journal');
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
            <button onClick={handleComplete}>Continue as Guest</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
