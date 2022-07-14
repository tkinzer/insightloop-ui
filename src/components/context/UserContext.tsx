import { createContext, ReactNode, useContext, useReducer } from 'react';
import { User } from 'firebase/auth';

type UserActions = { type: 'SIGN_IN'; payload: { user: User } } | { type: 'SIGN_OUT' };

export type UserState =
  | {
      state: 'SIGNED_IN';
      currentUser: User;
    }
  | {
      state: 'SIGNED_OUT';
    }
  | {
      state: 'UNKNOWN';
    };

const UserReducer = (state: UserState, action: UserActions): UserState => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        state: 'SIGNED_IN',
        currentUser: action.payload.user,
      };
      break;
    case 'SIGN_OUT':
      return {
        state: 'SIGNED_OUT',
      };
  }
};

type UserContextProps = {
  state: UserState;
  dispatch: (value: UserActions) => void;
};

export const UserContext = createContext<UserContextProps>({ state: { state: 'UNKNOWN' }, dispatch: (val) => {} });

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(UserReducer, { state: 'UNKNOWN' });

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};

const useUserState = () => {
  const { state } = useContext(UserContext);
  return {
    state,
  };
};

const useSignIn = () => {
  const { dispatch } = useContext(UserContext);
  return {
    signIn: (user: User) => {
      dispatch({ type: 'SIGN_IN', payload: { user } });
    },
  };
};

const useSignOut = () => {
  const { dispatch } = useContext(UserContext);
  return {
    signOut: () => {
      dispatch({ type: 'SIGN_OUT' });
    },
  };
};

export { useUserState, useSignIn, useSignOut, UserProvider };
