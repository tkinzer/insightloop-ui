import LoginForm from '../domain/LoginForm';
import { Head } from '../shared/Head';

function AuthScreen() {
  return (
    <>
      <Head title="Login" />
      <LoginForm />
    </>
  );
}

export default AuthScreen;
