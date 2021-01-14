import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userActions, fetchApi } from '../../actions';
import { LoginForm, ConfigButton } from './components';

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      name: '',
      email: '',
      auth: false,
    };
  }

  componentDidUpdate() {
    const { updateEmail, updateName } = this.props;
    const { name, email } = this.state;
    updateEmail(email);
    updateName(name);
  }

  handleChange({ target }) {
    const { email, name } = this.state;
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    this.setState({ [target.id]: target.value });

    if (regex.test(email) && name) {
      this.setState({ auth: true });
    } else {
      this.setState({ auth: false });
    }
  }

  async handleClick() {
    const { callApi } = this.props;
    const { name, email } = this.state;
    const endpoint = await fetch('https://opentdb.com/api_token.php?command=request');
    const objct = await endpoint.json();

    const playerObject = {
      player: {
        name,
        gravatarEmail: email,
        assertions: 0,
        score: 0,
      },
    };

    localStorage.setItem('token', objct.token);
    localStorage.setItem('state', JSON.stringify(playerObject));
    callApi();
  }

  render() {
    const { name, email, auth } = this.state;

    return (
      <div>
        <LoginForm
          handleChange={ this.handleChange }
          handleClick={ this.handleClick }
          name={ name }
          email={ email }
          auth={ auth }
        />
        <ConfigButton />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  callApi: () => dispatch(fetchApi()),
  updateEmail: (email) => dispatch(userActions.updateEmail(email)),
  updateName: (name) => dispatch(userActions.updateName(name)),
});

export default connect(null, mapDispatchToProps)(Home);

Home.propTypes = {
  updateEmail: PropTypes.func.isRequired,
  updateName: PropTypes.func.isRequired,
  callApi: PropTypes.func.isRequired,
};
