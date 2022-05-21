import React, { Component } from 'react'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
export default class Toprank extends Component {
  render() {
    return (
      <div >
        
       
        <div className="card-deck" >
          <img className="card-img-top" src={this.props.image} alt="" />
          <div className="card-body">
            <h5 className="card-title text-center">{this.props.name}</h5>
          
            <p className="card-text text-center">{this.props.score}</p>
            <h2 class="card-subtitle text-center">Rank {this.props.key2}</h2>        
          </div>
          </div>
   
      
    </div>



      
          
 
    )
  }
}
