import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import requestToken from '../services/api';

class Login extends Component {
  constructor(props) {
    super(props);

    this.verifyLogin = this.verifyLogin.bind(this);
    this.getToken = this.getToken.bind(this);

    this.state = {
      name: '',
      email: '',
    };
  }

  getToken() {
    const tokenTrivia = requestToken();

    console.log(tokenTrivia)
    localStorage.setItem('token', {tokenTrivia} );
  }

  verifyLogin() {
    const { name, email } = this.state;

    if (name && email) {
      return false;
    }
    return true;
  }

  render() {
    const { name, email } = this.state;

    return (
      <div>
        <form>
          <input
            type="text"
            value={ name }
            placeholder="Digite seu nome"
            data-testid="input-player-name"
            onChange={ (e) => this.setState({ name: e.target.value }) }
          />

          <input
            type="email"
            value={ email }
            placeholder="Digite seu email"
            data-testid="input-gravatar-email"
            onChange={ (e) => this.setState({ email: e.target.value }) }
          />

          <Link to="/play">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ this.verifyLogin() }
              onClick={ () => this.getToken() }
            >
              Jogar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default Login;
