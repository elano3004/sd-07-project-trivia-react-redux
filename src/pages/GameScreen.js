import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CustomHeader, CustomGame } from '../components';
import { getStorage } from '../services/localStorage';
import { fetchTrivia } from '../actions';

class GameScreen extends Component {
  constructor() {
    super();
    this.state = {
      // magicButton: false,
    };
    this.submitAnswer = this.submitAnswer.bind(this);
    // this.changeIndex = this.changeIndex.bind(this);
  }

  componentDidMount() {
    const { dispatchTrivia } = this.props;
    dispatchTrivia(getStorage('token'));
  }

  submitAnswer() {
    const correctAnswer = document.querySelector('.correct');
    correctAnswer.style = 'border: 3px solid rgb(6, 240, 15)';
    const incorrectAnswer = document.querySelectorAll('.incorrect');
    for (let index = 0; index < incorrectAnswer.length; index += 1) {
      incorrectAnswer[index].style = 'border: 3px solid red';
    }
    // this.setState({ magicButton: true });
  }

  render() {
    const { name, email, trivia, loading } = this.props;
    return (
      <div>
        <CustomHeader name={ name } email={ email } />
        { loading && (
          <p>...Loading</p>
        ) }
        { trivia.length > 0
          && <CustomGame challenge={ trivia } correct={ this.submitAnswer } />}
      </div>
    );
  }
}
const mapStateToProps = ({
  loginReducer: { name, email },
  triviaReducer: { trivia, loading },
  tokenReducer: { loadingToken },
}) => ({
  name,
  email,
  trivia,
  loading,
  loadingToken,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchTrivia: (a) => dispatch(fetchTrivia(a)),
});

GameScreen.propTypes = {
  dispatchTrivia: PropTypes.func.isRequired,
  trivia: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
