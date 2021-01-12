import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import apiTriviaToken from '../services/apiTriviaToken';
import { requestSuccess, sendLoginInfo } from '../redux/actions';
import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      // storage: JSON.parse(localStorage.getItem('token')),
    };

    this.isValid = this.isValid.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  isValid() {
    const { name, email } = this.state;
    const emailValid = /\S+@\S+\.\S+/;
    if (name !== '' && emailValid.test(email)) {
      return false;
    }

    return true;
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { name, email } = this.state;
    const { sendLogin, requestToken } = this.props;
    sendLogin({ name, email });
    // fetchToken();
    const tokenObj = await apiTriviaToken();
    const { token } = tokenObj;

    requestToken(token);

    localStorage.setItem('token', token);
  }

  render() {
    const { name, email } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
          <form>
            <input
              type="text"
              name="name"
              value={ name }
              placeholder="Nome"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />

            <input
              type="email"
              name="email"
              value={ email }
              placeholder="E-mail"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />

            <Link to="/game">
              <button
                type="button"
                disabled={ this.isValid() }
                data-testid="btn-play"
                onClick={ this.handleClick }
              >
                Jogar
              </button>
            </Link>

            <Link to="/settings">
              <button
                type="button"
                data-testid="btn-settings"
              >
                Configurações
              </button>
            </Link>
          </form>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendLogin: (info) => dispatch(sendLoginInfo(info)),
  // fetchToken: () => dispatch(fetchApiToken()),
  requestToken: (info) => dispatch(requestSuccess(info)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  sendLogin: PropTypes.func.isRequired,
  requestToken: PropTypes.func.isRequired,
};
