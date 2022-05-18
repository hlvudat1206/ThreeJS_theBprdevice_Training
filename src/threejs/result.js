import React, { Component } from 'react'
import * as THREE from "three";

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
export default class Result extends Component {
    constructor(props) {
        super(props);
        
    }
    componentDidMount(){
        // create scene
      
     
    ///
    }
  render() {
    return (
        <div>
       
      
      <canvas id="bg">
      </canvas>
     
      </div>
    )
  }
}
