import { useReducer, useEffect } from 'react';
import { saveUser, getUser } from '../services/storage';

const defaultUser = {
  id: 'local',
  topics: [],
  difficulty: 'beginner',
  dailyReadingTime: 10,
  theme: 'light',
  fontSize: 'medium',
  onboardingComplete: false,
  createdAt: new Date().toISOString(),
};

// The reducer function
// Receives: current state + action object
// Returns: new state
// Never mutates state directly — always returns a new object
function userReducer(state, action) {
  switch (action.type) {
    case 'SET_TOPICS':
      return { ...state, topics: action.payload };
    // ...state → copy all existing fields
    // topics: action.payload → overwrite just this one field

    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.payload };

    case 'SET_READING_TIME':
      return { ...state, dailyReadingTime: action.payload };

    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'COMPLETE_ONBOARDING':
      return { ...state, onboardingComplete: true };

    case 'RESET':
      return defaultUser;

    default:
      return state;
  }
}

function useUser() {
  const [user, dispatch] = useReducer(
    userReducer,
    null,
    () => getUser() || defaultUser
  );

  useEffect(() => {
    saveUser(user);
  }, [user]);

  // helper dispatch functions for components to use

  const setTopics = (topics) =>
    dispatch({ type: 'SET_TOPICS', payload: topics });
  const setDifficulty = (d) => dispatch({ type: 'SET_DIFFICULTY', payload: d });
  const setReadingTime = (t) =>
    dispatch({ type: 'SET_READING_TIME', payload: t });
  const setTheme = (t) => dispatch({ type: 'SET_THEME', payload: t });
  const completeOnboarding = () => dispatch({ type: 'COMPLETE_ONBOARDING' });
  const resetUser = () => dispatch({ type: 'RESET' });

  return{
    user,
    setTopics,
    setDifficulty,
    setReadingTime,
    setTheme,
    completeOnboarding,
    resetUser,
  }

}

export default useUser
