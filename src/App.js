import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/login';
import Play from './pages/play';
import Settings from './pages/settings';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/play" component={ Play } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}
