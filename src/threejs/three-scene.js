import * as THREE from "three";
import React, { Component } from 'react';
import MouseMeshInteraction from "./mousemes_interact";
// import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DragControls } from "./DragControls";
<<<<<<< HEAD
import { PerspectiveCamera } from "three";

let mouse, raycaster, board, selectedPiece = null, mixer, light, model, model2, renderer, mixer2;
=======
import CustomSinCurve from "./sinline";
import { Texture } from "three";


let scene, camera, mouse, raycaster, board, selectedPiece = null, mixer, light, model, model2, renderer, mixer2,binormal,normal;
var clock2;

>>>>>>> 979174e0733bb193497d0a843b77fa25e44fb804
export default class ThreeScene extends Component {
    constructor(props) {
      super(props);
      this.updatemove = false;
      
    }
    
    componentDidMount(){
        // create scene
      let updatemove = false;
<<<<<<< HEAD
      const scene = new THREE.Scene();
=======
      
      scene = new THREE.Scene();
>>>>>>> 979174e0733bb193497d0a843b77fa25e44fb804
      scene.background = new THREE.Color(0x4caca5
        );

        // create camera
<<<<<<< HEAD
      const camera = new THREE.PerspectiveCamera(
        105,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
    
=======
      // camera = new THREE.PerspectiveCamera(
      //   105,
      //   window.innerWidth / window.innerHeight,
      //   0.1,
      //   1000
      // );
      camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
      // camera = new THREE.PerspectiveCamera( 185, window.innerWidth / window.innerHeight, 0.1, 1000 );
      camera.position.set(0, 0, 0);//wide position
      camera.lookAt(0,1.5,0);
 
  
 

>>>>>>> 979174e0733bb193497d0a843b77fa25e44fb804
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
<<<<<<< HEAD
      // //create cube
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial( { 
          color: 0xff0000  ,
          wireframe: false});
      let cube = new THREE.Mesh( geometry, material );
      // cube.position.set(2,2,5); //x z y 
      console.log('cube', cube);
      scene.add( cube );
       camera.position.z = 5;
=======

      
      // //create cube
      // const geometry2 = new THREE.BoxGeometry();
      // const material2 = new THREE.MeshBasicMaterial( { 
      //     color: 0xff0000  ,
      //     wireframe: false});
      // let cube = new THREE.Mesh( geometry2, material2 );
      // // cube.position.set(2,2,5); //x z y 
      // console.log('cube', cube);
      // scene.add( cube );
      
      // create path
      // const assetPath = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/2666677/";
  
      clock2 = new THREE.Clock();
      
      // const envMap = new THREE.CubeTextureLoader()
      //   .setPath(`${assetPath}skybox1_`)
      //   .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
      // scene.background = envMap;

      const curve = new CustomSinCurve(2);
     
      

      const geometry = new THREE.TubeBufferGeometry( curve, 100, 1, 1, true );
      const material = new THREE.MeshBasicMaterial({ wireframe:true, color: 0x00000, 
        // side: THREE.DoubleSide 
      });
      const tube = new THREE.Mesh( geometry, material );
      tube.position.set(4,4,4);
      scene.add(tube);
      
     
      
      window.addEventListener( 'resize', resize, false);
      
      update();
      
      
      
>>>>>>> 979174e0733bb193497d0a843b77fa25e44fb804
      
      // create light
      const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820,4); // anh sang truc tiep tu canh, su dung 2 mau nau pale orange for sky and gray for ground 
      hemiLight.position.set(0, 20, 0);
      scene.add(hemiLight);

      light = new THREE.SpotLight(0xffa95c,4); //The sun
      light.position.set(-50,50,50);
      light.castShadow = true;
<<<<<<< HEAD
      scene.add( light );
=======
      scene.add( light ); 
>>>>>>> 979174e0733bb193497d0a843b77fa25e44fb804

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
<<<<<<< HEAD
     
      /////////////////
=======
    
>>>>>>> 979174e0733bb193497d0a843b77fa25e44fb804

      // initialize instance of class MouseMeshInteraction, passing threejs scene and camera
			const mmi = new MouseMeshInteraction(scene, camera);
			
			// add a handler on mouse click for mesh (or meshes) with the name 'bulb'
			

      mouse = new THREE.Vector2();
     
      raycaster = new THREE.Raycaster();
      // const _mixers = [];
      //import glb file
      // const loader4 = new GLTFLoader();
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

<<<<<<< HEAD
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
=======
      const loader2 = new GLTFLoader();
      loader2.load("./baodo4.glb", function (gltf) {
        console.log('in ra:', gltf);
        console.log('in ra children22: ',gltf.scene.children[0]);
        model = gltf.scene.children[2];
        // model.traverse(n => { if ( n.isMesh ) {
        //   n.castShadow = true; 
        //   n.receiveShadow = true;
        //   if(n.material.map) n.material.map.anisotropy = 16; 
        // }});

        gltf.scene.position.set(8,1,0.5);
        gltf.scene.scale.set(0.9, 0.9, 0.9);
      
        scene.add( gltf.scene );

        const dcontrols2 = new DragControls( [gltf.scene.children[2]], camera, renderer.domElement );
        document.body.appendChild( renderer.domElement );
        dcontrols2.addEventListener( 'dragstart', function ( event ) {
          // event.object.material.emissive.set( 0xaaaaaa );
            // gltf.scene.material.transparent = true;
            // gltf.scene.children[3].material.opacity = 0.5;
            // gltf.scene.children.material.opacity = 0.5;
            console.log('in x: ',mouse.x);
            console.log('in y: ',mouse.y);

          } );
  
        dcontrols2.addEventListener( 'dragend', function ( event ) {
        // event.object.material.emissive.set( 0x000000 );
          console.log('in x2: ',mouse.x);
          console.log('in y2: ',mouse.y);
          // if (mouse.x < -0.01 &&  mouse.y > 0.1) {
            
          //   gltf.scene.position.set(0,4,5);
          //   console.log('da move bao do');
          // } else {
          //   return gltf.scene.position.set(0,2,-4);
          //   console.log('da fail bao do');
          // }

        });
        mmi.addHandler('nham', 'click', function(object) {
          console.log('daydo mesh is being clicked!');
          // object.rotation._x = 60;
          //     scene.scale.set(2.5, 2.5, 2.5);
          // gltf.scene.scale.set(4.0, 4.0, 4.0);
          // gltf.scene.position.set(0,0,0); //y z x

          // for (let i=0; i<gltf.scene.children.length; i++){
          //   gltf.scene.children[i].rotation.z=150;
  
          // }
          
          // gltf.scene.rotation.z=30;

        
        })

      })
>>>>>>> 979174e0733bb193497d0a843b77fa25e44fb804
      
      // let mixer;
      // const loader3 = new GLTFLoader();
      // loader3.load("./boyring6.glb", function (gltf) {
      //   console.log('in ra boyboy: ',gltf);
<<<<<<< HEAD
=======
      //   console.log('in boy x: ',mouse.x);
      //   console.log('in boy y: ',mouse.y);
>>>>>>> 979174e0733bb193497d0a843b77fa25e44fb804
      //   model2 = gltf.scene;
      //   // model2.traverse(n => { if ( n.isMesh ) {
      //   //   n.castShadow = true; 
      //   //   n.receiveShadow = true;
      //   //   if(n.material.map) n.material.map.anisotropy = 16; 
      //   // }});

<<<<<<< HEAD
      //   gltf.scene.position.set(4,0,2);
      //   gltf.scene.scale.set(1.8, 1.8, 1.8);
=======
      //   // gltf.scene.position.set(4,-2,3);
      //   gltf.scene.position.set(3,-12,6);
      //   gltf.scene.rotation.y = 90;
      //   gltf.scene.scale.set(10.5,10.5,10.5);
>>>>>>> 979174e0733bb193497d0a843b77fa25e44fb804

      //   scene.add( model2 );

      //   // Create an AnimationMixer, and get the list of AnimationClip instances
      //   mixer = new THREE.AnimationMixer( model2 );
      //   const clips = gltf.animations;


      //   // Play a specific animation
      //   const clip = THREE.AnimationClip.findByName( clips, 'RigAction' );
      //   const action = mixer.clipAction(clip);
      //   // action.play();
<<<<<<< HEAD

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
      loader.load("./huyetap27.glb", function (gltf) {
        console.log('in ra huyetap: ',gltf);
        model = gltf.scene;
=======
      
      //   // Play all animations
      //   // clips.forEach( function ( clip ) {
      //   // mixer.clipAction( clip ).play();
      //   // } );
      // },undefined,function(error){
      //   console.error(error);
      // }
      // );
      

      // let mixer2;
      // const loader5 = new GLTFLoader();
      // loader5.load("./canhtay.glb", function (gltf) {
      //   console.log('in ra canh tay: ',gltf);
      //   const model5 = gltf.scene;
      //   // model.traverse(n => { if ( n.isMesh ) {
      //   //   n.castShadow = true; 
      //   //   n.receiveShadow = true;
      //   //   if(n.material.map) n.material.map.anisotropy = 16; 
      //   // }});

      //   // gltf.scene.position.set(4,0,2);
      //   // gltf.scene.scale.set(3.8, 3.8, 3.8);
      //   gltf.scene.children[0].position.set(4,0,2);
      //   gltf.scene.children[0].scale.set(3.8,3.8,3.8);
      //   gltf.scene.children[0].rotation.z = 60;
      //   // gltf.scene.children[0].rotation.x = 60;
        

      //   scene.add( model5 );
      // });
     
      const loader = new GLTFLoader();
      
      loader.load("./huyetap34.glb", function (gltf) {
        console.log('in ra huyetap: ',gltf);
        model = gltf.scene;

>>>>>>> 979174e0733bb193497d0a843b77fa25e44fb804
        // model.traverse(n => { if ( n.isMesh ) {
        //   n.castShadow = true; 
        //   n.receiveShadow = true;
        //   if(n.material.map) n.material.map.anisotropy = 16; 
        // }});
<<<<<<< HEAD

        gltf.scene.position.set(8,0,1);
        gltf.scene.scale.set(0.4, 0.4, 0.4);

        scene.add( model );
       
=======
        gltf.scene.position.set(0,2,-5);

        // gltf.scene.position.set(8,0,1);
        gltf.scene.scale.set(1.2, 1.2, 1.2);
        gltf.scene.rotation.z = -0.7;
        gltf.scene.rotation.x = 0.0;
        gltf.scene.rotation.y = 0;

        scene.add( model );
        const root = model.children[0].children[1];
        // root.children[0].visible = true;
        const screen = root.children[0];
        // const imageArray = ['test1.jpg','test2.jpg','error.jpg'];
        const imageArray2 = ['Artboard 00.png','Artboard 1.png'];
        
        

        
        const imageArray = ['Artboard 0.png','Artboard 1.png','Artboard 2.png','Artboard 3.png','Artboard 4.png'
        ,'Artboard 5.png','Artboard 6.png','Artboard 7.png','Artboard 8.png','Artboard 9.png','Artboard 10.png'
        ,'Artboard 11.png','Artboard 12.png','Artboard 13.png','Artboard 14.png','Artboard 15.png'];
            
            // const map = new THREE.TextureLoader();
        
 
        scene.add(model);
        update();
>>>>>>> 979174e0733bb193497d0a843b77fa25e44fb804
        const dcontrols = new DragControls( [gltf.scene.children[0]], camera, renderer.domElement );

        

        // const dcontrols = new DragControls( [gltf.scene.children[1]], camera, renderer.domElement );

        document.body.appendChild( renderer.domElement );

        dcontrols.addEventListener( 'dragstart', function ( event ) {
        // event.object.material.emissive.set( 0xaaaaaa );
          // gltf.scene.material.transparent = true;
          // gltf.scene.children[3].material.opacity = 0.5;
          // gltf.scene.children.material.opacity = 0.5;
<<<<<<< HEAD

          console.log('huyet ap 2: ',gltf);
=======
          console.log('in x: ',mouse.x);
          console.log('in y: ',mouse.y);
          console.log('do dai array: ',imageArray.length)
        
>>>>>>> 979174e0733bb193497d0a843b77fa25e44fb804


        } );

        dcontrols.addEventListener( 'dragend', function ( event ) {
        // event.object.material.emissive.set( 0x000000 );
<<<<<<< HEAD

        });

        // gltf.scene.children[0].children[1].type = 'Mesh';      


        // gltf.scene.children[0].children[1].name = 'Cube';      
        // const intersects = raycaster.intersectObjects( scene.children);
=======
          console.log('in x2: ',mouse.x);
          console.log('in y2: ',mouse.y);
          if (mouse.x < -0.01 &&  mouse.y > 0.1) {
            
            gltf.scene.position.set(0,4,5);
            console.log('da move');
          } else {
            return console.log('da fail');
            // gltf.scene.position.set(0,2,-4);
            
          }

        });
>>>>>>> 979174e0733bb193497d0a843b77fa25e44fb804
        
        
      // initialize instance of class MouseMeshInteraction, passing threejs scene and camera
        
        mmi.addHandler('Vert001', 'click', function(object) {
<<<<<<< HEAD
          camera.position.set(0, 5, 0);

        // camera.position.set(10, 3, 0);
          console.log('bdpressure mesh is being clicked!');
          gltf.scene.rotation.x=50;

          // console.log(this.mouse.x)
          // console.log(this.mouse.y)

          // object.rotation._x = 60;
          //     scene.scale.set(2.5, 2.5, 2.5);
          // gltf.scene.scale.set(1.0, 1.0, 1.0);
          // gltf.scene.position.set(1,2,2);
          // for (let i=0; i<gltf.scene.children.length; i++){
          //   gltf.scene.children[i].position.set(4,4,4);

          // }
          
        
          // gltf.scene.rotation.z=30;
          
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

=======
          const map2 = new THREE.TextureLoader()
       
            .load(imageArray2[0]);
            // map.rotation = Math.PI / 2;
            
            map2.center.set(0.5, 0.5);
            map2.rotation = THREE.Math.degToRad(90);
            screen.traverse(child =>  {
              if(child.isMesh) {
                child.material.map = map2; 
                child.castShadow = true;
                child.receiveShadow = true;
                
            }
              
              scene.add(model)
            });
          
         
          for (let i=0; i<imageArray.length; i++) {
            
            setTimeout(() => {
              const map = new THREE.TextureLoader()
              // rotate( Math.PI / 2 );
                .load(imageArray[i])
                // map.rotation = Math.PI / 2;
                map.center.set(0.5, 0.5);
                map.rotation = THREE.Math.degToRad(90);
                screen.traverse(child =>  {
                
                  if(child.isMesh) {
                    child.material.map = map; 
                    child.castShadow = true;
                    child.receiveShadow = true;
                    
                }
                
                scene.add(model)
              });
            }, 300*i); //print the results with i times
            }
            
          
          console.log('bdpressure mesh is being clicked!');
         
          // Create an AnimationMixer, and get the list of AnimationClip instances
        mixer = new THREE.AnimationMixer( model );
        const clips = gltf.animations;
        

        // Play a specific animation
        const clip = THREE.AnimationClip.findByName( clips,'ArmatureAction.002' );
        const action = mixer.clipAction(clip);
        action.play();
        
        
        // Play all animations
        // clips.forEach( function ( clip ) {
        // mixer.clipAction( clip ).play();
        // } );
        
>>>>>>> 979174e0733bb193497d0a843b77fa25e44fb804
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
    
      // function moveobject(event){
      //   if (updatemove){
      //     mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      //     mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      //     for (let i=0; i< scene.children.length; i++){
      //         scene.children[i].position.set(mouse.x,mouse.y,0);
  
      //       }

      //   } else{
      //     updatemove = false;
      //   }
      // }
     // add a name to the mesh (needed for mmi to work, you can give the same name to multiple meshes)
		
      
    const controls = new OrbitControls(camera, renderer.domElement);
<<<<<<< HEAD

    controls.update();
=======
      controls.enable = false;
      // controls.target = loader2.posittion;
      controls.enableDamping = true; //tao ra quan tinh
      controls.dampingFactor = 0.001;
      controls.zoomSpeed = 0.1;

    // controls.update();
>>>>>>> 979174e0733bb193497d0a843b77fa25e44fb804

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
      // function onClick( event ) {

      //   event.preventDefault();
      
      //   mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      //   mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        
      
      //   raycaster.setFromCamera( mouse, camera );
      
      //   var intersects = raycaster.intersectObjects( scene.children, true );
      
      //   if ( intersects.length > 0 ) {
          
      //     console.log( 'Intersection:', intersects[ 0 ] );
      //     console.log('Click done !')
      //     scene.scale.set(2.5, 2.5, 2.5);
      //     // scene.position.set(scene.position.x+10)
      //     scene.rotation_Y=60;
      //     scene.rotation_X=60;
      //     scene.rotation_Z=60;
      //     scene.position.set(1,-5,-6);



      
      //   }
      
      // }
<<<<<<< HEAD
=======
      function updateCamera(){
        const time = clock2.getElapsedTime();
        const looptime = 20;
        const t = ( time % looptime ) / looptime;
        const t2 = ( (time + 0.1) % looptime) / looptime
        
        const pos = tube.geometry.parameters.path.getPointAt( t );
        const pos2 = tube.geometry.parameters.path.getPointAt( t2 );
        
        camera.position.copy(pos);
        camera.lookAt(pos2);
      }
      
      function update(){
        // requestAnimationFrame( update );
        // updateCamera();
        // renderer.render( scene, camera );  
      }
      
      function resize(){
        // camera.aspect = window.innerWidth / window.innerHeight;
        // camera.updateProjectionMatrix();
        // renderer.setSize( window.innerWidth, window.innerHeight );
      }

>>>>>>> 979174e0733bb193497d0a843b77fa25e44fb804
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
        hoverPieces();
        // moveobject();
        resetMaterials();
        // controls.update();
        // onMouseMove();
        renderer.render(scene, camera);
  
      }
      

      









      renderer.setAnimationLoop(animate);
      function render() {
				requestAnimationFrame(render);
				// update the mmi
				mmi.update();
				renderer.render(scene, camera);

        // raycaster.setFromCamera( mouse, camera );

        //     // calculate objects intersecting the picking ray
        //     const intersects = raycaster.intersectObjects( scene.children );
            
        //     for ( let i = 0; i < intersects.length; i ++ ) {
        //       // console.log('movemouse ne')

        //       intersects[i].object.material.color.set( 0x00bb00 );
        //       intersects[i].object.material.transparent = true;
        //       intersects[i].object.material.opacity = 0.2;

        //     }

            renderer.render( scene, camera );

          }

          

          window.requestAnimationFrame(render)
			
			
			render();
      // const dcontrols = new DragControls( objects, camera, renderer.domElement );
      // document.body.appendChild( renderer.domElement );
<<<<<<< HEAD

    //   function onMouseMove( event ) {
 
    //     // calculate mouse position in normalized device coordinates
    //     // (-1 to +1) for both components
     
    //     mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    //     mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
     
    // }
=======
      
      function onMouseMove( event ) {
 
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
     
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
        
        
     
    }
>>>>>>> 979174e0733bb193497d0a843b77fa25e44fb804


      // add event listener to highlight dragged objects

      // dcontrols.addEventListener( 'dragstart', function ( event ) {
      //   // event.object.material.emissive.set( 0xaaaaaa );


      // } );

      // dcontrols.addEventListener( 'dragend', function ( event ) {
      //   // event.object.material.emissive.set( 0x000000 );

      // } );
<<<<<<< HEAD
      // window.addEventListener( 'mousemove', onMouseMove, false );
=======
     
      window.addEventListener( 'mousemove', onMouseMove, false );
>>>>>>> 979174e0733bb193497d0a843b77fa25e44fb804
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
  
    