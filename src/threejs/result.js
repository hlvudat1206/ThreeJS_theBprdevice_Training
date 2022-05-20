import React, { Component } from 'react'
import * as THREE from "three";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DragControls } from "./DragControls";
import data from "./data.json";
import MouseMeshInteraction from "./mousemes_interact";
import axios from 'axios';

let scene, camera, mouse, raycaster, board, selectedPiece = null, mixer, light, model, model2, model2x, model5, model5_1,
model2animation, renderer,binormal,normal, angleDeg, group, clipsanimationDevice, clipanimationDevice, returnZ, value2 = null
,arrayObject_orig, arrayObject, arrowforward, arrowBack, key2, typebattery;
var clock2;

const addresult = (score) =>
        (axios.post('/api/users/result',score)
        .then((res)=>
           res.data
          
      ))
export default class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
          score: 0
        }
        
    }
    componentDidMount(){

        
      const scoreResult = document.getElementById('scoreResult');
      scoreResult.innerHTML = `${this.props.pushscoreresult}`;
      console.log('in ra result cuoi cung: ', this.props.pushscoreresult)
      let scoreResult2 = this.props.pushscoreresult;
      console.log('in ra scoreResult2 cuoi cung: ', scoreResult2)
      this.setState({
        score: scoreResult2
      })
      console.log('in ra score cuoi cung: ', this.state)
      let {score} = this.state
      addresult(score).then((res)=>{
        console.log(res);
      })
    ///
    }
  render() {
    return (
      <div>
        <div className='container'>
          <div className='textresult'>
            YOUR RESULT
          </div>
     
        </div>
        <div className='container'>
          <div className = 'col-12' >
            <div className = 'row'>
           
                <div className = 'col-5'> 
                </div>

                <div className = 'col-1'>
                  <h4>SCORE:</h4>
                </div>

                <div className = 'col-6' >
                
                  <h4 id ='scoreResult' ></h4>
                  
                </div>
        
            </div>
          </div>

        </div>

      </div>
    )
  }
}
