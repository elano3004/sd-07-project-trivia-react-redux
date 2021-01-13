import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';

const Game = () => {
  const [counter, setCounter] = useState(0);
  const [color, setColor] = useState({
    style1: '',
    style2: '',
  });
  const [assertions, setAssertion] = useState('');
  const tempMax = 5;
  const [time, setTime] = useState(tempMax);

  const handleQuestion = () => {
    const maxQuestions = 4;
    if (counter === maxQuestions) {
      setCounter(counter - maxQuestions);
    } else {
      setCounter(counter + 1);
    }
    setColor({
      style1: 'border-neutral',
      style2: 'border-neutral',
    });

    setTime(tempMax);
  };

  let intervalId;
  const handleClickAnswer = ({ target }) => {
    setColor({
      style1: 'border-correct',
      style2: 'border-incorrect',
    });

    if (target.value === 'correct') {
      setAssertion(true);
    } else {
      setAssertion(false);
    }
    clearInterval(intervalId);
  };

  useEffect(() => {
    if (!time) return;

    const maxTime = 1000;
    intervalId = setInterval(() => {
      setTime(time - 1);
    }, maxTime);

    if (time === 0) {
      setAssertion(false);
      // return clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [time]);

  const dataGame = useSelector((state) => state.game);
  const { results } = dataGame.data;

  return (
    <div>
      <Header />
      <div>
        <h3 data-testid="question-category">{results[counter].category}</h3>
      </div>
      <div>
        <p data-testid="question-text">{results[counter].question}</p>
      </div>
      <div>
        <button
          value="correct"
          type="button"
          data-testid="correct-answer"
          className={ color.style1 }
          onClick={ handleClickAnswer }
        >
          {results[counter].correct_answer}
        </button>
      </div>
      <div>
        {results[counter].incorrect_answers.map((answer, index) => (
          <button
            value="incorrect"
            key={ answer }
            type="button"
            data-testid={ `wrong-answer-${index}` }
            className={ color.style2 }
            onClick={ handleClickAnswer }
          >
            {answer}
          </button>
        ))}
      </div>
      <div>
        <button type="button" data-testid="btn-next" onClick={ handleQuestion }>
          Próxima
        </button>
      </div>
      <div>{time}</div>
      <p>{assertions}</p>
    </div>
  );
};

export default Game;
