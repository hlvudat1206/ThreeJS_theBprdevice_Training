import logo from './logo.svg';
import './App.css';
// import ThreeScene from './threejs/three-scene2'
import ThreeScene from './threejs/three-scene';

import React, { Component }  from 'react';
import Directurl from './router/directurl';
import Objectcustom from './threejs/objectcustom';
import Home from './threejs/home';

// import ThreeScene3 from './threejs/three-scene2'


export default class App extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount(){
    // return(
    // <ThreeScene></ThreeScene>
    // )
  }
  render() {
    
    return (

      <div>
        
        <Directurl/>
        
      </div>
    )
  }
}

