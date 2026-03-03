import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useUser from './hooks/useUser';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';

function App() {
  const { user } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user.onboardingComplete ? (
              <Navigate to="/home" replace />
            ) : (
              <Landing />
            )
          }
        />

        {/* placeholder until we build these screens */}
        <Route path="/home" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* NEW: placeholder routes */}
        <Route path="/library" element={<div style={{padding:'2rem'}}>Library coming soon</div>} />
        <Route path="/progress" element={<div style={{padding:'2rem'}}>Progress coming soon</div>} />
        <Route path="/settings" element={<div style={{padding:'2rem'}}>Settings coming soon</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
