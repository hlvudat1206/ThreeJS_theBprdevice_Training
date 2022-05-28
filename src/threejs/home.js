import React, { Component } from 'react'
import * as THREE from "three";
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DragControls } from "./DragControls";
import data from "./data.json";
import MouseMeshInteraction from "./mousemes_interact";
import axios from 'axios';
import Toprank from './toprank';

let scene, camera, mouse, raycaster, board, selectedPiece = null, mixer, light, model, model2, model2x, model5, model5_1,
cube2;
var clock2;
let savedata
     
const gettopscoreData = () => 
      axios.get('/api/users/gettopscore')
            .then( (response) => (
              response.data
    
              
            )
            )
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          gettopscore: null
        }
    }
    componentDidMount(){

      if (this.state.gettopscore === null){
        gettopscoreData().then((response) => {
          this.setState({
            gettopscore: response
          });
          
        })
  
        
        
      }
      
      // savedata = this.state.gettopscore.data
      // console.log('in ra savedata2222: ',this.state.gettopscore.data)
      
      
    }

    pushDatatoToprank = () =>{
      if (this.state.gettopscore !== null ){
         
        return  this.state.gettopscore.map((value,key)=> {
            return (
              <Toprank 
              key2 = {key + 1}
              image = {value.imagelink}
                name = {value.user}
                score = {value.score}
                
              ></Toprank>
            )
          
          }
            
          )
        
      }
    }
  render() {
    console.log('in ra datacomponentwill: ', this.state.gettopscore)
    return (
      <div >
        <div >
          <div className = 'textscore'>
            <div className='container'>
              <div className ='row'>
                <div className='col-12'>
                     TOP SCORE
                    
                </div>
            </div>
             </div>
        </div>

        <div >
            <div className='container'>
              <div className= 'row mt-5'>
                <div className='col-12'>
                
                <div className="d-flex">
                     {this.pushDatatoToprank()}
                </div>
                </div>
            </div>
             </div>
             <div className='container'>
            
            <div className='col-12'>
              <div className="textscore">
              Why do you need to use the blood pressure monitor everytime?

              </div>
            <div className="textscore">
            <video width={1080} height={720} controls>
              <source src="../BprVideo.mp4" type="video/mp4" />
            </video>
            </div>
            <div className="textscore">
              <h3>
               SV: Huỳnh Lê Vũ Đạt <hr/>
               GVHD: Trần Trung Tín <hr/>
               Trường ĐH Bách Khoa TPHCM <hr/>
               </h3>
            </div>
     
        </div>
         </div>
         </div>
        
     
        </div>
       </div>
    )
  }
}