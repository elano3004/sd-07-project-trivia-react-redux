/*
  REFERENCE:
    https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
*/
const STATE_KEY = 'state';
const TOKEN_KEY = 'token';

const KEYS = [
  STATE_KEY,
  TOKEN_KEY,
];

export const loadState = () => {
  const state = {};
  try {
    KEYS.forEach((KEY) => {
      const serializedState = localStorage.getItem(KEY);
      const resultState = JSON.parse(serializedState);
      console.log(KEY);
      console.log('resultState', resultState);
      switch (KEY) {
      case STATE_KEY:
        state.user = resultState || {};
        break;
      case TOKEN_KEY:
        state.triviaToken = {
          isLoading: false,
          token: resultState || '',
        };
        break;
      default:
      }
    });
    console.log('state', state);
    return state;
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state.user));
    localStorage.setItem(TOKEN_KEY, JSON.stringify(state.triviaToken.token));
  } catch (error) {
    // IGNORE WRITE ERRORS
  }
};
