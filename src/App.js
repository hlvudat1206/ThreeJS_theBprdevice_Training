import React, { Component }  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
// import ThreeScene from './threejs/three-scene2'
import ThreeScene from './threejs/three-scene';
import Navigation from './threejs/router/Navigation';
import Objectcustom from './threejs/objectcustom';
import Home from './threejs/Home';
import Errorshow from './threejs/Errorshow';

import axios from 'axios';
import Test1 from './threejs/test1';
import Test2 from './threejs/test2';

// import { NavLink } from 'react-bootstrap';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1,2,3],
      typepin: ''
    }
    
  }
  senddata = () =>{
    console.log('in ra senddata')
  }
  getdata = (dl) =>{
    console.log('in getdata 2: '+ dl)
    this.setState({
      typepin: dl
    })
  }
  
  render() {
    
    return (
      
      <Router>
       
        {/* <div className='App'>
          <NavLink exact activeClassName="active" to="/"> Home</NavLink>
          <NavLink activeClassName="active" to="/training"> training</NavLink>
          <NavLink activeClassName="active" to="/objectcustom"> objectcustom</NavLink>
        </div>
        <hr/> */}
       
        <Navigation/>
        
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/training" >
            <ThreeScene pushdata = {(dl) => this.getdata(this.state.typepin)}/>
          </Route>
          <Route path="/objectcustom" >
            <Objectcustom ketnoi = {()=> this.senddata() } getdulieu = {(dl)=>this.getdata(dl) } />
          </Route>
         
          <Route path="/test1" >
            <Test1  />
          </Route>
          <Route path="/test2" >
            <Test2  />
          </Route>
          <Route path="/:somestring" >
            <Errorshow  />
          </Route>
        </Switch>
        
      </Router>
  
    )
  }
}

