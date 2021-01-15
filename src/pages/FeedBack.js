import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class FeedBack extends Component {
  constructor() {
    super();
    this.handleRedirectHome = this.handleRedirectHome.bind(this);
    this.handleRedirectRanking = this.handleRedirectRanking.bind(this);
  }

  handleRedirectHome() {
    const { history } = this.props;
    history.push('/');
  }

  handleRedirectRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions } = this.props;
    const three = 3;
    console.log('quest', assertions);
    return (
      <div data-testid="feedback-text">
        <Header />
        {assertions < three ? (
          <p ata-testid="feedback-text">Podia ser melhor...</p>
        ) : (
          <p ata-testid="feedback-text">Mandou bem!</p>
        )}
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleRedirectHome }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleRedirectRanking }
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.QuestionRequest.assertions,
});

export default connect(mapStateToProps)(FeedBack);

FeedBack.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  assertions: PropTypes.string.isRequired,
};
