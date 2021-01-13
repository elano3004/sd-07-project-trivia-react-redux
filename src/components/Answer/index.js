import React from 'react';
import './style.css';

class Answer extends React.Component {
  render() {
    const {p} = this.props;
    return (
      <section className="answer-section">
        <div className={ `answer-box green ${p}` }>
          <p className="message">Pergunta meus colegas alguma coisarada escriyta! pode ser maior ou menor</p>
        </div>
      </section>
    );
  }
};

export default Answer;
