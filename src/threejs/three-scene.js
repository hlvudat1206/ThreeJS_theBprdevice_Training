import * as THREE from "three";
import React, { Component } from 'react'
import MouseMeshInteraction from "./mousemes_interact";
// import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


let mouse, raycaster, board, selectedPiece = null, mixer, light, model, model2, renderer;
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
      // const geometry = new THREE.BoxGeometry();
      // const material = new THREE.MeshBasicMaterial( { 
      //     color: 0xff0000  ,
      //     wireframe: false});
      // const cube = new THREE.Mesh( geometry, material );
      // scene.add( cube );
      //  camera.position.z = 5;
      
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
      // const _mixers = [];
      //import glb file
      const loader2 = new GLTFLoader();
      loader2.load("./Room103.glb", function (gltf) {
        console.log('in ra:', gltf);
        console.log('in ra children22: ',gltf.scene.children[0]);
        model = gltf.scene.children[0];
        model.traverse(n => { if ( n.isMesh ) {
          n.castShadow = true; 
          n.receiveShadow = true;
          if(n.material.map) n.material.map.anisotropy = 16; 
        }});

        gltf.scene.position.set(0,0,0);
        gltf.scene.scale.set(2.8, 2.8, 2.8);

        scene.add( gltf.scene );

      })

      const loader3 = new GLTFLoader();
      loader3.load("./boyring3.glb", function (gltf) {
        
        model2 = gltf.scene.children [0];
        model2.traverse(n => { if ( n.isMesh ) {
          n.castShadow = true; 
          n.receiveShadow = true;
          if(n.material.map) n.material.map.anisotropy = 16; 
        }});

        gltf.scene.position.set(5,0,0);
        gltf.scene.scale.set(1.8, 1.8, 1.8);

        scene.add( gltf.scene );
      })

      const loader = new GLTFLoader();
      loader.load("./huyetap20.glb", function (gltf) {
        console.log('in ra:', gltf);
        console.log('in ra children: ',gltf.scene.children[6]);

        // const m = new THREE.AnimationMixer(gltf.scene);
       
        // const idle = m.clipAction(gltf.animations[0]);
        // idle.play();

        // const model = gltf.scene;
        gltf.scene.traverse( c =>{
          c.castShadow = true;
        });

        mixer = new THREE.AnimationMixer( gltf.scene );
        
        gltf.animations.forEach( ( clip ) => {
          
            mixer.clipAction( clip ).play();
          
        } );
        gltf.scene.scale.set(0.3, 0.3, 0.3);
        
        let object = gltf.scene.children[6];
            
        object.position.set(4, 6, 2);
        // object.material.transparent = true;

        // object.material.opacity = 0.1;
        scene.add( gltf.scene );
       

        
        // const intersects = raycaster.intersectObjects( scene.children);
        
        
      // initialize instance of class MouseMeshInteraction, passing threejs scene and camera
      
        mmi.addHandler('bdpressure', 'click', function(object) {
          console.log('bdpressure mesh is being clicked!');
          // object.rotation._x = 60;
          // object.rotation._onChangeCallback=true
          // object.rotation._x = 60
          // object.rotation._y = 60
          // object.rotation._z = 60
          // console.log('in xoay: ',object.rotation)




        })
      
      // const cube = gltf.scene.getObjectByName("Vert001");
      // if (
      //   cube instanceof THREE.Mesh &&
      //   cube.material instanceof THREE.MeshStandardMaterial
      // ) {
      //   scene.add(cube);
      //   cube.material.opacity = 0.1;
      //   cube.material.color.set("#0000ff");
      //   cube.material.transparent = true;
      //   cube.material.depthWrite = false;
      //   cube.material.side = THREE.FrontSide;
      // }


      //   });
        // just to test if the new features are conflicting with previously supported events
			//		(everything seems to be OK)
        mmi.addHandler('bdpressure', 'dblclick', function(object) {
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
        mmi.addHandler('bdpressure', 'contextmenu', function(object) {
          console.log('bdpressure is pressed with the right button!');
          // gltf.scene.parent.background.set(0xff0a0a);
          // gltf.scene.children[6].parent.parent.background.set(0xff0a0a);
          object.material.opacity = 0.8;



        });
			
        //Object 2
			const green_color = new THREE.Color(0x00bb00);
			const orange_color = new THREE.Color(0xffaa00);
			const red_color = new THREE.Color(0xff0a0a);
			const test_mesh_geometry = new THREE.BoxGeometry( 5, 5, 5 ); 
			const test_mesh_material = new THREE.MeshBasicMaterial( { color: green_color } );

			var test_mesh = new THREE.Mesh(test_mesh_geometry, test_mesh_material);
			test_mesh.name = 'new_features_mesh';
			test_mesh.position.set(10, 0, 10);
			scene.add(test_mesh);
					
			// mmi.addHandler('new_features_mesh', 'mouseenter', function(mesh) {
			// 	console.log('mouse is over the mesh!  ', mesh);
			// 	mesh.material.color = orange_color;
			// });
			
			// mmi.addHandler('new_features_mesh', 'mouseleave', function(mesh) {
			// 	console.log('mouse has left!  ', mesh);
			// 	mesh.material.color = green_color;
			// });
			
			// mmi.addHandler('new_features_mesh', 'mousedown', function(mesh) {
			// 	console.log('mouse button is pressing on the mesh!  ', mesh);
			// 	mesh.material.color = red_color;
			// });
			
			// mmi.addHandler('new_features_mesh', 'mouseup', function(mesh) {
			// 	console.log('mouse button is released on the mesh!  ', mesh);
			// 	mesh.material.color = orange_color;
			// });
			
			// mmi.addHandler('new_features_mesh', 'click', function(mesh) {
			// 	console.log('mouse button is clicked on the mesh!  ', mesh);
			// });

      /////////////
      } );
     // add a name to the mesh (needed for mmi to work, you can give the same name to multiple meshes)
		
      
    const controls = new OrbitControls(camera, renderer.domElement);
    function positionForSquare(square) {
        const found = board.children.find((child) => child.userData.squareNumber == square);
        if (found)
          return found.position;
        return null;
      }

  
      function animate() {
        requestAnimationFrame(animate);

        light.position.set( 
          camera.position.x + 10,
          camera.position.y + 10,
          camera.position.z + 10,
        );
  
        controls.autoRotate = false;
        controls.autoRotateSpeed = 0.0;
        // hoverPieces();

        resetMaterials();
        controls.update();
  
        renderer.render(scene, camera);

      }
  
      animate();

    function onMouseMove( event ) {
 
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
     
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
     
    }
    
     
    
      function resetMaterials() {
        for (let i = 0; i < scene.children.length; i++) {
            if (scene.children[i].material) {
            scene.children[i].material.opacity = scene.children[i].userData.currentSquare == selectedPiece ? 1.0 : 0.1;
            }
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
      
      //   }
      
      // }
      
      function render() {
				requestAnimationFrame(render);
				// update the mmi
				mmi.update();
				renderer.render(scene, camera);

        raycaster.setFromCamera( mouse, camera );

            // calculate objects intersecting the picking ray
            const intersects = raycaster.intersectObjects( scene.children );
            
            for ( let i = 0; i < intersects.length; i ++ ) {
              // console.log('movemouse ne')

              // intersects[i].object.material.color.set( 0x00bb00 );
              intersects[i].object.material.transparent = true;
              intersects[i].object.material.opacity = 0.2;

            }

            renderer.render( scene, camera );

          }

          

          window.requestAnimationFrame(render)
			
			
			render();
      
      window.addEventListener( 'mousemove', onMouseMove, false );
      // window.addEventListener('click', onClick);

      
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
  
    