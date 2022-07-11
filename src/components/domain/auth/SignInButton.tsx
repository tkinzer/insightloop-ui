import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const SignInButton = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = () => {
    async () => {
      const result = await signInWithRedirect(auth, provider);
      if (result) {
        console.log('login with google', result);
        // completeButtonRef.current.focus();
        navigate('/journal');
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
    <button onClick={loginUser} type="button" className="btn btn-primary normal-case min-w-60">
      Sign in With Google
    </button>
  );
};
