import {Curve} from 'three';

import * as THREE from "three";

export default class CustomSinCurve extends Curve {

	constructor( scale = 1 ) {

		super();

		this.scale = scale;

	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {
		
		// const t = tx*50;
		// const ty = Math.sin(  Math.PI  );
		// const ty = Math.sin(2*Math.PI*tx);

		// const tz = 0;
		t = 2 * Math.PI * t;

		const x = - 0.22 * Math.cos( t ) - 1.28 * Math.sin( t ) - 0.44 * Math.cos( 3 * t ) - 0.78 * Math.sin( 3 * t );
		const y = - 0.1 * Math.cos( 2 * t ) - 0.27 * Math.sin( 2 * t ) + 0.38 * Math.cos( 4 * t ) + 0.46 * Math.sin( 4 * t );
		const z = 0.7 * Math.cos( 3 * t ) - 0.4 * Math.sin( 3 * t );
	
		// return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
		return optionalTarget.set( x, y, z ).multiplyScalar( this.scale );


	}

}