import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router'
import Nav from './components/Nav';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Coaches from './pages/Coaches';
import Members from './pages/Members';
import Events from './pages/Events';
import Trainings from './pages/Trainings';
import AddMember from './pages/AddMember';
import AddCoach from './pages/AddCoach';
import AddEvent from './pages/AddEvent';
import AddTraining from './pages/AddTraining';
import MemberDetails from './pages/MemberDetails';
import CoachDetails from './pages/CoachDetails';
import EventDetails from './pages/EventDetails';
import Error404 from './pages/Error404';

const NavWithRouter = withRouter(Nav);

function App() {
    return (
        <Router>
            <div className="App">
                <NavWithRouter />
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/Dashboard" exact component={Dashboard} />
                    <Route path="/Members" exact component={Members} />
                    <Route path="/Coaches" exact component={Coaches} />
                    <Route path="/Events" exact component={Events} />
                    <Route path="/Trainings" exact component={Trainings} />
                    <Route path="/Members/Add" component={AddMember}/>
                    <Route path="/Coaches/Add" component={AddCoach}/>
                    <Route path="/Events/Add" component={AddEvent}/>
                    <Route path="/Training/Add" component={AddTraining} />
                    <Route path="/Members/Edit/:id" component={AddMember}/>
                    <Route path="/Coaches/Edit/:id" component={AddCoach}/>
                    <Route path="/Events/Edit/:id" component={AddEvent}/>
                    <Route path="/Members/:id" exact component={MemberDetails} />
                    <Route path="/Coaches/:id" exact component={CoachDetails} />
                    <Route path="/Events/:id" exact component={EventDetails} />
                    <Route component={Error404}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
