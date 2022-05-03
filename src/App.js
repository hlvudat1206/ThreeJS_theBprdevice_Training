import logo from './logo.svg';
import './App.css';
// import ThreeScene from './threejs/three-scene2'
import ThreeScene from './threejs/three-scene';

import React, { Component }  from 'react';
import Directurl from './router/directurl';
import Objectcustom from './threejs/objectcustom';





export default class App extends Component {
  constructor(props) {
    super(props);
    
  }
 
  render() {
    return (
      <div>
        <Directurl />
      </div>
    )
  }
}

