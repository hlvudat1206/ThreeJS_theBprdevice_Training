import React, { Component } from 'react';
// import * as THREE from 'https://unpkg.com/three/build/three.module.js';
// import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from "three";
import MouseMeshInteraction from "./mousemes_interact";
// import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Draughts } from './draughts';
 

export default class Testhover2 extends Component {
    constructor(props, context) {
        super(props, context);
        
    }
    componentDidMount(){
        let scene, camera, renderer, cube, controls, draughts, board, mouse, raycaster, selectedPiece = null;

    draughts = new Draughts();
 
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    mouse = new THREE.Vector2();
    raycaster = new THREE.Raycaster();
    
    const square = new THREE.BoxGeometry(1, 0.1, 1);
    const lightsquare = new THREE.MeshBasicMaterial( { color: 0xE0C4A8 } );
    const darksquare = new THREE.MeshBasicMaterial( { color: 0x6A4236 });
    
    board = new THREE.Group();
    
    let squareNumber = 1;
    for (let x = 0; x < 10; x++) {
        for (let z = 0; z < 10; z++) {
        let cube;
        if (z % 2 == 0) {
            cube = new THREE.Mesh(square, x % 2 == 0 ? lightsquare : darksquare);
            if (x % 2 != 0) {
            cube.userData.squareNumber = squareNumber;
            squareNumber++;
            }
        } else {
            cube = new THREE.Mesh(square, x % 2 == 0 ? darksquare : lightsquare);
            if (x % 2 == 0) {
            cube.userData.squareNumber = squareNumber;
            squareNumber++;
            }
        }
    
        cube.position.set(x, 0, z);
        board.add(cube);
        }
    }
    
    scene.add(board);
    
    const loader = new GLTFLoader();
    loader.load('./huyetap20.glb', function (gltf) {
        // console.log('in ra: ',gltf,scene.children)
        const checkerMesh = gltf.scene.children.find((child) => child.name = "Vert001");
        checkerMesh.scale.set(checkerMesh.scale.x * 0.4, checkerMesh.scale.y * 0.4, checkerMesh.scale.z * 0.4);
        checkerMesh.position.y += checkerMesh.scale.y;
        addCheckers(checkerMesh);
    });
    
    const light = new THREE.PointLight(0xffffff, 2, 200);
    light.position.set(4.5, 10, 4.5);
    scene.add(light);
    
    camera.position.y = 1;
    camera.position.z = 3;
    
    controls = new OrbitControls(camera, renderer.domElement);
    
    controls.target.set(4.5, 0, 4.5);
    
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2;
    
    controls.enableDamping = true;
    
    window.requestAnimationFrame(animate);

    
    function positionForSquare(square) {
        const found = board.children.find((child) => child.userData.squareNumber == square);
        if (found) 
            return found.position;
        return null;
    }

    function addCheckers(checkerMesh) {
    for (let i = 0; i < 51; i++) {
        let pieceOn = draughts.get(i);
        const piece = checkerMesh.clone(true);
        const squarePosition = positionForSquare(i);

        if (pieceOn === 'b') {
        piece.material = new THREE.MeshStandardMaterial({ color: 0x222222 });
        piece.userData.color = 'b';
        piece.userData.currentSquare = i;
        piece.position.set(squarePosition.x, piece.position.y, squarePosition.z);
        scene.add(piece);
        } else if (pieceOn === 'w') {
        piece.material = new THREE.MeshStandardMaterial({ color: 0xEEEEEE });
        piece.userData.color = 'w';
        piece.userData.currentSquare = i;
        piece.position.set(squarePosition.x, piece.position.y, squarePosition.z);
        scene.add(piece);
        }
    }
    }

    function resetMaterials() {
    for (let i = 0; i < scene.children.length; i++) {
        if (scene.children[i].material) {
        scene.children[i].material.opacity = scene.children[i].userData.currentSquare == selectedPiece ? 0.5 : 1.0;
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

    function animate() {
    controls.update();
    resetMaterials();
    hoverPieces();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
    }

    function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function onMouseMove( event ) {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    }

    function onClick(event) {
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        selectedPiece = intersects[0].object.userData.currentSquare;
        return;
    }

    if (selectedPiece) {
        raycaster.setFromCamera(mouse, camera);
        intersects = raycaster.intersectObjects(board.children);

        if (intersects.length > 0 && intersects[0].object.userData.squareNumber) {
        const targetSquare = intersects[0].object.userData.squareNumber;
        const selectedObject = scene.children.find((child) => child.userData.currentSquare == selectedPiece);
        if (!selectedObject || !targetSquare) return;

        const targetPosition = positionForSquare(targetSquare);
        selectedObject.position.set(targetPosition.x, selectedObject.position.y, targetPosition.z);
        selectedObject.currentSquare = targetSquare;

        selectedPiece = null;
        }
    }
    }


    window.addEventListener('resize', onWindowResize);
    window.addEventListener('click', onClick);
    window.addEventListener( 'mousemove', onMouseMove, true );

    }

  render() {
    return <div></div>;
  }
}
