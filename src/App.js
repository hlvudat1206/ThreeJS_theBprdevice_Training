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
import 'bootstrap/dist/css/bootstrap.min.css';
// import ThreeScene from './threejs/three-scene2'
import ThreeScene from './threejs/three-scene';
import Navigation from './threejs/router/Navigation';
import Objectcustom from './threejs/objectcustom';
import Home from './threejs/home';
import Errorshow from './threejs/Errorshow';
import Result from './threejs/result';

import Document from './threejs/document';

import axios from 'axios';

import Timeandscore from './threejs/timeandscore';
import Login from './threejs/login';

// import { NavLink } from 'react-bootstrap';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1,2,3],
      typepin: '',
      score: 0,
      status: false,
      scoreResult: 0,
      newuser: '',
      eventstateScore: false
    }
    
  }

  getdata = (tp) =>{
    console.log('in getdata 2: '+ tp)
    this.setState({
      typepin: tp
    })
  }
  getscore = (dl) => {
    console.log('in ra getscore: '+ dl)
    this.setState({
      score: dl
    })
  }

  offscore = (offs) =>{
    console.log('in ra status score: '+ offs)
    this.setState({
      status: offs
    })
  }
  scoreresult = (scRe) =>{
    console.log('in ra scoreresult: ', scRe )
    this.setState({
      scoreResult: scRe
    })
  }
  saveuser = (saus) =>{
    console.log('in ra username: '+saus)
    this.setState({
      newuser: saus
    })
  }
  eventScore = (triggerScore) => {
    console.log('in ra triggerScore '+ triggerScore)
    this.setState({
      eventstateScore: triggerScore
    })
  }
  render() {
    console.log('in ra app dl: ',this.state.typepin)
    
    return (
      <Router>
   
      
        {/* pushscore = {this.state.score} */}
        <Navigation />
        <Timeandscore pusheventScore={this.state.eventstateScore} pushnewuser={this.state.newuser}  pushscore = {this.state.score} offscoreTime = {this.state.status} getscoreResult = {(scRe)=>this.scoreresult(scRe)}/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/training" >
            <ThreeScene pushdata = {this.state.typepin} offoffscore ={(offs) => this.offscore(offs)} getscorescore = {(dl) => this.getscore(dl)} />
          </Route>
          <Route path="/document" >
            <Document />
          </Route>
          <Route path="/objectcustom" >
            <Objectcustom  gettriggerScore = {(triggerScore)=>this.eventScore(triggerScore)}getdulieu = {(dl)=>this.getdata(dl) } />
          </Route>
          <Route path="/result" >
            <Result pushnewuser={this.state.newuser} pushscoreresult = {this.state.scoreResult} />
          </Route>
         
          {/* <Route path="/test1" >
            <Test1  />
          </Route>
          <Route path="/test2" >
            <Test2  />
          </Route> */}
          <Route path="/login" >
            <Login  getsaveuser = {(saus)=>this.saveuser(saus)}/>
          </Route>
          <Route path="/:somestring" >
            <Errorshow  />
          </Route>
        </Switch>
        
     

      </Router>
    )
  }
}

