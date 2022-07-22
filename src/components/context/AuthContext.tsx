import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth, getRedirectResult, UserCredential } from 'firebase/auth';

import React from 'react';

const AuthContext = React.createContext({
  auth: null,
  signInWithRedirect: () => {},
  signOut: () => {},
});

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = (props: React.PropsWithChildren<{}>): JSX.Element => {
  const [auth, setAuth] = React.useState<any>();
  const [provider, setProvider] = React.useState<GoogleAuthProvider>();

  const signOut = () => {
    if (!auth) return;
    auth.signOut();
  };

  React.useEffect(() => {
    if (!auth) return;
    setAuth(auth);
  }, []);

  React.useEffect(() => {
    const authProvider = new GoogleAuthProvider();
    setProvider(authProvider);
  }, []);

  const signInWithRedirect = React.useCallback(() => {
    return getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // This gives you a Google Access Token. You can use it to access Google APIs.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;

          // Store the token in your app for later use.
          console.log(token);

          // The signed-in user info.
          const user = result.user;
          console.debug(user);

          return result;
        }
        console.error(`No result returned`);
        return null;
      })
      .catch((error: any) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }, [auth]);

  return <AuthContext.Provider value={{ auth, signInWithRedirect, signOut }}>{props.children}</AuthContext.Provider>;
};
