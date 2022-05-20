import React, { Component } from 'react'
import {
  NavLink
} from "react-router-dom";
import '../../App.css'
export default class Navigation extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount(){
    // console.log('in ra newuser: ',this.props.pushnewuser);
    // const username = document.getElementById('username');
    
    // let refreshName = setInterval(()=>{
    //   username.innerHTML = "Name: "+`${this.props.pushnewuser}`;
    // },1000)

  }
    render() {
     
  
    return (

      <div className='buttonlink'>

            <div className='col-12'>
              <div className='row'>
                <div className='col-4'>

                </div>
                <div className='col-5 mx-auto'>
                  <NavLink exact activeClassName="active" to="/">
                  <button type="button" className="btn btn-warning">Start</button>
                  </NavLink>

                  <NavLink activeClassName="active" to="/document">
                  <button type="button" className="btn btn-success">Document</button>
                  </NavLink>

                  <NavLink activeClassName="active" to="/objectcustom">
                  <button type="button" className="btn btn-success">Setting</button>
                  </NavLink>

          
                  <NavLink activeClassName="active" to="/training">
                  <button type="button" className="btn btn-success">Practice</button>
                  </NavLink>

                  <NavLink activeClassName="active" to="/result">
                  <button type="button" className="btn btn-primary">Result</button>
                  </NavLink>
                </div>

                <div className='col-2' id ='username'>
             
                </div>
                <div className='col-1'>
                <NavLink activeClassName="active" to="/login">
                  <button type="button" className="btn btn-primary">Login</button>
                  </NavLink>
                </div>
            
         
            </div>
            </div>

            {/* <NavLink to="/test1">test1</NavLink>

            <NavLink to="/test2">test2</NavLink> */}

   

         
    </div>
    )
  }
}
