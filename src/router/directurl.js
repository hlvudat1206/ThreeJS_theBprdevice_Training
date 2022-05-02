import React, { Component } from 'react'
import Objectcustom from '../threejs/objectcustom';
import ThreeScene from '../threejs/three-scene';
import Home from '../threejs/home';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default class Directurl extends Component {
    constructor(props) {
        super(props);
        
    }
    
  render() {
    return (
      <Router>
            <div>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/training">
            <ThreeScene />
          </Route>
          <Route path="/objectcustom">
            <Objectcustom />
          </Route>

          </div>
      </Router>
    )
  }
}
