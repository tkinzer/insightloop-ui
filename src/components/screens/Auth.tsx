import LoginForm from '../domain/LoginForm';
import { Head } from '../shared/Head';

function Auth() {
  return (
    <>
      <Head title="Login" />
      <LoginForm />
    </>
  );
}

export default Auth;
