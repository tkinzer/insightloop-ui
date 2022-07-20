import { signInAnonymously } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import Styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '../context/FirebaseContext';
import EmailAndPasswordLoginForm from './EmailAndPasswordLoginForm';

function LoginForm(): JSX.Element {
  const navigate = useNavigate();
  const { auth, loginWithGoogle } = useFirebaseContext();

  const loginGuest = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!auth) {
      console.error('No auth');
      return;
    }

    signInAnonymously(auth)
      .then((response) => {
        if (response) {
          console.log('signInAnonymously', response);
        }
      })
      .finally(() => {
        navigate('/home');
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <div className="min-h-full flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome to InsightLoop</h2>
              <p className="mt-2 text-sm text-indigo-600 hover:text-indigo-500">Growth. Change. Acceptance.</p>
            </div>

            <div className="mt-8">
              <div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Sign in with</p>

                  <div className="mt-1 grid grid-cols-1 gap-3">
                    <div>
                      <GoogleLogin
                        href="#"
                        onClick={(e) => loginWithGoogle()}
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <span className="sr-only">Sign in with Google</span>
                      </GoogleLogin>
                    </div>
                    <div>
                      <GuestLogin onClick={(e) => loginGuest(e)}>Login as Guest</GuestLogin>
                    </div>
                  </div>
                </div>

                <div className="mt-6 relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <EmailAndPasswordLoginForm />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt="Cool image"
          />
        </div>
      </div>
    </>
  );
}

// const mapDispatchToProps = (dispatch) => ({
//   loginUserWithEmailAndPassword: (email, password) =>
//     dispatch(loginUserWithEmailAndPassword(email, password)),
// });

const GoogleLogin = Styled.a`
  background: url(https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png) no-repeat;
  background-size: contain;
  width: 100%;
  height: 100%;
  display: block;

  &:hover {
    border: 1px solid #ddd;
  }

  &:focus:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
  }
`;

const GuestLogin = Styled.button`
  background: colors.indigo;
  background-size: contain;
  
  width: 100%;
  height: 100%;
  display: block;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

export default LoginForm;
