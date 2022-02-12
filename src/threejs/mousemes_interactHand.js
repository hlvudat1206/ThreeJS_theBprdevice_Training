import React, { Component } from 'react'

export default class MouseMeshInteractionHandler extends Component {
    constructor(mesh_name, handler_function) {
        super(mesh_name,handler_function);

		this.mesh_name = mesh_name;
		this.handler_function = handler_function;
	}
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
