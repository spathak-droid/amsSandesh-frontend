import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/authentication/Login';
import DisplayDevice from './components/device/DisplayDevice';
import AddDevice from './components/device/AddDevice';
import Checkin from './components/check/Checkin';
import History from './components/history/History';
import React from 'react';
import { Redirection } from './components/authentication/Redirection';

function App() {
  return <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Redirection exact path="/device/all" component={DisplayDevice}/>
          <Redirection exact path="/checkin/:deviceid" component={Checkin} />
          <Redirection exact path="/device/create" component={AddDevice}/>
          <Redirection exact path="/history" component={History}/>
          
        </Switch>
      </BrowserRouter>
    </div>
}

export default App;
