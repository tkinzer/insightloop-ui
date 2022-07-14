import LoginForm from '../domain/LoginForm';
import { Head } from '../shared/Head';

function Index() {
  return (
    <>
      <Head title="Insight Loop" />
      <div className="hero min-h-screen">
        <div className="text-center hero-content">
          <div className="mt-4 grid gap-2">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
