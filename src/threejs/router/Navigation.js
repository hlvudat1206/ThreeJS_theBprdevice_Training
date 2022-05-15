import React, { Component } from 'react'
import {
  NavLink
} from "react-router-dom";
import '../../App.css'
const Navigation= () => {
    return (

      <div className='buttonlink'>

     
            <NavLink exact activeClassName="active" to="/">
            <button type="button" class="btn btn-warning">Start</button>
            </NavLink>

            <NavLink activeClassName="active" to="/document">
            <button type="button" class="btn btn-success">Document</button>
            </NavLink>

            <NavLink activeClassName="active" to="/objectcustom">
            <button type="button" class="btn btn-success">Setting</button>
            </NavLink>

     
            <NavLink activeClassName="active" to="/training">
            <button type="button" class="btn btn-success">Practice</button>
            </NavLink>

            <NavLink activeClassName="active" to="/result">
            <button type="button" class="btn btn-primary">Result</button>
            </NavLink>



            {/* <NavLink to="/test1">test1</NavLink>

            <NavLink to="/test2">test2</NavLink> */}

   

         
    </div>
    )
  }

  export default Navigation;