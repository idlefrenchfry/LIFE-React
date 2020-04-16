import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Dashboard from './pages/Dashboard';
import Coaches from './pages/Coaches';
import Members from './pages/Members';
import Events from './pages/Events';
import Trainings from './pages/Trainings';
import AddMember from './pages/AddMember';
import AddCoach from './pages/AddCoach';
import AddEvent from './pages/AddEvent';
import AddTraining from './pages/AddTraining';
import Error404 from './pages/Error404';

function App() {
  return (
      <Router>
          <div className="App">
              <Nav />
              <Switch>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/Members" exact component={Members} />
                  <Route path="/Coaches" exact component={Coaches} />
                  <Route path="/Events" exact component={Events} />
                  <Route path="/Trainings" exact component={Trainings} />
                  <Route path="/Members/Add" component={AddMember}/>
                  <Route path="/Coaches/Add" component={AddCoach}/>
                  <Route path="/Events/Add" component={AddEvent}/>
                  <Route path="/Training/Add" component={AddTraining}/>
                  <Route component={Error404}/>
              </Switch>
          </div>
      </Router>
  );
}

export default App;
