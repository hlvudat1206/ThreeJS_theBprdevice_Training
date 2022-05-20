import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import Popup from 'reactjs-popup';
import axios from 'axios';


const adduser = (username,pass,image) =>
  (axios.post('/api/users/signup',{username,pass,image})
  .then((res)=>
    
     res.data
    
))
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      pass: '',
      image:''
    }
   
  }
  isChange = (event) =>{
    let name = event.target.name;
    let value = event.target.value;
    console.log(name);
    console.log(value);
    this.setState({
      [name]: value
    })
  }
  handleClick = () => {
    console.log(JSON.stringify(this.state));
    let {username,pass,image} = this.state;
    adduser(username,pass,image).then((res)=>{
      console.log(res)
    })
  }
  render() {
    return (
        // <Popup trigger={<button> Trigger</button>} position="right center">
      <div>

        <form >
            <div className="form-group">
              <label htmlFor="username">Name</label>
              <input onChange = {(event)=> this.isChange(event)} type="text" name = "username"className="form-control" placeholder="Enter name" />
              <small id="emailHelp" className="form-text text-muted">Input Name</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input onChange = {(event)=> this.isChange(event)} type="text" name = "pass"className="form-control"  placeholder="Password" />
            </div>
            <div className="form-group">
              <label htmlFor="image">Link</label>
              <input onChange = {(event)=> this.isChange(event)} type="text" name = "image" className="form-control"  placeholder="Link" />
            </div>
          
            <button type="reset" onClick ={()=>this.handleClick()} className="btn btn-primary">Submit</button>
          </form>




      </div>
    //   </Popup>
    )
  }
}
