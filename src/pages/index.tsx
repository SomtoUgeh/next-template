import { ProtectedRoutes } from '@/components/Routes.config';

const App = () => {
  return (
    <ProtectedRoutes>
      <div className="App">Hi</div>
    </ProtectedRoutes>
  );
};

export default App;
