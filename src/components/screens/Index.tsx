import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const provider = new GoogleAuthProvider();

  const handleComplete = () => {
    // if (completeButtonRef.current) completeButtonRef.current.focus();
    console.log(`User is ${state ? 'signed in' : 'signed out'}`, state);
    // completeButtonRef.current.focus();
    navigate('/journal');
  };

  const loginGuest = () => {
    async () => {
      const result = await signInAnonymously(auth);
      if (result) {
        console.log('login with google reuslt');
        console.log(result);
      }
    };
  };

  const loginWithGoogle = () => {
    async () => {
      const result = await signInWithRedirect(auth, provider);
      if (result) {
        console.log('login with google', result);
      }
    };
  };

  const loginUser = () => {
    async () =>
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log('user login', result);
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          console.log('signed in user:  ', token);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.error(credential);
        });
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
