import logo from './logo.svg';
import './App.css';
// import ThreeScene from './threejs/three-scene2'
import ThreeScene from './threejs/three-scene';
import Home from './threejs/home';
import Objectcustom from './threejs/objectcustom';


import React, { Component }  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1,2,3]
    }
    
  }
  senddata = () =>{
    console.log('in ra senddata')
  }
 
  render() {
    
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/training">
            <ThreeScene />
          </Route>
          <Route path="/objectcustom">
            <Objectcustom ketnoi = {()=> this.senddata()}/>
          </Route>
        </Switch>
   
      </Router>
    )
  }
}

