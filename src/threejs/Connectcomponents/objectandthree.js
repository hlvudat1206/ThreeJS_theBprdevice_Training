import React, { Component } from 'react'
import Objectcustom from '../objectcustom'
import ThreeScene from '../three-scene'
export default class Objectandthree extends Component {
    senddata = () =>{
        console.log('send successfully')
    }
  render() {
    return (
      <div>
          <ThreeScene />
          {/* <Objectcustom connect = {() =>this.senddata()}/> */}
      </div>
    )
  }
}
