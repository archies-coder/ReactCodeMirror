import React, { Component } from 'react';
 import 'bootstrap/dist/css/bootstrap.min.css'
 import { Switch , Route } from 'react-router-dom';
import AppNav from './components/AppNav'
import XML from './components/XML'
import JS from './components/JS'
import Home from './components/Home'


export default class App extends Component {

  render() {  
    
    return (
      <React.Fragment>
        <AppNav />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/xml" component={XML}/>
          <Route path="/js" component={JS}/>
        </Switch>
      </React.Fragment>
    );
  }
}

