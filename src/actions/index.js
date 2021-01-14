// support provided by group 25-thx!
export const LOGIN = 'LOGIN';
export const login = (nome, email) => ({
  type: LOGIN,
  nome,
  email,
});

export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const tokenRequest = (token) => ({ type: TOKEN_REQUEST, token });

export const REQUEST_STARTED = 'REQUEST_STARTED';
export const requestStarted = () => ({ type: REQUEST_STARTED });

export const REQUEST_FAIL = 'REQUEST_FAIL';
export const requestFail = (error) => ({ type: REQUEST_FAIL, error });

export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const fetchQuestionsSuccess = (payload) => (
  { type: 'FETCH_QUESTIONS_SUCCESS', payload });

export const UPDATE_SCORE = 'UPDATE_SCORE';
export const updateScore = () => ({ type: UPDATE_SCORE });

export function fetchToken() {
  return async (dispatch) => {
    try {
      dispatch(requestStarted());
      const fetchAPI = await fetch('https://opentdb.com/api_token.php?command=request');
      const token = await fetchAPI.json();
      dispatch(tokenRequest(token));
    } catch (erro) {
      dispatch(requestFail());
    }
  };
}

export const fetchQuestions = (token) => async (dispatch) => {
  const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  dispatch(requestStarted());
  try {
    dispatch(fetchQuestionsSuccess(data));
  } catch (error) {
    dispatch(requestFail(error));
  }
};
