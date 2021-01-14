const INITIAL_STATE = {
  user: {
    player: {
      name: '',
      assertions: '',
      score: 0,
      gravatarEmail: '',
    },
    isLoading: false,
    gravatarProfile: {},
  },
  /* ranking: [], */
  triviaToken: {
    token: '',
    isLoading: false,
  },
  triviaQuestions: {
    questions: [],
    isLoading: false,
  },
};

export default INITIAL_STATE;
