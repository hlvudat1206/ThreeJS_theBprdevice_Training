import React, { Component } from 'react'

export default class Toprank extends Component {
  render() {
    return (
      <div>
        {/* <div className="card" style={{width: '200px'}}>
        <img className="card-img-top" src={this.props.image} alt="Card image" />
        <div className="card-body">
          <h4 className="card-title">{this.props.name}</h4>
          <p className="card-text">{this.props.score}</p>
          <p className="card-text" ></p>

          
        </div>
      </div> */}
      <div className="card-group">
  <div className="card" style={{width: '20px'}}>
    <img className="card-img-top" src={this.props.image} alt="Card image cap" />
    <div className="card-body">
      <h5 className="card-title">{this.props.name}</h5>
      <p className="card-text">{this.props.score}</p>
      {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
    </div>
  </div>
</div>



      
          
      </div>
    )
  }
}
