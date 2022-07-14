import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const SignInButton = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  async function loginWithGoogle() {
    // FIX: add text field for entering email
    // Using a redirect.
    getRedirectResult(auth).then(function (result) {
      if (result) {
        // This gives you a Google Access Token.
        console.log(result);
      }
    });

    // Start a sign in process for an unauthenticated user.
    var provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    signInWithRedirect(auth, provider);
  }

  async function loginUser() {
    console.log('login in user');
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
  }

  return (
    <div className="flex flex-col gap-2">
      <button onClick={loginUser} type="button" className="btn normal-case min-w-60">
        Sign in With Google
      </button>
    </div>
  );
};
