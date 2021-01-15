import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Quiz.css';
import Timer from './Timer';
import { scoreUpdate } from '../redux/actions';

class Quiz extends Component {
  constructor() {
    super();

    this.state = {
      answered: false,
      colorCorrect: '',
      colorIncorrect: '',
      resetTimer: false,
    };

    this.answerColor = this.answerColor.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.restoreTimer = this.restoreTimer.bind(this);
    this.scoreCalculator = this.scoreCalculator.bind(this);
  }

  handleClick() {
    this.setState({
      answered: true,
    });
  }

  answerColor() {
    // const { results } = this.props;
    // const { correct_answer: correctAnswer } = results;

    // if (target.innerText !== correctAnswer) {
    // }

    this.setState({
      colorIncorrect: 'answer-wrong',
      colorCorrect: 'answer-correct',
      resetTimer: true,
    });

    this.handleClick();
  }

  nextButton() {
    this.setState({
      answered: false,
      colorCorrect: '',
      colorIncorrect: '',
      resetTimer: true,
    });

    const { name, assertions, score, gravatarEmail } = this.props;
    const playerObj = { player: { name, assertions, score, gravatarEmail } };

    localStorage.setItem('state', JSON.stringify(playerObj));
  }

  restoreTimer() {
    this.setState({
      resetTimer: false,
    });
  }

  scoreCalculator() {
    const { difficulty, timer } = this.props;
    const TEN = 10;
    const easy = 1;
    const medium = 2;
    const hard = 3;

    switch (difficulty) {
    case 'easy':
      return (
        TEN + (timer * easy)
      );
    case 'medium':
      return (
        TEN + (timer * medium)
      );
    default:
      return (
        TEN + (timer * hard)
      );
    }
  }

  render() {
    const { answered, colorCorrect, colorIncorrect, resetTimer } = this.state;
    const { results, nextQuestion, updateScore } = this.props;
    const { correct_answer: correctAnswer } = results;
    const { incorrect_answers: incorrectAnswers } = results;
    const { question, category, difficulty } = results;
    const allQuestions = [correctAnswer, ...incorrectAnswers];
    const magicNumber = 0.5;
    const allIndex = allQuestions
      .map((anyQuestion) => allQuestions
        .indexOf(anyQuestion))
      .sort(() => Math.random() - magicNumber);
    const shuffledArray = allIndex.map((shuffledNumber) => allQuestions[shuffledNumber]);
    const renderQuestions = (questionToRender, number) => {
      if (questionToRender === correctAnswer) {
        return (
          <button
            className={ colorCorrect }
            key={ number }
            data-testid="correct-answer"
            type="button"
            onClick={ () => {
              this.answerColor();
              updateScore(this.scoreCalculator());
            } }
            disabled={ answered }
          >
            { correctAnswer }
          </button>);
      }
      return (
        <button
          className={ colorIncorrect }
          key={ number }
          data-testid={ `wrong-answer-${number}` }
          type="button"
          onClick={ this.answerColor }
          disabled={ answered }
        >
          { questionToRender }
        </button>);
    };
    return (
      <div>
        <div>
          <p data-testid="question-text">{ question }</p>
          <p>{ difficulty }</p>
          <p data-testid="question-category">{ category }</p>
          {shuffledArray.map((oneQuestion, index) => renderQuestions(oneQuestion, index))}
          <button
            type="button"
            onClick={ () => { this.nextButton(); nextQuestion(); } }
            hidden={ !answered }
            data-testid="btn-next"
          >
            Próxima
          </button>
        </div>
        <Timer
          answerColor={ this.answerColor }
          nextButton={ this.nextButton }
          resetTimer={ resetTimer }
          restoreTimer={ this.restoreTimer }
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  game: {
    timer,
  },
  player: {
    name,
    assertions,
    score,
    gravatarEmail,
  },
}) => ({
  timer,
  name,
  assertions,
  score,
  gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: (info) => dispatch(scoreUpdate(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

Quiz.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  nextQuestion: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
};
