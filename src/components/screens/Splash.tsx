import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const splashClasses = `flex flex-col items-center justify-center h-screen`;
  return (
    <div className={splashClasses}>
      <LoginFormTemplate />
    </div>
  );
}

function LoginFormTemplate() {
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Ready to dive in?</span>
          <span className="block">Start your free trial today.</span>
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <button
              onClick={(e) => navigate('welcome')}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get started
            </button>
          </div>
          <div className="ml-3 inline-flex">
            <button
              onClick={(e) => navigate('about')}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
            >
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
