import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';

export const SignInButton = () => {
  const provider = new GoogleAuthProvider();
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  const handleClick = () => {
    // signInWithRedirect(auth, provider);
  };

  return (
    <button onClick={handleClick} type="button" className="btn btn-primary normal-case min-w-60">
      Sign In With Google
    </button>
  );
};
