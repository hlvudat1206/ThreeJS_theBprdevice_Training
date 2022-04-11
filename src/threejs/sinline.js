import {Curve} from 'three';

import * as THREE from "three";

export default class CustomSinCurve extends Curve {

	constructor( scale = 1 ) {

		super();

		this.scale = scale;

	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {
	
		
		const tx = t*10;
		// const ty = Math.sin(  Math.PI  );
		const ty = 0;

		const tz = 0;
	
		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );

	}

}