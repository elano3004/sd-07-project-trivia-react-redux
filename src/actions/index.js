import md5 from 'crypto-js/md5';
import {AVATAR, LOGIN, TOKEN, QUESTIONS } from './actionsTypes';

export const clickLogin = ({ email, name }) => ({
  type: LOGIN,
  payload: { email, name },
});

export const clickToken = (token) => ({
  type: TOKEN,
  token,
});

export const clickAvatar = (avatar) => ({
  type: AVATAR,
  avatar,

export const questionsGen = (questions) => ({
  type: QUESTIONS,
  questions,
});

export const fetchToken = () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  return (dispatch) => {
    fetch(URL)
      .then((response) => response.json())
      .then((obj) => {
        const { token } = obj;
        // ENVIAR O TOKEN PARA O LOCALSTORAGE
        localStorage.setItem('token', token);
        return dispatch(clickToken(token));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};


export const fetchGravatar = (email) => {
  const hashEmail = md5(email).toString();
  const URL = `https://www.gravatar.com/avatar/${hashEmail}`;
  return (dispatch) => {
    fetch(URL)
      .then((response) => dispatch(clickAvatar(response.url)))
      .catch((error) => {
        console.log(error);
      
export const fetchQuestions = (token) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  return (dispatch) => {
    fetch(URL)
      .then((response) => response.json())
      .then((obj) => {
        if (obj.response_code === 0) {
          const questions = obj.results;
          return dispatch(questionsGen(questions));
        }
      });
  };
};
