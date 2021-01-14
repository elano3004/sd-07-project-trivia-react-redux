import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Trivia from '../components';
import { fetchTokenTrivia } from '../actions/fetchTokenTrivia';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.goToSettings = this.goToSettings.bind(this);
    this.state = {
      emailInput: '',
      nameInput: '',
      disabled: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.enableButton());
  }

  enableButton() {
    const { emailInput, nameInput } = this.state;
    if (nameInput && emailInput) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  handleClick() {
    const { token, history } = this.props;
    token();
    history.push('./game');
  }

  goToSettings() {
    const { history } = this.props;
    history.push('./settings');
  }

  render() {
    const { emailInput, nameInput, disabled } = this.state;

    return (
      <div>
        <input
          id="nameInput"
          name="nameInput"
          type="text"
          value={ nameInput }
          data-testid="input-player-name"
          onChange={ (event) => this.handleChange(event) }
        />
        <input
          id="emailInput"
          name="emailInput"
          type="email"
          value={ emailInput }
          data-testid="input-gravatar-email"
          onChange={ (event) => this.handleChange(event) }
        />
        <button
          type="button"
          disabled={ disabled }
          data-testid="btn-play"
          onClick={ (event) => this.handleClick(event) }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ (event) => this.goToSettings(event) }
        >
          Configurações
        </button>
        <Trivia />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  token: (key) => dispatch(fetchTokenTrivia(key)),
});

Login.propTypes = {
  token: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
