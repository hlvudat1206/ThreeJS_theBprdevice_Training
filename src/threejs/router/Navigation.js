import React, { Component } from 'react'
import {
  Link
} from "react-router-dom";
const Navigation= () => {
    return (

      <div>
        <ul>
          <li>
            <Link to="/">Statistic score</Link>

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

  export default Navigation;