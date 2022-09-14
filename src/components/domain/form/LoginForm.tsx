import React, { useEffect, useRef, useState } from 'react';
import Styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '../../context/FirebaseContext';
import EmailAndPasswordLoginForm from './EmailAndPasswordLoginForm';
import splashImage from '../../assets/images/insightloop-splash-white-simple.png';

function LoginForm(): JSX.Element {
  const navigate = useNavigate();
  const { loginWithGoogle, user, loginGuest } = useFirebaseContext();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>, fn: (onSuccess: () => void) => Promise<void>) => {
    e.preventDefault();
    console.log('login using', fn);
    fn(() => {
      navigate('/journal');
    });
  };

  useEffect(() => {
    if (user) {
      navigate('/journal');
    }
  }, [user, navigate]);

  return (
    <>
      <div className="min-h-full flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img className="flex w-1/2 justify-center" src={splashImage} alt="Workflow" />
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm font-medium text-gray-700">Sign in with</p>
            </div>
            <div className="mt-8">
              <div>
                <div>
                  <div className="mt-1 grid grid-cols-1 gap-3">
                    <div>
                      <GoogleLogin
                        onClick={(e) => handleLogin(e, loginWithGoogle)}
                        className="w-full flex justify-center py-2 px-4 border-transparent border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        {/* <span className="sr-only">Sign in with Google</span> */}
                        Sign in with Google
                      </GoogleLogin>
                    </div>
                    <div>
                      <GuestLogin
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={(e) => handleLogin(e, loginGuest)}
                      >
                        Login as Guest
                      </GuestLogin>
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

const GoogleLogin = Styled.button`
  background: url(https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png) no-repeat;
  background-size: contain;
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
