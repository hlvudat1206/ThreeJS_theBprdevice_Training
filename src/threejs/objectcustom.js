import * as THREE from "three";
import React, { Component } from 'react';

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DragControls } from "./DragControls";

import MouseMeshInteraction from "./mousemes_interact";

let scene, camera, mouse, raycaster, board, selectedPiece = null, mixer, light, model, model2, model2x, model5, model5_1,
model2animation, renderer,binormal,normal, angleDeg, group, clipsanimationDevice, clipanimationDevice, returnZ;
var clock2;

export default class Objectcustom extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          deviceAnimation: false,
          
        }
        
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


      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube = new THREE.Mesh( geometry, material );
      cube.position.set(0,5,-12);
      cube.name='cube';
      scene.add( cube );
      mmi.addHandler('cube', 'click', (object) => {
        console.log('da click cubeeee');
        window.location = 'training'
     
      });
    
      
      const loader5 = new GLTFLoader();
      loader5.load("./perhand.glb",  (gltf) => {
        console.log('in ra canh tay: ',gltf);

        model5 = gltf.scene;
        model5_1 = gltf.scene.children[0].children[1]
        gltf.scene.position.set(-1,-2,8);
        // gltf.scene.rotation.y = 0.5;
        // gltf.scene.children[0].position.set(4,-5,2);
        gltf.scene.scale.set(20.8,20.8,20.8);
        gltf.scene.rotation.y = 1.8;
        // gltf.scene.children[0].rotation.y = 1.78; 
  // 

        // scene.add( model5 );
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
      });

      const loader2x = new GLTFLoader();
      // file perbaodo8 is belong to baodo6.glb
      const arrayObject = ['./battery.glb','battery2.glb','battery3.glb']
      loader2x.load(arrayObject[0],  (gltf) => {
        model2x = gltf.scene;
        
        gltf.scene.scale.set(.05, .05, .05);

      })
      const loader2 = new GLTFLoader();
      // file perbaodo8 is belong to baodo6.glb
      loader2.load("./battery.glb",  (gltf) => {
        console.log('print battery:', gltf);
        // model = gltf.scene.children[2];
        model2 = gltf.scene;
        
        model2animation = gltf.animations;
        gltf.scene.position.set(1.5,5,2);
        gltf.scene.scale.set(.1, .1, .1);
        // gltf.scene.rotation.y = 0.2;
       
        // gltf.scene.rotation.y = 0.0;
        // console.log('print scale:', gltf.scene.scale);

        model2.name = 'battery';
        // const group = new THREE.Group();
        // group.add( cubeA );
        // group.add( cubeB );
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
          
        mmi.addHandler('Battery0', 'click',  (object) => {
          console.log('da click battery');
          // model.rotation.y= MathPI;
            
            // scene.add(model2x);
            
            for (let z = 0; z <= 2.5; z = z + 0.1){
              // console.log('in z ne:', z);
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
            action.weight = 5; //weight object
            // // action.zeroSlopeAtStart = true;
            // // action.zeroSlopeAtEnd = true;
            action.play();

            
            },300*2.5)
             //rotate in itself
            for (let rot=0; rot <=3.14; rot = rot + 0.05){
            setTimeout (() => {
              
              //at -1 of y position, y: -3.14 ==> 0.16
              model2x.position.set(2,-3.10 + rot + 0.16,0);
              model2x.rotation.set(rot,rot,rot)
              model.add(model2x)
              console.log('in position new battery: ',model2x.position)
              console.log('in huyet ap grouped: ',model)
            },400*2.5) 
          }
        })  
          

        });
        
        

      })
      const loader = new GLTFLoader();
      
      loader.load("./bprbatterytray4.glb",  (gltf) => {
        console.log('in ra huyetap: ',gltf);
        model = gltf.scene;
        clipsanimationDevice = gltf.animations;
        console.log('in ra update')
        gltf.scene.position.set(0,0,0);

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
        // [gltf.scene.children[0]]
        const dcontrols = new DragControls([gltf.scene.children[0]] , camera, renderer.domElement );
        // const dcontrols = new DragControls( [gltf.scene.children[1]], camera, renderer.domElement );

        document.body.appendChild( renderer.domElement );

       
  
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
        renderer.render(scene, camera);
  
      }
      function onClick( event ) {

        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components
      
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      
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
        <canvas id="bg">
       
        </canvas>
        
        </div>
    )
  }
}
