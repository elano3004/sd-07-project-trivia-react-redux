import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuestions } from '../../redux/actions/gameActions';

class GameScreen extends Component {
  constructor(props) {
    super(props);
    const limit = 4;
    this.state = {
      correct: Math.floor(Math.random() * limit),
      actual: 0,
    };

    this.questFrame = this.questFrame.bind(this);
  }

  componentDidMount() {
    const { playerToken, getQuest } = this.props;
    getQuest(playerToken);
  }

  questFrame() {
    const { questions } = this.props;
    const { actual, correct } = this.state;
    let counter = 0;

    const arrayDefault = [1, 2, 3, 4];

    if (questions.length > 0) {
      return questions[actual].type === 'boolean' ? (
        <div>
          <button
            type="button"
            datatestid={
              questions[actual].correct_answer === 'True'
                ? 'correct-answer'
                : 'wrong-answer-0'
            }
          >
            Verdadeiro
          </button>
          <button
            type="button"
            datatestid={
              questions[actual].correct_answer === 'True'
                ? 'correct-answer'
                : 'wrong-answer-0'
            }
          >
            False
          </button>
        </div>
      ) : (
        <div>
          {arrayDefault.map((elem, index) => {
            if (index === correct) {
              return (
                <button
                  key={ questions[actual].correct_answer }
                  type="button"
                  data-testid="correct-answer"
                >
                  {questions[actual].correct_answer}
                </button>
              );
            }
            counter += 1;
            return (
              <button
                key={ questions[actual].incorrect_answers[counter - 1] }
                type="button"
                data-testid={ `wrong-answer-${counter - 1}` }
              >
                {questions[actual].incorrect_answers[counter - 1]}
              </button>
            );
          })}
        </div>
      );
    }

    return <p>Loading...</p>;
  }

  render() {
    const { questions } = this.props;
    const { actual } = this.state;

    return (
      <>
        <p data-testid="question-category">Categoria</p>
        <p data-testid="question-text">Pergunta</p>
        {this.questFrame()}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  playerToken: state.user.token,
  questions: state.session.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuest: (token) => dispatch(getQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
