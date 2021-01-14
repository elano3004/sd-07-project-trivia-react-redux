import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
// https://github.com/brix/crypto-js
// md5 gera as hash para add no fim do link de acordo com o email do user.

class Header extends Component {
  render() {
    const { email, nome } = this.props;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email)}` }
          className="App-logo"
          data-testid="header-profile-picture"
          alt="logo"
          width="50"
          height="50"
        />
        <p data-testid="header-player">{ nome }</p>
        <p data-testid="header-score">Score: 0</p>
      </header>
    );
  }
}

Header.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  nome: state.player.name,
  email: state.player.email,
});

export default connect(mapStateToProps)(Header);
