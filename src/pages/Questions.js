import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [{
        question: '',
        category: '',
        correct_answer: '',
        incorrect_answers: [] }],
      index: 0,
    };
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions() {
    const { token } = this.props;
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((data) => this.setState({
        questions: data.results,
      }));
  }

  nextQuestion() {
    const { index } = this.state;
    this.setState({
      index: index + 1,
    });
  }

  render() {
    const { questions, index } = this.state;
    return (
      <div>
        <h3>
          Question
        </h3>
        <div id="bloco-pergunta">
          <div id="categoria-pergunta">
            <span
              data-testid="question-category"
            >
              Category:
              {questions[index].category}
            </span>
          </div>
        </div>
        <span data-testid="question-text">
          {questions[index].question}
        </span>
        <div id="bloco-respostas">
          <button
            type="button"
            key="correct"
            data-testid="correct-answer"
          >
            {questions[index].correct_answer}
          </button>
          {questions[index].incorrect_answers
            .map((item, itemIndex) => (
              <button
                type="button"
                key="incorrect"
                data-testid={ `wrong-answer-${itemIndex}` }
              >
                { item }
              </button>))}
        </div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.nextQuestion }
        >
          Next
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token.token,
});

export default connect(mapStateToProps)(Questions);

Questions.propTypes = {
  token: PropTypes.string.isRequired,
};
