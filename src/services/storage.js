const KEY = {
  USER: 'js_user',
  HISTORY: 'js_history',
  STREAK: 'js_streak',
  SAVED: 'js_saved',
};

// User

export const saveUser = (data) => {
  localStorage.setItem(KEY.USER, JSON.stringify(data));
};

export const getUser = () => {
  try {
    const data = localStorage.getItem(KEY.USER);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const cleanUser = () => {
  localStorage.removeItem(KEY.USER);
};
