import React, { Component } from 'react';
import Answer from './Answer';
import Question from './Question';

export default class GridQuestions extends Component {
  render() {
    return (
      <div>
        <Question />
        <Answer />
      </div>
    );
  }
}
