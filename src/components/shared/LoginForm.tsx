import { useNavigate } from 'react-router-dom';

function SignupForm() {
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
        <input type="email" id="email" name="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
      </div>
      <button type="submit">Sign up</button>
    </form>
  );
}
