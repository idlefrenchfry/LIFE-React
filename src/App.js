import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Dashboard from './pages/Dashboard';
import Coaches from './pages/Coaches';
import Members from './pages/Members';
import Events from './pages/Events';
import Trainings from './pages/Trainings';

function App() {
  return (
      <Router>
          <div className="App">
              <Nav />
              <Switch>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/Members" component={Members} />
                  <Route path="/Coaches" component={Coaches} />
                  <Route path="/Events" component={Events} />
                  <Route path="/Trainings" component={Trainings} />
              </Switch>
          </div>
      </Router>
  );
}

export default App;
