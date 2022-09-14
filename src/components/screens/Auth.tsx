import LoginForm from '../domain/form/LoginForm';
import { Head } from '../layout/Head';

function AuthScreen() {
  return (
    <>
      <Head title="Login" />
      <LoginForm />
    </>
  );
}

export default AuthScreen;
