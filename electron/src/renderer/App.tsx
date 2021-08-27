import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import { ChopperProvider } from './components/chopper-context';
import Chopper from './pages/chopper';
import Home from './pages/home';
import Instructions from './pages/instructions';

export default function App() {
  return (
    <ChopperProvider>
      <Router>
        <Switch>
          <Route path="/chopper" component={Chopper} />
          <Route path="/instructions" component={Instructions} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </ChopperProvider>
  );
}
