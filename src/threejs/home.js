import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
export default class Home extends Component {
  render() {
    return (
      <div>
        oke oke lala
     
        <ul>
          <li>
            <Link to="/home">Statistic score</Link>
          </li>
          <li>
            <Link to="/training">entering the training software</Link>
          </li>
          <li>
            <Link to="/objectcustom">Object setting</Link>
          </li>
        </ul>
      </div>
    )
  }
}
