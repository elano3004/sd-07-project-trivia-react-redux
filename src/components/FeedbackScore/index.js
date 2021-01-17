import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './FeedbackScore.css';

class FeedBackScore extends Component {
  render() {
    const { assertionsProps, scoreProps } = this.props;
    const threeAssertions = 3;
    return (
      <div className="feedback-display">
        <Link
          className="ranking-button"
          data-testid="btn-ranking"
          to="/ranking"
        >
          Ver Ranking
        </Link>
        <h1
          className={ assertionsProps >= threeAssertions
            ? 'good'
            : 'bad' }
          data-testid="feedback-text"
        >
          { assertionsProps >= threeAssertions
            ? 'Mandou bem!'
            : 'Podia ser melhor...'}
        </h1>
        <div className="score-and-assertions">
          <p className="score-and-assertions-indication">Pontuação: </p>
          <p data-testid="feedback-total-score">
            {scoreProps}
          </p>
        </div>
        <div className="score-and-assertions">
          <p className="score-and-assertions-indication"> Acertos: </p>
          <p data-testid="feedback-total-question">
            {assertionsProps}
          </p>
        </div>
        <Link
          className="jogar-novamente-button"
          data-testid="btn-play-again"
          to="/"
        >
          Jogar Novamente
        </Link>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  scoreProps: state.player.score,
  assertionsProps: state.player.assertions,
});

FeedBackScore.propTypes = {
  assertionsProps: PropTypes.number.isRequired,
  scoreProps: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedBackScore);
