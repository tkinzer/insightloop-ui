import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '../../context/FirebaseContext';

export default function EmailAndPasswordLoginForm() {
  const { auth, loginUserWithEmailAndPassword } = useFirebaseContext();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.debug('handleSubmit...', email, password);
    const emailInput = emailRef.current?.value;
    const passwordInput = passwordRef.current?.value;

    if (!emailInput || !passwordInput) {
      setError('Please enter an email and password');
      return;
    }

    setEmail(emailInput);
    setPassword(passwordInput);

    loginUserWithEmailAndPassword(emailInput, passwordInput)
      .then((response) => {
        if (response) {
          console.log('loginUserWithEmailAndPassword', response);
          setError('');
          navigate('/home');
        }
      })
      .catch((e) => console.error(e));
  };

  // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const signIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('signIn...');
  };

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
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
            onClick={(e) => signIn(e)}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
