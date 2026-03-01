import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useUser from './hooks/useUser'
 
function App() {
  const { user } = useUser()

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Just Read</h1>
      <p>Onboarding done: {user.onboardingComplete ? 'yes' : 'no'}</p>
    </div>
  )
}

export default App