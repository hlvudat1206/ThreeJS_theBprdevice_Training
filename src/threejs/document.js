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
export default class Document extends Component {
    constructor(props) {
        super(props);
        
    }
    componentDidMount(){
        // create scene
      
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x87CEFA
        );

        // create camera


      camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100);
      // camera = new THREE.PerspectiveCamera( 185, window.innerWidth / window.innerHeight, 0.1, 1000 );
      camera.position.set(0, 0, 0);//wide position
      // camera.position.set(10, 0, 0);
      camera.lookAt(0,1.5,0);
    
   
        // create rendering

      const renderer = new THREE.WebGL1Renderer({
        canvas: document.querySelector("#bg"),
      });
      renderer.toneMapping = THREE.ReinhardToneMapping; //use toneMapping
      renderer.toneMappingExposure = 2.3;
      renderer.shadowMap.enabled = true;

      // renderer.setPixelRatio(window.devicePixelRatio);
      // renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio( window.devicePixelRatio*0.7 );
      // renderer.setSize( 800, 400 ); // some width and height values
      renderer.setSize(window.innerWidth, window.innerHeight);
      // camera.aspect = window.innerWidth / window.innerHeight

      
      camera.position.set(10, 2, 0);
      renderer.render(scene, camera);

      window.addEventListener( 'resize', resize);
      
      update();
      // create light
      const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820,4); // anh sang truc tiep tu canh, su dung 2 mau nau pale orange for sky and gray for ground 
      hemiLight.position.set(0, 20, 0);
      scene.add(hemiLight);

      light = new THREE.SpotLight(0xffa95c,4); //The sun
      light.position.set(-50,50,50);
      light.castShadow = true;
      scene.add( light ); 

      light.shadow.bias = -0.0001;
      light.shadow.mapSize.width = 1024*4;
      light.shadow.mapSize.height = 1024*4;
    
      const mmi = new MouseMeshInteraction(scene, camera);
      raycaster = new THREE.Raycaster();
      mouse = new THREE.Vector2();

      const geometry2 = new THREE.BoxGeometry();
      const material2 = new THREE.MeshBasicMaterial( { color: 0xffbe00 } );
      const cube2 = new THREE.Mesh( geometry2, material2 );
      cube2.position.set(0,0,-10);
      cube2.name='cube2';
      scene.add( cube2 );
      mmi.addHandler('cube2', 'click', (object) => {
        console.log('da click cubeeee');
        
     
      });

    
      //controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enable = false;
      
      controls.zoomSpeed = 1.0;
      controls.enableRotate = true ;


      const clock = new THREE.Clock();

      function resetMaterials() {
        for (let i = 0; i < scene.children.length; i++) {
            if (scene.children[i].material) {
            scene.children[i].material.opacity = scene.children[i].userData.currentSquare == selectedPiece ? 1.0 : 0.1;
            }
        }
      }
      function hoverPieces() {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        for (let i = 0; i < intersects.length; i++) {
          intersects[i].object.material.transparent = true;
          intersects[i].object.material.opacity = 0.5;
        }
      }

      function update(){
        // requestAnimationFrame( update );
        // updateCamera();
        // renderer.render( scene, camera );  
      }
      
      
      function resize(){
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }
       function animate() {
        // requestAnimationFrame(animate);
        if (mixer)
              mixer.update(clock.getDelta());
          light.position.set( 
          camera.position.x + 10,
          camera.position.y + 10,
          camera.position.z + 10,
          
        );
    
        if (model ){ //check xem model co ton tai
          model.rotation.y += 0;
        
        }
        if (model2){
          model2.rotation.y -= 0.0;
        }
        if (cube2){
          cube2.rotation.y += 0.05;
        }
     
        // dragObject();
        // controls.autoRotate = true;
        // controls.autoRotateSpeed = 5.0;

   
        hoverPieces();
        // moveobject();
        resetMaterials();
        controls.update();
    }

    let onClick = (event) => {
        console.log('da click 1234567');
        //0.8, 0.05, 0.75
        

      }
    renderer.setAnimationLoop(animate);
    function render() {
            requestAnimationFrame(render);
                // update the mmi
                mmi.update();
    

                renderer.render(scene, camera);



        }
        render();
    window.addEventListener('click', onClick);
    window.addEventListener( 'resize', resize, false);
    
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
