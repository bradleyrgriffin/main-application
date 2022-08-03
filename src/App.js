import React from 'react'
import './App.scss';
import { LandingPage } from './containers/LandingPage';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Weather from './containers/Weather';

const App = (props) => (
  <div className="wrapper">
    <h1>Bradley Griffin</h1>
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Landing Page</Link></li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/" >
          <LandingPage />
        </Route>
        <Route exact path="/weather">
          <Weather {...props}/>
        </Route>
      </Switch>
    </BrowserRouter>
    
  </div>
);
export default App;
