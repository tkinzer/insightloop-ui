import { signInAnonymously } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import Styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useFirebase from '../context/FirebaseContext';

function LoginForm(): JSX.Element {
  const { auth, initializeApp, loginUser } = useFirebase();
  const navigate = useNavigate();

  const loginGuest = () => {
    if (!auth) {
      console.error('auth is null');
      initializeApp();
      return;
    }

    signInAnonymously(auth)
      .then((response) => {
        if (response) {
          console.log('signInAnonymously', response);
        }
      })
      .catch((e) => console.error(e));
  };

  return <Form />;
}

/**
 *
 * @param props
 * @returns Login Form Element
 */
function Form(): JSX.Element {
  const navigate = useNavigate();
  const { loginUser, loginUserWithEmailAndPassword } = useFirebase();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError('Please enter an email and password');
      return;
    }

    loginUserWithEmailAndPassword(email, password)
      .then((response) => {
        if (response) {
          console.log('loginUserWithEmailAndPassword', response);
        }
      })
      .catch((e) => console.error(e));
  };

  function loginWithGoogle(e: React.MouseEvent): void {
    e.preventDefault();
    const result = loginUser();
    if (result) {
      console.log('loginUser', result);
      navigate('/profile');
    }
  }

  return <Form loginUser={loginUser} />;
}

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
interface FormProps {
  loginUser: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}
function Form(props: FormProps): JSX.Element {
  const { loginUser } = props;
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

                  <div className="mt-1 grid grid-cols-3 gap-3">
                    <div>
                      <GoogleLogin
                        href="#"
                        onClick={(e) => loginWithGoogle(e)}
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <span className="sr-only">Sign in with Google</span>
                      </GoogleLogin>
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
                <form action="#" onSubmit={handleSubmit} method="POST" className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        ref={(emailRef) => emailRef && emailRef.focus()}
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>

                    {/* <div className="text-sm">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                      </a>
                    </div> */}
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
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
    background: url('/img/google-logo-hover.png') no-repeat;
  }

  &:active {
    background: url('/img/google-logo-active.png') no-repeat;
  }

  &:focus {
    outline: none;
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

export default LoginForm;
