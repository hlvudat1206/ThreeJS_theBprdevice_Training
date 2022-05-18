import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import Popup from 'reactjs-popup';
export default class Login extends Component {
  render() {
    return (
        // <Popup trigger={<button> Trigger</button>} position="right center">
      <div>
    <form action="/api/users/login" method="post">
        <div className="container">
         
            <label htmlFor="username">
            <b>Username</b>
            </label>
            <input
            type="text"
            placeholder="Enter Username"
            name="username"
            required=""
            />
            <label htmlFor="password">
            <b>Password</b>
            </label>
            <input
            type="text"
            placeholder="Enter Password"
            name="password"
            required=""
            />
            <button type="submit">login</button>
            
        </div>
        </form>



      </div>
    //   </Popup>
    )
  }
}
