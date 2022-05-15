import * as THREE from "three";
import React, { Component } from 'react';

import MouseMeshInteraction from "./mousemes_interact";
// import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DragControls } from "./DragControls";
import Stats from 'three/examples/jsm/libs/stats.module'
import axios from 'axios';
import { Link } from "react-router-dom";



let scene, camera, mouse, stats, raycaster, board, selectedPiece = null, mixer, light, model, model2,model3, 
model2animation, angleDeg, map2, returnI
, returnI3, returnI5;
var clock2;
let arrowHelper;

//get data from server
// axios.get('http://localhost:5001/api/users/2')
//       .then(function (response) {
//         // handle success
//         console.log(response);
//       })
//       .catch(function (error) {
//         // handle error
//         console.log(error);
//       })
const getuserData = () => 
   axios.get('http://localhost:5001/api/users/2')
                .then((res) => 
                   res.data
                )

export default class ThreeScene extends Component {
    constructor(props) {
      super(props);
      // this.loader2 = this.loader2.bind(this);
      this.state = {
        movecuff: false,
        pullcuff: false,
        clickhandforcuff: false,
        clickwire: false,
        onoff: 0,
        clickbpr_to_wireconnect: false,
        animationCuff: false,
        data: null
      }
     
    }
   
    
    
    componentDidMount(){
      if (this.state.data === null){
        getuserData().then((res) => {
          this.setState({
            data: res
          });
          console.log('in ra data node 2: ',this.state.data)
        })
        
      }
     
        // create scene
      
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x4caca5
        );

        // create camera
      

      camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
      // camera = new THREE.PerspectiveCamera( 185, window.innerWidth / window.innerHeight, 0.1, 1000 );
      camera.position.set(0, 0, 0);//wide position
      // camera.position.set(10, 0, 0);
      camera.lookAt(0,1.5,0);
      stats = new Stats();
      document.body.appendChild( stats.dom );
      
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
      clock2 = new THREE.Clock();
      const mmi = new MouseMeshInteraction(scene, camera);

      //create sin spline
      // const curve = new CustomSinCurve(2);
      // const geometry = new THREE.TubeBufferGeometry( curve, 100, 1, 1, true );
      // const material = new THREE.MeshBasicMaterial({ wireframe:true, color: 0x00000, 
      //   // side: THREE.DoubleSide 
      // });
      // const tube = new THREE.Mesh( geometry, material );
      // tube.position.set(4,4,4);
      // scene.add(tube);
      console.log('in ra dl: ',this.props.pushdata());
     
      
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
      const cube = new THREE.Mesh( geometry, material );
      cube.name='cube';
      cube.position.set(0,5,12)
      scene.add( cube );

      mmi.addHandler('cube', 'click', (object) => {
        console.log('da click cubeeee');
        window.location = '/'
     
     
      });
      
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


      

      console.log('in ra dl: ',this.props.pushdata());
			//////////////
			const gray_color = new THREE.Color(0x57554f);
			const yellow_color = new THREE.Color(0xe0c53a);
    

      // initialize instance of class MouseMeshInteraction, passing threejs scene and camera
			
			// add a handler on mouse click for mesh with the name 'bulb'

      mouse = new THREE.Vector2();
     
      raycaster = new THREE.Raycaster();
      const _mixers = [];
      // import glb file
      const loader4 = new GLTFLoader();
      //labcustom.glb
      loader4.load("./room103.glb", function (gltf) {
        console.log('in ra:', gltf);
        console.log('in ra children22: ',gltf.scene.children[0]);
        const model6 = gltf.scene.children[0];
        // model.traverse(n => { if ( n.isMesh ) {
        //   n.castShadow = true; 
        //   n.receiveShadow = true;
        //   if(n.material.map) n.material.map.anisotropy = 16; 
        // }});

        gltf.scene.position.set(-7,-14,-3);
        gltf.scene.scale.set(15.8, 15.8, 15.8);
        gltf.scene.rotation.z = -0.1;
        scene.add( gltf.scene );

      })

      const loader2 = new GLTFLoader();
      // file perbaodo8 is belong to baodo6.glb
      loader2.load("./perbaodo8.glb",  (gltf) => {
        console.log('print perbaodo:', gltf);
        // model = gltf.scene.children[2];
        model2 = gltf.scene;
        model2animation = gltf.animations;
        gltf.scene.position.set(1.5,-1,2);
        gltf.scene.scale.set(5.9, 5.9, 5.9);
       
        // gltf.scene.rotation.y = 0.0;
        // console.log('print scale:', gltf.scene.scale);


        scene.add( model2 );

        
        const dcontrols2 = new DragControls( [gltf.scene.children[0]], camera, renderer.domElement );
        document.body.appendChild( renderer.domElement );
        dcontrols2.addEventListener( 'dragstart', ( event ) => {
      
            console.log('in x: ',mouse.x);
            console.log('in y: ',mouse.y);
          } );
  
        dcontrols2.addEventListener( 'dragend', ( event ) => {
        // event.object.material.emissive.set( 0x000000 );
          console.log('in x2: ',mouse.x);
          console.log('in y2: ',mouse.y);
          // if (mouse.x < -0.1 &&  mouse.y > 0.05) {
            
          //   gltf.scene.position.set(-1,-2,8);
          //   // gltf.scene.rotation.y = 0.5;
          //   gltf.scene.scale.set(2.8,2.8,2.8);
          //   console.log('da move bao do');
          // } else {
    
          //   console.log('da fail bao do');
          // }
          
          

        });
        mmi.addHandler('Plane001', 'click', (object) => {
          console.log('daydo mesh is being clicked!');
          object.material.color.r = 0;
          object.material.color.g = 10;
          object.material.color.b = 0;
          this.setState({
            movecuff: true
          })
          
          //     scene.scale.set(2.5, 2.5, 2.5);
          // gltf.scene.scale.set(4.0, 4.0, 4.0);
          // gltf.scene.position.set(0,0,0); //y z x

          // for (let i=0; i<gltf.scene.children.length; i++){
          //   gltf.scene.children[i].rotation.z=150;
  
          // }
          
          // gltf.scene.rotation.z=30;

        
        })
        mmi.addHandler('Plane001', 'mouseenter', (object) =>{
          console.log('the cuff has been moved');
          // gltf.scene.parent.background.set(1,0,1)
          // object.material.color.set( 0x57554f);
          object.material.color.r = 0.6;
          object.material.color.g = 0.2;
          object.material.color.b = 0.2;
          // gltf.scene.children.material.opacity = 0.5;
          
        });
        mmi.addHandler('Plane001', 'mouseleave', (object) => {
          console.log('the cuff hasnt been moved');
          object.material.color.r = 0.801;
          object.material.color.g = 0.664;
          object.material.color.b = 0.234;
          
          // gltf.scene.children.material.opacity = 0.5;
          
        });
        mmi.addHandler('BezierCurve', 'click', (object) => {
          console.log('thang ngu nay');
          console.log('mouselog: ', Math.abs(mouse.x)*20 );
          object.material.color.r = 0;
          object.material.color.g = 10;
          object.material.color.b = 0;
          this.setState({
            clickwire: true
          })
       

        
        })
        mmi.addHandler('BezierCurve', 'mouseenter', (object) =>{
          console.log('the cuff has been moved');
          // gltf.scene.parent.background.set(1,0,1)
          // object.material.color.set( 0x57554f);
          object.material.color.r = 0.6;
          object.material.color.g = 0.2;
          object.material.color.b = 0.2;
          // gltf.scene.children.material.opacity = 0.5;
          
        });
        mmi.addHandler('BezierCurve', 'mouseleave', (object) => {
          console.log('the cuff hasnt been moved');
          object.material.color.r = 0.801;
          object.material.color.g = 0.664;
          object.material.color.b = 0.234;
          
          // gltf.scene.children.material.opacity = 0.5;
          
        });
        

      })
      
      // let mixer;
      // const loader3 = new GLTFLoader();
      // loader3.load("./boyring6.glb", function (gltf) {
      //   console.log('in ra boyboy: ',gltf);
      //   console.log('in boy x: ',mouse.x);
      //   console.log('in boy y: ',mouse.y);
      //   model2 = gltf.scene;
      //   // model2.traverse(n => { if ( n.isMesh ) {
      //   //   n.castShadow = true; 
      //   //   n.receiveShadow = true;
      //   //   if(n.material.map) n.material.map.anisotropy = 16; 
      //   // }});

      //   // gltf.scene.position.set(4,-2,3);
      //   gltf.scene.position.set(3,-12,6);
      //   gltf.scene.rotation.y = 90;
      //   gltf.scene.scale.set(10.5,10.5,10.5);

      //   scene.add( model2 );

      //   // Create an AnimationMixer, and get the list of AnimationClip instances
      //   mixer = new THREE.AnimationMixer( model2 );
      //   const clips = gltf.animations;


      //   // Play a specific animation
      //   const clip = THREE.AnimationClip.findByName( clips, 'RigAction' );
      //   const action = mixer.clipAction(clip);
      //   // action.play();
      
      //   // Play all animations
      //   // clips.forEach( function ( clip ) {
      //   // mixer.clipAction( clip ).play();
      //   // } );
      // },undefined,function(error){
      //   console.error(error);
      // }
      // );
      const loader6 = new GLTFLoader();
      loader6.load("./wirecuff_no18.glb",  (gltf) => {
        console.log('in wirecuff: ',gltf);
        model3 = gltf.scene;
        
        // gltf.scene.position.set(-1,-2,8);
        // gltf.scene.position.set(10,0,5);
        gltf.scene.position.set(0,-2,-1);

        gltf.scene.rotation.y = 1.4;
        // gltf.scene.children[0].position.set(4,-5,2);
        gltf.scene.scale.set(4.8,4.8,4.8);
       
      });

    
      const loader5 = new GLTFLoader();
      loader5.load("./perhand.glb",  (gltf) => {
        console.log('in ra canh tay: ',gltf);
        const model5 = gltf.scene;
        
        gltf.scene.position.set(-1,-1,8);
        // gltf.scene.rotation.y = 0.5;
        // gltf.scene.children[0].position.set(4,-5,2);
        gltf.scene.scale.set(20.8,20.8,20.8);
        gltf.scene.rotation.y = 1.8;
        // gltf.scene.children[0].rotation.y = 1.78; 
  // 

        scene.add( model5 );
        // Create an AnimationMixer, and get the list of AnimationClip instances
        mixer = new THREE.AnimationMixer( model5 );
        const clips = gltf.animations;
        

        // Play a specific animation
        const clip = THREE.AnimationClip.findByName( clips,'ArmatureAction.002' );
        // clip
        const action = mixer.clipAction(clip);
        action.clampWhenFinished = true; //Capture the last status of animation
        action.loop = THREE.LoopOnce; //go back the initial status
        action.time = 2; // fhz ??
        // action.weight = 0.5; //weight object
        // action.zeroSlopeAtStart = true;
        // action.zeroSlopeAtEnd = true;
        action.play();
        // clips.forEach( function ( clip ) {
        //   mixer.clipAction( clip ).play();
        // } );
        
    
        mmi.addHandler('Body001', 'click', (object) => {
          console.log('Body001 is clicked!');
          // model2.children[2].position.set(0,-5,12);
          model2.children[2].position.set(0.8,0.05,0.75);
          // model2.children[2].rotation.x = -1;
          // model2.children[2].rotation.z = -0.5;



          // model2.children[2].scale.set(5,5,5);
          // scene.add(model2);

          console.log('in mode2 thay doi: ', model2);

          this.setState({
            // movecuff: !this.state.movecuff
            clickhandforcuff: true
          })

          if (this.state.clickhandforcuff === true) {
            model2.position.set(0,-3,12);
            model2.rotation.x = 1.5;
           
            mixer = new THREE.AnimationMixer( model2 );
            const clips = model2animation;
    
            // // Play a specific animation
            const clip = THREE.AnimationClip.findByName( clips, 'ArmatureAction');
            
            // clip
            const action = mixer.clipAction(clip);
            action.clampWhenFinished = true; //Capture the last status of animation
            action.loop = THREE.LoopOnce; //go back the initial status
            action.time = 1; // fhz ??
            action.weight = 1; //weight object
            action.zeroSlopeAtStart = true;
            action.zeroSlopeAtEnd = true;
            action.play();
            
            this.setState({
             pullcuff: true,
             movecuff: false
            })

          }
          object.material.color.r = 0;
          object.material.color.g = 10;
          object.material.color.b = 0;
         

      
        });
        mmi.addHandler('Body001', 'mouseenter',  (object) => {
          console.log('the hand has been moved');
          // gltf.scene.parent.background.set(1,0,1)
          // object.material.color.set( 0x57554f);
        
          // if (this.state.movehand === true){
          //   console.log('da group vao')
          //   model2.rotation.x = 1.78;
          //   model2.position.set(-1,-2,12);
          // } else {
          //   console.log('chua co group')
          // }

          object.material.color.r = 0.6;
          object.material.color.g = 0.2;
          object.material.color.b = 0.2;
      
          
        });
        mmi.addHandler('Body001', 'mouseleave', (object) => {
          console.log('the hand hasnt been moved');
          object.material.color.r = 0.801;
          object.material.color.g = 0.664;
          object.material.color.b = 0.234;
          
          // gltf.scene.children.material.opacity = 0.5;
          
        });
        
      });
     
      const loader = new GLTFLoader();
      
      loader.load("./huyetap34.glb",  (gltf) => {
        console.log('in ra huyetap: ',gltf);
        model = gltf.scene;

        // model.traverse(n => { if ( n.isMesh ) {
        //   n.castShadow = true; 
        //   n.receiveShadow = true;
        //   if(n.material.map) n.material.map.anisotropy = 16; 
        // }});
        gltf.scene.position.set(-4,1,-7);

        // gltf.scene.position.set(8,0,1);
        gltf.scene.scale.set(1.4, 1.4, 1.5);
        gltf.scene.rotation.z = -0.7;
        gltf.scene.rotation.x = 0;
        // gltf.scene.rotation.y = -0.05;

        scene.add( model );
        
        console.log('in ra huyetapnew: ',gltf);

        const root = model.children[0].children[1];
        // root.children[0].visible = true;
        const screen = root.children[0];
        // const imageArray = ['test1.jpg','test2.jpg','error.jpg'];
      
        
        const imageArray = ['Artboard 0.png','Artboard 1.png','Artboard 2.png','Artboard 3.png','Artboard 4.png'
        ,'Artboard 5.png','Artboard 6.png','Artboard 7.png','Artboard 8.png','Artboard 9.png','Artboard 10.png'
        // ,'Artboard 11.png','Artboard 12.png','Artboard 13.png','Artboard 14.png','Artboard 15.png','Artboard 16.png'
        ,'Artboard 17.png','Artboard 18.png','Artboard 19.png','Artboard 20.png','Artboard 21.png','Artboard 22.png'
        // ,'Artboard 23.png','Artboard 24.png','Artboard 25.png','Artboard 26.png','Artboard 27.png','Artboard 28.png'
        ,'Artboard 29.png','Artboard 30.png','Artboard 31.png','Artboard 32.png','Artboard 33.png','Artboard 34.png'
        // ,'Artboard 35.png','Artboard 36.png','Artboard 37.png','Artboard 38.png','Artboard 39.png','Artboard 40.png'
        ,'Artboard 41.png','Artboard 42.png','Artboard 43.png','Artboard 44.png','Artboard 45.png','Artboard 46.png'
        // ,'Artboard 47.png','Artboard 48.png','Artboard 49.png','Artboard 50.png','Artboard 51.png','Artboard 52.png'
        // ,'Artboard 53.png','Artboard 54.png','Artboard 55.png','Artboard 56.png','Artboard 57.png','Artboard 58.png'
        // ,'Artboard 59.png','Artboard 60.png','Artboard 61.png','Artboard 62.png','Artboard 63.png','Artboard 64.png'
        // ,'Artboard 65.png','Artboard 66.png','Artboard 67.png','Artboard 68.png','Artboard 69.png','Artboard 70.png'
        ,'Artboard 71.png','Artboard 72.png','Artboard 73.png','Artboard 74.png','Artboard 75.png','Artboard 76.png'
        // ,'Artboard 77.png','Artboard 78.png','Artboard 79.png','Artboard 80.png','Artboard 81.png','Artboard 82.png'
        ,'Artboard 83.png','Artboard 84.png','Artboard 85.png','Artboard 86.png','Artboard 87.png','Artboard 88.png'
        // ,'Artboard 89.png','Artboard 90.png','Artboard 91.png','Artboard 92.png','Artboard 93.png','Artboard 94.png'
        ,'Artboard 95.png','Artboard 96.png','Artboard 97.png','Artboard 98.png','Artboard 99.png','Artboard 100.png'
        // ,'Artboard 101.png','Artboard 102.png','Artboard 103.png','Artboard 104.png','Artboard 105.png','Artboard 106.png'
        ,'Artboard 107.png','Artboard 108.png','Artboard 109.png','Artboard 110.png','Artboard 111.png','Artboard 112.png'
        // ,'Artboard 113.png','Artboard 114.png','Artboard 115.png','Artboard 116.png','Artboard 117.png','Artboard 118.png'
        // ,'Artboard 119.png','Artboard 120.png','Artboard 121.png','Artboard 122.png','Artboard 123.png','Artboard 124.png'
        // // ,'Artboard 125.png','Artboard 126.png','Artboard 127.png','Artboard 128.png','Artboard 129.png','Artboard 130.png'
        // ,'Artboard 131.png','Artboard 132.png','Artboard 133.png','Artboard 134.png','Artboard 135.png','Artboard 136.png'
        // ,'Artboard 137.png','Artboard 138.png','Artboard 139.png','Artboard 140.png','Artboard 141.png','Artboard 142.png'
        ,'Artboard 143.png','Artboard 144.png','Artboard 145.png','Artboard 146.png','Artboard 147.png','Artboard 148.png'
        // ,'Artboard 149.png','Artboard 150.png','Artboard 151.png','Artboard 152.png','Artboard 153.png','Artboard 154.png'
        ,'Artboard 155.png','Artboard 156.png','Artboard 157.png','Artboard 158.png','Artboard 159.png','Artboard 160.png'
        // ,'Artboard 161.png','Artboard 162.png','Artboard 163.png','Artboard 164.png','Artboard 165.png','Artboard 166.png'
        // ,'Artboard 167.png','Artboard 168.png','Artboard 169.png','Artboard 170.png','Artboard 171.png','Artboard 172.png'
        ,'Artboard 173.png','Artboard 174.png','Artboard 175.png','Artboard 173.png','Artboard 174.png','Artboard 172.png','Artboard 172.png'];
        
        const imageArrayR = [
        'Artboard final.png','Artboard final.png'
        ,'Artboard 71.png','Artboard 72.png','Artboard 73.png','Artboard 74.png','Artboard 75.png','Artboard 76.png'
        // ,'Artboard 77.png','Artboard 78.png','Artboard 79.png','Artboard 80.png','Artboard 81.png','Artboard 82.png'
        ,'Artboard 83.png','Artboard 84.png','Artboard 85.png','Artboard 86.png','Artboard 87.png','Artboard 88.png'
        // ,'Artboard 89.png','Artboard 90.png','Artboard 91.png','Artboard 92.png','Artboard 93.png','Artboard 94.png'
        ,'Artboard 95.png','Artboard 96.png','Artboard 97.png','Artboard 98.png','Artboard 99.png','Artboard 100.png'
        // ,'Artboard 101.png','Artboard 102.png','Artboard 103.png','Artboard 104.png','Artboard 105.png','Artboard 106.png'
        ,'Artboard 107.png','Artboard 108.png','Artboard 109.png','Artboard 110.png','Artboard 111.png','Artboard 112.png'
        // ,'Artboard 113.png','Artboard 114.png','Artboard 115.png','Artboard 116.png','Artboard 117.png','Artboard 118.png'
        ,'Artboard 119.png','Artboard 120.png','Artboard 121.png','Artboard 122.png','Artboard 123.png','Artboard 124.png'
        // ,'Artboard 125.png','Artboard 126.png','Artboard 127.png','Artboard 128.png','Artboard 129.png','Artboard 130.png'
        ,'Artboard 131.png','Artboard 132.png','Artboard 133.png','Artboard 134.png','Artboard 135.png','Artboard 136.png'
        // ,'Artboard 137.png','Artboard 138.png','Artboard 139.png','Artboard 140.png','Artboard 141.png','Artboard 142.png'
        ,'Artboard 143.png','Artboard 144.png','Artboard 145.png','Artboard 146.png','Artboard 147.png','Artboard 148.png'
        // ,'Artboard 149.png','Artboard 150.png','Artboard 151.png','Artboard 152.png','Artboard 153.png','Artboard 154.png'
        ,'Artboard 155.png','Artboard 156.png','Artboard 157.png','Artboard 158.png','Artboard 159.png','Artboard 160.png'
        // ,'Artboard 161.png','Artboard 162.png','Artboard 163.png','Artboard 164.png','Artboard 165.png','Artboard 166.png'
        ,'Artboard 167.png','Artboard 168.png','Artboard 169.png','Artboard 170.png','Artboard 171.png','Artboard 172.png'
        ,'Artboard 173.png'];
        
        const imageArray2 = ['Artboard 0.png','Artboard 1.png','Artboard 2.png','Artboard 3.png','Artboard 4.png'
        ,'Artboard 5.png','Artboard 6.png','Artboard 7.png','Artboard 8.png','Artboard 9.png','Artboard 10.png'
        // ,'Artboard 11.png','Artboard 12.png','Artboard 13.png','Artboard 14.png','Artboard 15.png','Artboard 16.png'
        ,'Artboard 17.png','Artboard 18.png','Artboard 19.png','Artboard 20.png','Artboard 21.png','Artboard 22.png'
        // ,'Artboard 23.png','Artboard 24.png','Artboard 25.png','Artboard 26.png','Artboard 27.png','Artboard 28.png'
        ,'Artboard 29.png','Artboard 30.png','Artboard 31.png','Artboard 32.png','Artboard 33.png','Artboard 34.png'
        // ,'Artboard 35.png','Artboard 36.png','Artboard 37.png','Artboard 38.png','Artboard 39.png','Artboard 40.png'
        ,'Artboard 41.png','Artboard 42.png','Artboard 43.png','Artboard 44.png','Artboard 45.png','Artboard 46.png'
        // ,'Artboard 47.png','Artboard 48.png','Artboard 49.png','Artboard 50.png','Artboard 51.png','Artboard 52.png'
        // ,'Artboard 53.png','Artboard 54.png','Artboard 55.png','Artboard 56.png','Artboard 57.png','Artboard 58.png'
        // ,'Artboard 59.png','Artboard 60.png','Artboard 61.png','Artboard 62.png','Artboard 63.png','Artboard 64.png'
        // ,'Artboard 65.png','Artboard 66.png','Artboard 67.png','Artboard 68.png','Artboard 69.png','Artboard 70.png'
        ,'Artboard 71.png','Artboard 72.png','Artboard 73.png','Artboard 74.png','Artboard 75.png','Artboard 76.png'
        // ,'Artboard 77.png','Artboard 78.png','Artboard 79.png','Artboard 80.png','Artboard 81.png','Artboard 82.png'
        ,'Artboard 83.png','Artboard 84.png','Artboard 85.png','Artboard 86.png','Artboard 87.png','Artboard 88.png'
        // ,'Artboard 89.png','Artboard 90.png','Artboard 91.png','Artboard 92.png','Artboard 93.png','Artboard 94.png'
        ,'Artboard 95.png','Artboard 96.png','Artboard 97.png','Artboard 98.png','Artboard 99.png','Artboard 100.png'
        // ,'Artboard 101.png','Artboard 102.png','Artboard 103.png','Artboard 104.png','Artboard 105.png','Artboard 106.png'
        ,'Artboard 107.png','Artboard 108.png','Artboard 109.png','Artboard 110.png','Artboard 111.png','Artboard 112.png'
        // ,'Artboard 113.png','Artboard 114.png','Artboard 115.png','Artboard 116.png','Artboard 117.png','Artboard 118.png'
        
        ];

        const imageArray2R = [
        'Artboard final 2.png','Artboard final 2.png',
        ,'Artboard 41.png','Artboard 42.png','Artboard 43.png','Artboard 44.png','Artboard 45.png','Artboard 46.png'
        // ,'Artboard 47.png','Artboard 48.png','Artboard 49.png','Artboard 50.png','Artboard 51.png','Artboard 52.png'
        // ,'Artboard 53.png','Artboard 54.png','Artboard 55.png','Artboard 56.png','Artboard 57.png','Artboard 58.png'
        // ,'Artboard 59.png','Artboard 60.png','Artboard 61.png','Artboard 62.png','Artboard 63.png','Artboard 64.png'
        // ,'Artboard 65.png','Artboard 66.png','Artboard 67.png','Artboard 68.png','Artboard 69.png','Artboard 70.png'
        ,'Artboard 71.png','Artboard 72.png','Artboard 73.png','Artboard 74.png','Artboard 75.png','Artboard 76.png'
        // ,'Artboard 77.png','Artboard 78.png','Artboard 79.png','Artboard 80.png','Artboard 81.png','Artboard 82.png'
        ,'Artboard 83.png','Artboard 84.png','Artboard 85.png','Artboard 86.png','Artboard 87.png','Artboard 88.png'
        // ,'Artboard 89.png','Artboard 90.png','Artboard 91.png','Artboard 92.png','Artboard 93.png','Artboard 94.png'
        ,'Artboard 95.png','Artboard 96.png','Artboard 97.png','Artboard 98.png','Artboard 99.png','Artboard 100.png'
        // ,'Artboard 101.png','Artboard 102.png','Artboard 103.png','Artboard 104.png','Artboard 105.png','Artboard 106.png'
        ,'Artboard 107.png','Artboard 108.png','Artboard 109.png','Artboard 110.png','Artboard 111.png','Artboard 112.png'
        ];

        const imageArray3 = [
        'Artboard 71.png','Artboard 72.png','Artboard 73.png','Artboard 74.png','Artboard 75.png','Artboard 76.png'
        // ,'Artboard 77.png','Artboard 78.png','Artboard 79.png','Artboard 80.png','Artboard 81.png','Artboard 82.png'
        ,'Artboard 83.png','Artboard 84.png','Artboard 85.png','Artboard 86.png','Artboard 87.png','Artboard 88.png'
        // ,'Artboard 89.png','Artboard 90.png','Artboard 91.png','Artboard 92.png','Artboard 93.png','Artboard 94.png'
        ,'Artboard 95.png','Artboard 96.png','Artboard 97.png','Artboard 98.png','Artboard 99.png','Artboard 100.png'
        ,'Artboard 1E.png'  
        ];
        const imageArray3_2 = [
          'Artboard 1E.png',
          'Artboard 71.png','Artboard 72.png','Artboard 73.png','Artboard 74.png','Artboard 75.png','Artboard 76.png'
          // ,'Artboard 77.png','Artboard 78.png','Artboard 79.png','Artboard 80.png','Artboard 81.png','Artboard 82.png'
          ,'Artboard 83.png','Artboard 84.png','Artboard 85.png','Artboard 86.png','Artboard 87.png','Artboard 88.png'
          // ,'Artboard 89.png','Artboard 90.png','Artboard 91.png','Artboard 92.png','Artboard 93.png','Artboard 94.png'
          ,'Artboard 95.png','Artboard 96.png','Artboard 97.png','Artboard 98.png','Artboard 99.png','Artboard 100.png'
            
          ];
        // const map = new THREE.TextureLoader();
        
        const imageArrayRR = imageArrayR.reverse()
        scene.add(model);

        const imageArray2RR = imageArray2R.reverse()
        scene.add(model);

        const imageArray3RR = imageArray3_2.reverse()
        scene.add(model);
        update();

        
        // [gltf.scene.children[0]]
        const dcontrols = new DragControls([gltf.scene.children[0]] , camera, renderer.domElement );

          

        // const dcontrols = new DragControls( [gltf.scene.children[1]], camera, renderer.domElement );

        document.body.appendChild( renderer.domElement );

        dcontrols.addEventListener( 'dragstart', ( event ) => {

        } );

        dcontrols.addEventListener( 'dragend',  ( event ) => {
        // event.object.material.emissive.set( 0x000000 );
          console.log('in x2: ',mouse.x);
          console.log('in y2: ',mouse.y);
        
          if (mouse.x < -0.01 &&  mouse.y > 0.1) {
            
            // gltf.scene.position.set(0,4,5);
            console.log('da move');
          } else {
            return console.log('da fail');
            // gltf.scene.position.set(0,2,-4);
            
          }

        });
        
        
      // initialize instance of class MouseMeshInteraction, passing threejs scene and camera
        
        mmi.addHandler('Vert001', 'click', (object) => {
          console.log('in clickbpr_to_wireconnect:', this.state.clickbpr_to_wireconnect)
          console.log('in clickhandforcuff: ', this.state.clickhandforcuff)
       
        if (this.state.clickbpr_to_wireconnect === true && this.state.clickhandforcuff === true){
          
          // console.log('print arrayArrow[arrayArrow.length -1]: ',arrayArrow[arrayArrow.length -1])
          const z = imageArray.length -1
            const sleep = ms => {
              return new Promise(resolve => setTimeout(resolve, ms))
            }

            const getNumArray = index => {
              return sleep(300).then(v => index)
            }
            const getNumArray2 = index => {
              return sleep(400).then(v => index)
            }

          if (arrayArrow[arrayArrow.length -1] < 60){          
            const endscreen = async _ => {
              console.log('Start')
              if (returnI === imageArray.length -1){
              for (let i = 0; i<imageArrayRR.length; i++) {
                  const returnI2 = await getNumArray2(i)
                  console.log(returnI2)

                  const map = new THREE.TextureLoader()
                  // rotate( Math.PI / 2 );
                    .load(imageArrayRR[returnI2])
                    map.minFilter = THREE.LinearFilter;

                    // map.repeat.set(0.5,0.5); //scale image len
                    // map.rotation = Math.PI / 2;
                    map.center.set(0.5, 0.5);
                    map.rotation = THREE.Math.degToRad(90);
                    screen.traverse(child =>  {
                      
                      if(child.isMesh) {
                        // child.receiveShadow = true;
                        // child.material.map = mapx;   
                        child.material.map = map;
                        // child.visible = false;
                        // child.castShadow = true; 
                    }
                    // scene.add(model)
                  });
            
                console.log('End')
                  }
            }
          }
            const startscreen = async _ => {
              console.log('Start')
            
              for (let i =0; i<imageArray.length; i++) {
                
                returnI = await getNumArray(i)
                console.log('in returnI: ',returnI)
               
                map2 = new THREE.TextureLoader()
                  .load(imageArray[returnI])
                  map2.minFilter = THREE.LinearFilter;
                  // map.repeat.set(0.5,0.5); //scale image len
                  // map.rotation = Math.PI / 2;
                  map2.center.set(0.5, 0.5);
                  map2.rotation = THREE.Math.degToRad(90);
                  screen.traverse(child =>  { 
                    if(child.isMesh) {
                      // child.receiveShadow = true;  
                      // child.material.map = mapx;
 
                      child.material.map = map2;
                      // child.visible = false;
                      // child.castShadow = true;
                      

                  }
         
                });
                endscreen();

              }
              
              console.log('End')
            }
            startscreen();

            
          
            
            
            
              
          } else if (arrayArrow[arrayArrow.length -1] >= 60 && arrayArrow[arrayArrow.length -1] < 120){
            console.log('may chua on chut nao')
            

            const endscreen = async _ => {
              console.log('Start')
              if (returnI3 === imageArray2.length -1){
              for (let i = 0; i<imageArray2RR.length; i++) {
                  const returnI2 = await getNumArray2(i)
                  console.log(returnI2)
                 
                  const map = new THREE.TextureLoader()
                  // rotate( Math.PI / 2 );
                    .load(imageArray2RR[returnI2])
                    map.minFilter = THREE.LinearFilter;

                    // map.repeat.set(0.5,0.5); //scale image len
                    // map.rotation = Math.PI / 2;
                    map.center.set(0.5, 0.5);
                    map.rotation = THREE.Math.degToRad(90);
                    screen.traverse(child =>  {
                      
                      if(child.isMesh) {
                        // child.receiveShadow = true;   
                        child.material.map = map;
                        // child.visible = false;
                        // child.castShadow = true;    
                    }
                    // scene.add(model)
                  });
            
                console.log('End')
                  }
            }
          }
            const startscreen = async _ => {
              console.log('Start')
            
              for (let i =0; i<imageArray2.length; i++) {
                
                returnI3 = await getNumArray(i)
                console.log('in returnI: ',returnI3)
                map2 = new THREE.TextureLoader()
                  .load(imageArray2[returnI3])
                  map2.minFilter = THREE.LinearFilter;
                  // map.repeat.set(0.5,0.5); //scale image len
                  // map.rotation = Math.PI / 2;
                  map2.center.set(0.5, 0.5);
                  map2.rotation = THREE.Math.degToRad(90);
                  screen.traverse(child =>  { 
                    if(child.isMesh) {
                      // child.receiveShadow = true;   
                      child.material.map = map2;
                      // child.visible = false;
                      // child.castShadow = true;
                  }
         
                });
                endscreen();

              }
              
              console.log('End')
            }
            startscreen();

               
          } else {
            

            const startscreen = async _ => {
              console.log('Start')
            
              for (let i =0; i<imageArray3.length; i++) {
                
                returnI5 = await getNumArray(i)
                console.log('in returnI: ',returnI5)
                map2 = new THREE.TextureLoader()
                  .load(imageArray3[returnI5])
                  map2.minFilter = THREE.LinearFilter;
                  // map.repeat.set(0.5,0.5); //scale image len
                  // map.rotation = Math.PI / 2;
                  map2.center.set(0.5, 0.5);
                  map2.rotation = THREE.Math.degToRad(90);
                  screen.traverse(child =>  { 
                    if(child.isMesh) {
                      // child.receiveShadow = true;   
                      child.material.map = map2;
                      // child.visible = false;
                      // child.castShadow = true;
                  }
         
                });

              }
              
              console.log('End')
            }
            startscreen();

                
           
          }
         
          
        }
   
        console.log('bdpressure mesh is being clicked!');
         
          // Create an AnimationMixer, and get the list of AnimationClip instances
        mixer = new THREE.AnimationMixer( model );
        const clips = gltf.animations;
        

        // // Play a specific animation
        const clip = THREE.AnimationClip.findByName( clips,'ArmatureAction.002' );
        // clip
        const action = mixer.clipAction(clip);
        // action.clampWhenFinished = true; //Capture the status of aniamtion
        action.loop = THREE.LoopOnce; //go back the initial status
        action.time = 2; // fhz ??
        action.weight = 0.5; //weight object
        action.zeroSlopeAtStart = true;
        action.zeroSlopeAtEnd = true;
        action.play();
        
        
        // Play all animations
        // clips.forEach( function ( clip ) {
        // mixer.clipAction( clip ).play();
        // } );
        
        })
        
          

        
  
      //   });
        // just to test if the new features are conflicting with previously supported events
			//		(everything seems to be OK)
        mmi.addHandler('Vert001', 'dblclick', (object) => {
          
          console.log('bdpressure is double clicked!');
          // gltf.scene.parent.background.set(0xffaa00);
          // gltf.scene.children[6].parent.parent.background.set(0xffaa00);
          object.material.color.b = 0.5;
          object.material.color.r = 0.5;
          object.material.emissive.b = 0.5;
          object.material.emissive.r = 0.5;
          object.material.emissive.g = 0.8;


          console.log('in color ', object.material.color)
          console.log('in color ', object.material.emissive)


        });
        mmi.addHandler('Vert001', 'contextmenu', (object) => {
          this.setState({
            clickbpr_to_wireconnect: true,
            clickwire: false
          })
          console.log('onoff: ',this.state.onoff)
          model2.children[2].visible = false;


          console.log('bdpressure is pressed with the right button!');
          // gltf.scene.parent.background.set(0xff0a0a);
          // gltf.scene.children[6].parent.parent.background.set(0xff0a0a);
          object.material.opacity = 0.8;



        });
        mmi.addHandler('Vert001', 'mouseenter', (object) => {
          console.log('in ra khi move');
          // gltf.scene.parent.background.set(1,0,1)
          // object.material.color.set( 0x57554f);
          object.material.color.r = 0.6;
          object.material.color.g = 0.2;
          object.material.color.b = 0.2;
          // gltf.scene.children.material.opacity = 0.5;
          
        });
        mmi.addHandler('Vert001', 'mouseleave', (object) => {
          console.log('in ra khi da move');
          object.material.color.r = 0.801;
          object.material.color.g = 0.664;
          object.material.color.b = 0.234;
          
          // gltf.scene.children.material.opacity = 0.5;
          
        });
        mmi.addHandler('Vert001', 'mousedown', (object) => {
          console.log('in ra khi da movedown');
        
          
          // gltf.scene.children.material.opacity = 0.5;
          
        });
        mmi.addHandler('Vert001', 'mouseup', (object) => {
          console.log('in ra khi da mouseup');
        
          
          // gltf.scene.children.material.opacity = 0.5;
          
        });
			
        
      });
    
		
      
    const controls = new OrbitControls(camera, renderer.domElement);
      controls.enable = false;
      // controls.target = loader2.posittion;
      // controls.enableDamping = true; //tao ra quan tinh
      
      
      // controls.enableDamping = true;
      // controls.dampingFactor = 0.001;
      // controls.zoomSpeed = 1.0;
      controls.enableRotate = true;
   
    // controls.update();

    function positionForSquare(square) {
        const found = board.children.find((child) => child.userData.squareNumber == square);
        if (found)
          return found.position;
        return null;
      }

    const clock = new THREE.Clock();
    
      // animate();

    
    

    
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
      
      
      // function updateCamera(){
      //   const time = clock2.getElapsedTime();
      //   const looptime = 20;
      //   const t = ( time % looptime ) / looptime;
      //   const t2 = ( (time + 0.1) % looptime) / looptime
        
      //   const pos = tube.geometry.parameters.path.getPointAt( t );
      //   const pos2 = tube.geometry.parameters.path.getPointAt( t2 );
        
      //   camera.position.copy(pos);
      //   camera.lookAt(pos2);
      // }
      
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
        if (cube){
          cube.rotation.y += 0.05;
        }
        // dragObject();
        // controls.autoRotate = false;
        // controls.autoRotateSpeed = 0.0;
        hoverPieces();
        // moveobject();
        resetMaterials();
        // controls.update();
        // onMouseMove();
        stats.update();
        renderer.render(scene, camera);
  
      }
      


      renderer.setAnimationLoop(animate);
      function render() {
  			requestAnimationFrame(render);
				// update the mmi
				mmi.update();
     

				renderer.render(scene, camera);

  

          }

        // window.requestAnimationFrame(render)

			// raycaster for my background
            let arrayArrow = []
            let arrayMouseX = []
            let arrayMouseY = []

           let onPointerMove = ( event ) => {

            // calculate pointer position in normalized device coordinates
            // (-1 to +1) for both components
          
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

            // arrow to guide connecting to the blood pressure monitor
            if (this.state.clickwire === true && this.state.clickhandforcuff === true) {

              const dir = new THREE.Vector3( 0,0, -1 );           
              dir.normalize();
              const origin = new THREE.Vector3( 0, 0, 3 );
              const length = 5;
              
              if (this.state.onoff === 0){
                const hex = 0xffff00;
                arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
                console.log('onoff: ', this.state.onoff)
                scene.add(arrowHelper);
                this.setState({
                  onoff: 1
                });
              
              } else {
                const hex = 0xe83b1e;
                arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
                console.log('onoff: ', this.state.onoff)
                scene.add(arrowHelper);
                this.setState({
                  onoff: 0
                });
              }
          };
            if (this.state.clickbpr_to_wireconnect === true) {
              scene.add(model3)
            }
            
            if (this.state.pullcuff === true){
              console.log('in ra animationCuff: ',this.state.animationCuff)

              //create circle 1
              const geometry = new THREE.CircleGeometry( 5, 32, Math.PI, Math.PI/3 );
              const material = new THREE.MeshBasicMaterial( { color: 0xe83b1e } );
              const circle = new THREE.Mesh( geometry, material );
              circle.position.set(0,0.5,14);
              circle.rotation.y = (Math.PI)*2;
              circle.rotation.x = (Math.PI);
              scene.add( circle );

              //create circle 2
              const geometry2 = new THREE.CircleGeometry( 5, 32, -Math.PI/3, Math.PI/3 ); // circle from -pi to pi (left to right), -pi/3 is start, pi/3 is length
              const material2 = new THREE.MeshBasicMaterial( { color: 0x00FF00 } );
              const circle2 = new THREE.Mesh( geometry2, material2 );
              circle2.position.set(0,0.5,14);
              circle2.rotation.y = (Math.PI)*2;
              circle2.rotation.x = (Math.PI);

              scene.add( circle2 );

              //create circle 3
              const geometry3 = new THREE.CircleGeometry( 5, 32, -Math.PI*2/3, Math.PI/3 );
              const material3 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
              const circle3 = new THREE.Mesh( geometry3, material3 );
              circle3.position.set(0,0.5,14);
              circle3.rotation.y = (Math.PI)*2;
              circle3.rotation.x = (Math.PI);
        
              scene.add( circle3 );
              
              //create vector 2
              const dir2 = new THREE.Vector3 (1, 0, 0 );
              dir2.normalize();
              const hex = 0x191970;
              const arrowHelper2 = new THREE.ArrowHelper( dir2, origin, length, hex  );
              scene.add(arrowHelper2);
              //create vector 1
              
  
              const origin = new THREE.Vector3( 0,0.5,14 );
          
              const length = 5;
              const headLengthzero = 1;
              const headWidthzero = 1;
              const p1 = {x: 1 ,y:0};
              const p2 = {x: (mouse.x)*20, y: Math.abs((mouse.y))*20};
              //compare angle between vector 2 and vector 1 to fill color 
              // angle in degrees
              angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
            
              console.log('in cos: ', angleDeg);
              
              if (angleDeg > 120){
                
                  const dir = new THREE.Vector3( (mouse.x)*20,Math.abs((mouse.y))*20, 0 );

                  dir.normalize();
                  const hex = 0xFF0000;
                  arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex, headLengthzero, headWidthzero  );
                  scene.add(arrowHelper);
                  arrayArrow.push(angleDeg);
                  // arrayMouseX.push((mouse.x)*20);
                  // arrayMouseY.push((mouse.y)*20);
                
                

              } else if (angleDeg <= 120 && angleDeg > 60){
             
                  const dir = new THREE.Vector3( (mouse.x)*20,Math.abs((mouse.y))*20, 0 );

                  dir.normalize();
                  const hex = 0xFFFF00;
                  arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex, headLengthzero, headWidthzero );
                  scene.add(arrowHelper);
                  arrayArrow.push(angleDeg);
                  // arrayMouseX.push((mouse.x)*20);
                  // arrayMouseY.push((mouse.y)*20);
                

              } else {
                  const dir = new THREE.Vector3( (mouse.x)*20,Math.abs((mouse.y))*20, 0 );

                  dir.normalize();
                  const hex = 0x006400;
                  arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex, headLengthzero, headWidthzero );
                  scene.add(arrowHelper);
                  arrayArrow.push(angleDeg);
                  // arrayMouseX.push((mouse.x)*20);
                  // arrayMouseY.push((mouse.y)*20);
              }
              
     
            }
            

           if (this.state.movecuff === true){
             console.log('Da vao movecuff true true true');
             model2.position.set(0.5,15*mouse.y,-mouse.x*15);
            //  scene.add(model2)
          
           } 
            
           
           
          }
        let onClick = (event) => {
          console.log('da click 1234567');
          //0.8, 0.05, 0.75
          

          this.setState({
            pullcuff: false,
            
          })
        }

			render();
        
      window.addEventListener( 'mousemove', onPointerMove, false );
      // window.addEventListener( 'resize', resize, false );
      window.addEventListener( 'resize', resize, false);
      window.addEventListener('click', onClick);
      // window.addEventListener( 'mousemove', moveobject );

      
    }
    
   
    render() {
      console.log('in ra data node: ', this.state.data);

      return (
          <div>
            {/* <Link to="/objectcustom">
        <div class = "buttonlink">
        <button type="button" class="btn btn-success">Success</button>

        </div>
        </Link> */}
          <canvas id="bg">
         
          </canvas>

          
          </div>
      )
    }
  
}
  
    