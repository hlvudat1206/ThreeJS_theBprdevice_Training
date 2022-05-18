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
import Result from './threejs/result';

import Document from './threejs/document';

import axios from 'axios';
import Test1 from './threejs/test1';
import Test2 from './threejs/test2';
import Timeandscore from './threejs/timeandscore';

// import { NavLink } from 'react-bootstrap';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1,2,3],
      typepin: '',
      score: 0
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
  getscore = (dl) => {
    console.log('in ra getscore: '+ dl)
    this.setState({
      score: dl
    })
  }

  offscore = (dl) =>{
    console.log('in ra status score: ', dl)
  }
 
  render() {
    console.log('in ra app dl: ',this.state.typepin)
    
    return (
      
      <Router>
        {/* pushscore = {this.state.score} */}
        <Navigation/>
        <Timeandscore pushscore = {this.state.score}/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/training" >
            <ThreeScene pushdata = {this.state.typepin} offoffscore ={(dl) => this.offscore(dl)} getscorescore = {(dl) => this.getscore(dl)} />
          </Route>
          <Route path="/document" >
            <Document />
          </Route>
          <Route path="/objectcustom" >
            <Objectcustom ketnoi = {()=> this.senddata() } getdulieu = {(dl)=>this.getdata(dl) } />
          </Route>
          <Route path="/result" >
            <Result />
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

