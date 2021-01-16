const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  token: '',
};

export default function player(state = initialState, action) {
  switch (action.type) {
  case 'token':
    localStorage.setItem('token', action.payload);
    return {
      ...state,
      token: action.payload,
    };
  case 'login':
    return { ...state, name: action.name, gravatarEmail: action.email };
  default:
    return state;
  }
}
