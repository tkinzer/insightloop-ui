import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '~/components/context/UserContext';
import { SignInButton } from '~/components/domain/auth/SignInButton';
import { SignOutButton } from '~/components/domain/auth/SignOutButton';
import { getAuth, GoogleAuthProvider, signInAnonymously, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import LoginFormEmail from '../shared/LoginFormEmail';
import { useAuth } from '~/lib/firebase';

function LoginForm(): JSX.Element {
  const { state } = useUserState();
  const navigate = useNavigate();
  const auth = useAuth();

  const loginGuest = async () => {
    console.log('current state', state);
    const result = await signInAnonymously(auth)
      .then((response) => {
        if (response) {
          const user = response.user;
          return user;
        }
      })
      .catch((e) => console.error(e));

    if (result) {
      console.log('loginGuest result', result);
      navigate('/profile');
    }
  };

  return (
    <div className="flex gap-10 flex-col">
      {state.state === 'UNKNOWN' ? (
        <SignInButton />
      ) : state.state === 'SIGNED_OUT' ? (
        <SignInButton />
      ) : (
        <SignOutButton />
      )}
      <button onClick={loginGuest}>Continue as Guest</button>
      <hr />
      <p>or</p>
      <LoginFormEmail />
    </div>
  );
}

export default LoginForm;
