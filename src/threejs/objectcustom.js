import * as THREE from "three";



import React, { Component } from 'react';
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

axios.get('/api/users/2')
      .then(function (response) {
        // handle success
        console.log(response);
      })
     

const addbattery = (typebattery) =>
  (axios.post('/api/users/typebattery',{typebattery})
  .then((res)=>
    
     res.data
    
))
  

export default class Objectcustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
    
          typebattery: 'saovayta',
          
          turnonScore: true
        }
        
    }
    
    componentDidMount(){
      //send data through props
      this.props.gettriggerScore(this.state.turnonScore)

      
         // create scene
      
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x87CEFA
        );

        // create camera


      camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100);
      // camera = new THREE.PerspectiveCamera( 185, window.innerWidth / window.innerHeight, 0.1, 1000 );
      // camera.position.set(0, 0, 0);//wide position
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
      // document.body.style.backgroundColor = "blue"
      // document.body.innerHTML = "Some new HTML content";
      
      camera.position.set(15, 2, 0);
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
    
   

    
    ///
    
      const mmi = new MouseMeshInteraction(scene, camera);
      raycaster = new THREE.Raycaster();
      mouse = new THREE.Vector2();

      const batteryChange = () =>{
      //   // const name = 'battery_name';
      //   // const value = arrayObject[1];
        
      //   // this.setState({
      //   //   typebattery: value
      //   // })
      //   console.log('value json: ',this.state)
      //   // console.log('in typebattery: ',JSON.stringify(this.state.typebattery))
      //   // addbattery(this.state.typebattery).then((res)=>{
      //   //   console.log('insert ao: ', res)
      //   // })
      //   fetch('/api/users/typebattery', {
      //   method: 'POST',
      //   // We convert the React state to JSON and send it as the POST body
      //   body: JSON.stringify(this.state.typebattery)
      //   // body: this.state.typebattery

      // }).then(function(response) {
      //   console.log('test send data: ',response)
      //   return response.json();
      // });
      
      
    
      }
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); //green
      const cube = new THREE.Mesh( geometry, material );
      cube.position.set(0,5,-12);
      cube.name='cube';
      scene.add( cube );
      
      mmi.addHandler('cube', 'click', (object) => {
        console.log('da click cubeeee');
        console.log('in ra typebattery: ',this.state.typebattery)
        {this.props.getdulieu(this.state.typebattery)};
    
        // window.location = "/training";

       
        // console.log('in ra dl: ',this.props.pushdata());
        
    });
     
      
      
      // file perbaodo8 is belong to baodo6.glb

      arrayObject = ['./battery.glb','./battery2.glb','./battery3.glb']
      console.log('in json object: ', JSON.stringify(arrayObject[1]))

      const loaderarrowForward = new GLTFLoader();

      loaderarrowForward.load('./arrow.glb',  (gltf) => {
        console.log('in arrow go: ',gltf)
        

        arrowforward = gltf.scene;
        
        arrowforward.position.set(-2,6,-10);
        arrowforward.rotation.z = Math.PI/2
        arrowforward.rotation.x = -Math.PI/2

        // arrowforward.scale.set(0.1,0.1,0.1)
        
        scene.add(arrowforward)
        
        mmi.addHandler('Cube', 'click', (object) => {
          
          model.remove(model2x)
          console.log('da click arrowGo');
          arrayObject.unshift(arrayObject[arrayObject.length -1]);
          arrayObject.pop();
          //reload arrayObject, then run resetloaditem()
          console.log('new arrayObject: ',arrayObject)
          this.setState({
            typebattery: arrayObject[1]
          })
          console.log('in ra arrow typebattery: ', this.state.typebattery)
          resetloaditem();

      
          for (let z = 0; z <= 2.5; z = z + 0.5){
            // console.log('in z ne:', z)
            setTimeout(() => {
            model.rotation.z= z;     
            model.position.set(6,0,0);
            },50*z)
          }
          setTimeout(() =>{
          mixer = new THREE.AnimationMixer( model );
        
          const action = mixer.clipAction(clipanimationDevice);
          // action.clampWhenFinished = true; //Capture the status of aniamtion
          action.loop = THREE.LoopOnce; //go back the initial status
          action.time = 0.5; // fhz ??
          action.weight = 2; //weight object
          // action.zeroSlopeAtStart = true;
          // action.zeroSlopeAtEnd = true;
          action.play();
  
          
          },400*2.5)
           //rotate in itself
          const loader2x = new GLTFLoader();
  
          loader2x.load(arrayObject[1],  (gltf2) => {
          console.log('print value1 array: ',arrayObject[1])
  
          model2x = gltf2.scene;
          
          gltf2.scene.scale.set(.05, .05, .05);

          for (let rot=0; rot <=3.14; rot = rot + 0.05){
          setTimeout (() => {
            
            //at -1 of y position, y: -3.14 ==> 0.16
            model2x.position.set(2,-3.10 + rot + 0.16,0);
            model2x.rotation.set(rot,rot,rot)
            model.add(model2x)
            // console.log('model model: ',model)
            
          },150*2.5) 
        }
      })
        });
      })
      const loaderarrowBack = new GLTFLoader();

      loaderarrowBack.load('./arrow2.glb',  (gltf) => {
        console.log('in arrow back: ',gltf)
        arrowBack = gltf.scene;
        
        arrowBack.position.set(-2,6,10);
        arrowBack.rotation.z = Math.PI/2
        arrowBack.rotation.x = Math.PI/2

        // arrowforward.scale.set(0.1,0.1,0.1)
        
        scene.add(arrowBack)
        mmi.addHandler('Cube2', 'click', (object) => {
          

          model.remove(model2x)
          console.log('da click arrowBack');
          arrayObject.push(arrayObject[0]);
          arrayObject.shift();
          console.log('new arrayObject: ',arrayObject)
          this.setState({
            typebattery: arrayObject[1]
          })
          resetloaditem();
          console.log('in arrayObject2: ', arrayObject)
  
          for (let z = 0; z <= 2.5; z = z + 0.5){
                // console.log('in z ne:', z)
                setTimeout(() => {
                model.rotation.z= z;     
                },50*z)
              }
              setTimeout(() =>{
              mixer = new THREE.AnimationMixer( model );
            
              const action = mixer.clipAction(clipanimationDevice);
              // // action.clampWhenFinished = true; //Capture the status of aniamtion
              action.loop = THREE.LoopOnce; //go back the initial status
              action.time = 0.5; // fhz ??
              action.weight = 12; //weight object
              // // action.zeroSlopeAtStart = true;
              // // action.zeroSlopeAtEnd = true;
              action.play();
  
              
              },500*2.5)
               //rotate in itself
              const loader2x = new GLTFLoader();
  
              loader2x.load(arrayObject[1],  (gltf2) => {
              console.log('print value1 array: ',arrayObject[1])
      
              model2x = gltf2.scene;
              
              gltf2.scene.scale.set(.05, .05, .05);
      
            
              for (let rot=0; rot <=3.14; rot = rot + 0.05){
              setTimeout (() => {
                
                //at -1 of y position, y: -3.14 ==> 0.16
                model2x.position.set(2,-3.10 + rot + 0.16,0);
                model2x.rotation.set(rot,rot,rot)
                model.add(model2x)

                
              },150*2.5) 
            }
          })
            
       
        });

      })
      const loader2x = new GLTFLoader();
  
      loader2x.load(arrayObject[1],  (gltf2) => {
      model2x = gltf2.scene;
      
      gltf2.scene.scale.set(.05, .05, .05);
      model2x.position.set(2,0.2,0);
      model.add(model2x)

      
  })
    const resetloaditem = () =>{
    
      console.log('in ra arrayObject trong for: ',arrayObject)
      arrayObject.forEach((model_i,i) => {
        
      
      const loader2 = new GLTFLoader();
      // file perbaodo8 is belong to baodo6.glb
      loader2.load(model_i,  (gltf) => {
        console.log('in ra i trong reset: ',i)
        model2 = gltf.scene;
 
        model2animation = gltf.animations;
        
        gltf.scene.position.set(-2,6,5 - i*5);
        if (i === 1) {
          model2.scale.set(.2, .2, .15);

        } else{
          model2.scale.set(.1, .1, .1);

        }


        scene.add( model2 );

      })
    });
  
  }
  resetloaditem();
      const loader = new GLTFLoader();
      
      loader.load("./bprbatterytray4.glb",  (gltf) => {
        console.log('in ra huyetap: ',gltf);
        model = gltf.scene;
        clipsanimationDevice = gltf.animations;
        console.log('in ra update')
        model.position.set(0,0,0);

        // gltf.scene.position.set(8,0,1);
        gltf.scene.scale.set(1.4, 1.4, 1.5);
        gltf.scene.rotation.z = -0.7;
        gltf.scene.rotation.x = 0;
       
         
        //animation
        mixer = new THREE.AnimationMixer( model );
        // const clips = gltf.animations;
        
        clipanimationDevice = THREE.AnimationClip.findByName( clipsanimationDevice,'Armature.001Action');
        // // Play a specific animation
        // const clip = THREE.AnimationClip.findByName( clipsanimationDevice,'Armature.001Action');
        // clip
        const action = mixer.clipAction(clipanimationDevice);
        // action.clampWhenFinished = true; //Capture the status of aniamtion
        action.loop = THREE.LoopOnce; //go back the initial status
        action.time = 0.5; // fhz ??
        action.weight = 2; //weight object
        // action.zeroSlopeAtStart = true;
        // action.zeroSlopeAtEnd = true;
        action.play();

        ///
        scene.add( model );
        
        console.log('in ra huyetapnew: ',gltf);
        // const dcontrols = new DragControls([gltf.scene.children[0]] , camera, renderer.domElement );
       

       
  
      // initialize instance of class MouseMeshInteraction, passing threejs scene and camera
      mmi.addHandler('Vert001', 'click', (object) => {
        console.log('test test test')
        mixer = new THREE.AnimationMixer( model );
        const clips = gltf.animations;
        
        // // Play a specific animation
        const clip = THREE.AnimationClip.findByName( clips,'Armature.001Action');
        // clip 
        const action = mixer.clipAction(clip);
        // action.clampWhenFinished = true; //Capture the status of aniamtion
        action.loop = THREE.LoopOnce; //go back the initial status
        action.time = 0.5; // fhz ??
        action.weight = 2; //weight object
        // action.zeroSlopeAtStart = true;
        // action.zeroSlopeAtEnd = true;
        action.play();
    
        //  Play all animations
        

      })
        mmi.addHandler('Plane001', 'click', (object) => {
          // model.children[0].children[1] = model5_1;  
          // // gltf.scene.children[0].children[1].visible = false;
          // console.log('may huyet ap: ', gltf);
          // model.rotation.x = 1.8;
          // scene.add(model)

        console.log('bdpressure mesh is being clicked!');
         
          // Create an AnimationMixer, and get the list of AnimationClip instances
        mixer = new THREE.AnimationMixer( model );
        const clips = gltf.animations;
        // 'ArmatureAction.002'
        // // Play a specific animation
        const clip = THREE.AnimationClip.findByName( clips,'ArmatureAction.002');
        // clip
        const action = mixer.clipAction(clip);
        // action.clampWhenFinished = true; //Capture the status of aniamtion
        action.loop = THREE.LoopOnce; //go back the initial status
        action.time = 0.5; // fhz ??
        action.weight = 2; //weight object
        // action.zeroSlopeAtStart = true;
        // action.zeroSlopeAtEnd = true;
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
    
        if (model ){ //check xem model co ton tai
          model.rotation.y += 0;
        
        }
        if (model2){
          model2.rotation.y -= 0.0;
        }
        if (cube){
          cube.rotation.y += 0.05;
        }
     
        // dragObject();
        // controls.autoRotate = true;
        // controls.autoRotateSpeed = 5.0;

   
        hoverPieces();
        // moveobject();
        resetMaterials();
        controls.update();
        
        
        // onMouseMove();
        // renderer.render(scene, camera);
  
      }
      // function onClick( event ) {

      //   // calculate pointer position in normalized device coordinates
      //   // (-1 to +1) for both components
      
      //   mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      //   mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      
      // }

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

    }
  render() {
    return (
        <div>
          {/* <Link to="/training">
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
