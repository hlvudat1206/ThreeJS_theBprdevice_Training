import * as THREE from "three";
import React, { Component } from 'react'
import MouseMeshInteraction from "./mousemes_interact";
// import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {DragControls} from "./DragControls";
let mouse, raycaster, board, selectedPiece = null, mixer, light, model, model2, renderer, mixer2;
export default class ThreeScene extends Component {
    constructor(props) {
      super(props);
      
    }
    componentDidMount(){
        // create scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x4caca5
        );

        // create camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
        // create rendering
      const renderer = new THREE.WebGL1Renderer({
        canvas: document.querySelector("#bg"),
      });
      renderer.toneMapping = THREE.ReinhardToneMapping; //use toneMapping
      renderer.toneMappingExposure = 2.3;
      renderer.shadowMap.enabled = true;

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.position.set(10, 2, 0);

      renderer.render(scene, camera);
      // //create cube
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial( { 
          color: 0xff0000  ,
          wireframe: false});
      let cube = new THREE.Mesh( geometry, material );
      // cube.position.set(2,2,5); //x z y 
      console.log('cube', cube);
      scene.add( cube );
       camera.position.z = 8;
       camera.position.x = 6;
       camera.position.y = 2;

      
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

      
      
      // const dirLight = new THREE.DirectionalLight(0xf5f5f5); // anh sang song song, xa vo cuc, mo ta as ban ngay, mo phong mat troi
      // dirLight.position.set(-3, 10, -10);
      // scene.add(dirLight);
  
      // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // anh sang toan bo, khong co huong
      // ambientLight.position.set(0, 0, 0);
      // scene.add(ambientLight);
      
			//////////////
			const gray_color = new THREE.Color(0x57554f);
			const yellow_color = new THREE.Color(0xe0c53a); 
      /////////////////

      // initialize instance of class MouseMeshInteraction, passing threejs scene and camera
			const mmi = new MouseMeshInteraction(scene, camera);
			// add a handler on mouse click for mesh (or meshes) with the name 'bulb'
      mouse = new THREE.Vector2();
      raycaster = new THREE.Raycaster();
      const _mixers = [];
      // import glb file
      const loader4 = new GLTFLoader();
      // loader4.load("./labcustom.glb", function (gltf) {
      //   console.log('in ra:', gltf);
      //   console.log('in ra children22: ',gltf.scene.children[0]);
      //   model = gltf.scene.children[0];
      //   // model.traverse(n => { if ( n.isMesh ) {
      //   //   n.castShadow = true; 
      //   //   n.receiveShadow = true;
      //   //   if(n.material.map) n.material.map.anisotropy = 16; 
      //   // }});

      //   gltf.scene.position.set(0,0,0);
      //   gltf.scene.scale.set(2.8, 2.8, 2.8);

      //   scene.add( gltf.scene );

      // })

      // const loader2 = new GLTFLoader();
      // loader2.load("./baodo4.glb", function (gltf) {
      //   console.log('in ra:', gltf);
      //   console.log('in ra children22: ',gltf.scene.children[0]);
      //   model = gltf.scene.children[0];
      //   // model.traverse(n => { if ( n.isMesh ) {
      //   //   n.castShadow = true; 
      //   //   n.receiveShadow = true;
      //   //   if(n.material.map) n.material.map.anisotropy = 16; 
      //   // }});

      //   gltf.scene.position.set(2,2.2,2);
      //   gltf.scene.scale.set(0.9, 0.9, 0.9);
      
      //   scene.add( gltf.scene );
      //   mmi.addHandler('nham', 'click', function(object) {
      //     console.log('daydo mesh is being clicked!');
      //     // object.rotation._x = 60;
      //     //     scene.scale.set(2.5, 2.5, 2.5);
      //     gltf.scene.scale.set(4.0, 4.0, 4.0);
      //     gltf.scene.position.set(0,0,0); //y z x

      //     // for (let i=0; i<gltf.scene.children.length; i++){
      //     //   gltf.scene.children[i].rotation.z=150;
  
      //     // }
          
      //     gltf.scene.rotation.z=30;
      //   })

      // })
      
      // let mixer;
      // const loader3 = new GLTFLoader();
      // loader3.load("./boyring6.glb", function (gltf) {
      //   console.log('in ra boyboy: ',gltf);
      //   model2 = gltf.scene;
      //   // model2.traverse(n => { if ( n.isMesh ) {
      //   //   n.castShadow = true; 
      //   //   n.receiveShadow = true;
      //   //   if(n.material.map) n.material.map.anisotropy = 16; 
      //   // }});

      //   gltf.scene.position.set(4,0,2);
      //   gltf.scene.scale.set(1.8, 1.8, 1.8);

      //   scene.add( model2 );

      //   // Create an AnimationMixer, and get the list of AnimationClip instances
      //   mixer = new THREE.AnimationMixer( model2 );
      //   const clips = gltf.animations;


      //   // Play a specific animation
      //   const clip = THREE.AnimationClip.findByName( clips, 'RigAction' );
      //   const action = mixer.clipAction(clip);
      //   // action.play();

      //   // Play all animations
      //   clips.forEach( function ( clip ) {
      //   mixer.clipAction( clip ).play();
      //   } );
      // },undefined,function(error){
      //   console.error(error);
      // });

      // let mixer2;
      const loader5 = new GLTFLoader();
      loader5.load("./canhtay.glb", function (gltf) {
        console.log('in ra canh tay: ',gltf);
        const model5 = gltf.scene;
        // model.traverse(n => { if ( n.isMesh ) {
        //   n.castShadow = true; 
        //   n.receiveShadow = true;
        //   if(n.material.map) n.material.map.anisotropy = 16; 
        // }});

        // gltf.scene.position.set(4,0,2);
        // gltf.scene.scale.set(3.8, 3.8, 3.8);
        gltf.scene.children[0].position.set(4,0,2);
        gltf.scene.children[0].scale.set(3.8,3.8,3.8);
        gltf.scene.children[0].rotation.z = 60;
        // gltf.scene.children[0].rotation.x = 60;
        

        scene.add( model5 );
      });

      const loader = new GLTFLoader();
      loader.load("./huyetap23.glb", function (gltf) {
        console.log('in ra huyetap: ',gltf);
        model = gltf.scene;
        // model.traverse(n => { if ( n.isMesh ) {
        //   n.castShadow = true; 
        //   n.receiveShadow = true;
        //   if(n.material.map) n.material.map.anisotropy = 16; 
        // }});

        gltf.scene.position.set(4,0,2);
        gltf.scene.scale.set(0.8, 0.8, 0.8);

        scene.add( model );

        const dcontrols = new DragControls( [gltf.scene.children[3]], camera, renderer.domElement );

        document.body.appendChild( renderer.domElement );

        dcontrols.addEventListener( 'dragstart', function ( event ) {
        // event.object.material.emissive.set( 0xaaaaaa );
          // gltf.scene.material.transparent = true;
          gltf.scene.children[3].material.opacity = 0.5;
          console.log('huyet ap 2: ',gltf);


        } );

        dcontrols.addEventListener( 'dragend', function ( event ) {
        // event.object.material.emissive.set( 0x000000 );

        });

        
        
        
      // initialize instance of class MouseMeshInteraction, passing threejs scene and camera
        
        mmi.addHandler('Vert001', 'click', function(object) {
          console.log('bdpressure mesh is being clicked!');
          
          gltf.scene.scale.set(1.0, 1.0, 1.0);
          // for (let i=0; i<gltf.scene.children.length; i++){
          //   gltf.scene.children[i].position.set(4,4,4);

          // }
          gltf.scene.position.set(1,2,2);

          // gltf.scene.children[3].rotation.z=40;
          
          // object.rotation._onChangeCallback=true
          // object.rotation._x = 60;
          // object.rotation._y = 60;
          // object.rotation._z = 60;
          // console.log('in xoay: ',object.rotation)
          // Create an AnimationMixer, and get the list of AnimationClip instances
        mixer = new THREE.AnimationMixer( model );
        const clips = gltf.animations;


        // Play a specific animation
        const clip = THREE.AnimationClip.findByName( clips, 'ArmatureAction.002' );
        // const action = mixer.clipAction(clip);
        // action.play();

        // Play all animations
        clips.forEach( function ( clip ) {
        mixer.clipAction( clip ).play();
        } );

        })
        
          

        
  
      //   });
        // just to test if the new features are conflicting with previously supported events
			//		(everything seems to be OK)
        mmi.addHandler('Vert001', 'dblclick', function(object) {
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
        mmi.addHandler('Vert001', 'contextmenu', function(object) {
          console.log('bdpressure is pressed with the right button!');
          // gltf.scene.parent.background.set(0xff0a0a);
          // gltf.scene.children[6].parent.parent.background.set(0xff0a0a);
          object.material.opacity = 0.8;



        });
			
        
      });
    
     // add a name to the mesh (needed for mmi to work, you can give the same name to multiple meshes)
		
      
    const controls = new OrbitControls(camera, renderer.domElement);

    controls.update();

    function positionForSquare(square) {
        const found = board.children.find((child) => child.userData.squareNumber == square);
        if (found)
          return found.position;
        return null;
      }

    const clock = new THREE.Clock();
    
      // animate();


      function animate() {
        requestAnimationFrame(animate);
        if (mixer)
              mixer.update(clock.getDelta());
        light.position.set( 
          camera.position.x + 10,
          camera.position.y + 10,
          camera.position.z + 10,
        );
        // dragObject();
        // controls.autoRotate = false;
        // controls.autoRotateSpeed = 0.0;
        // moveobject();
        controls.update();
        // onMouseMove();
        renderer.render(scene, camera);
  
      }
      

      









      renderer.setAnimationLoop(animate);
      function render() {
				requestAnimationFrame(render);
				// update the mmi
				mmi.update();
				renderer.render(scene, camera);
        }

          

      window.requestAnimationFrame(render)
			
			
			render();
      
      // window.addEventListener( 'mousemove', onMouseMove, false );
      // window.addEventListener('click', onClick);
      // window.addEventListener( 'mousemove', moveobject );

      
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
  
    