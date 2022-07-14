import { useNavigate } from 'react-router-dom';

function LoginFormEmail() {
  let navigate = useNavigate();

  function submitForm(e: { preventDefault: () => void }) {
    e.preventDefault();
    navigate('/');
  }

  async function handleSubmit(event: { preventDefault: () => void; target: any }) {
    event.preventDefault();
    await submitForm(event.target);
    navigate('../success', { replace: true });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" autoComplete="true" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" autoComplete="on" />
      </div>
      <button type="submit">Sign up</button>
    </form>
  );
}

export default LoginFormEmail;
