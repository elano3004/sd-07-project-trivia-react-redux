import { EMAIL, LOGIN, SCORE, ASSERTIONS, GRAVATAR } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: '',
  gravatarEmail: '',
  point: 0,
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EMAIL:
    return {
      ...state, email: action.email,
    };
  case LOGIN:
    return {
      ...state, name: action.name,
    };
  case SCORE:
    return {
      ...state, score: action.score,
    };
  case ASSERTIONS:
    return {
      ...state, assertions: action.assertions,
    };
  case GRAVATAR:
    return {
      ...state, gravatarEmail: action.gravatar,
    };
  default:
    return state;
  }
}

export default user;
