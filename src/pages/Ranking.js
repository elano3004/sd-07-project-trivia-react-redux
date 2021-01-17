import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  goHome() {
    const { history } = this.props;
    history.push('./');
  }

  render() {
    return (
      <div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ (event) => this.goHome(event) }
        >
          Voltar
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
