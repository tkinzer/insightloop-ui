import LoginForm from '../domain/LoginForm';
import { Head } from '../shared/Head';

function Index() {
  return (
    <>
      <Head title="Insight Loop" />
      <CatGame />
    </>
  );
}

function CatGame() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-center text-3xl font-bold">Cats</p>
        <img className="w-10" src="https://placekitten.com/g/500/500" alt="Cats" />
      </div>
    </div>
  );
}

export default Index;
