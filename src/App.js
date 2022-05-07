import logo from './logo.svg';
import './App.css';
// import ThreeScene from './threejs/three-scene2'
import ThreeScene from './threejs/three-scene';

import React, { Component }  from 'react';
import Directurl from './router/directurl';
import Objectcustom from './threejs/objectcustom';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1,2,3]
    }
    
  }
  // senddata = () =>{
  //   return <ThreeScene ketnoi = {()=> this.state.data}/>
  // }
 
  render() {
    axios.get('http://localhost:5001/api/users/2')
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    return (
      <div>
        <Directurl />
       
      </div>
    )
  }
}

