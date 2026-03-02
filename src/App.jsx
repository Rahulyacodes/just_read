import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useUser from './hooks/useUser';
import Landing from './pages/Landing';

function App() {
  const { user } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user.onboardingComplete ? (
              <Navigate to="/home replace" />
            ) : (
              <Landing />
            )
          }
        />

        {/* placeholder until we build these screens */}
        <Route
          path="/onboarding"
          element={
            <div style={{ padding: '2rem' }}>Onboarding coming soon</div>
          }
        />
        <Route
          path="/home"
          element={<div style={{ padding: '2rem' }}>Home coming soon</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
