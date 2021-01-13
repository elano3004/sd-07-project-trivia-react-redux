import React from 'react';

class Quiz extends React.Component {

  render() {
    const {
      category,
      question,
      correct_Answer,
      incorrect_Answers,
    } = this.props;

    const i = 0;

    return(
      <div>
        <h3 data-testid="question-category"  key={ `category${i}` } >{category}</h3>
        <p data-testid="question-text" key={ `question${i}` }  >{question}</p>
        {/* {incorrect_Answers[0].map((incorrectAnswer, index) => (
          <button type="button" key={incorrectAnswer} data-testid={`wrong-answer-${index}`}>
            {incorrectAnswer}
          </button>
        ))} */}
      </div>
    )
  }
}

export default Quiz;
