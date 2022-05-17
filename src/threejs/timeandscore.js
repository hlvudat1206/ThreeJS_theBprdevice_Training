import React, { Component } from 'react'
import "../App.css"

export default class Timeandscore extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount(){
    const startMinute = 1;
    let time = startMinute * 60;
    const countdown = document.getElementById('countdown');


    let refreshIntervalId = setInterval(updateCountdown, 1000); //update every 1 second
    
    function updateCountdown() {
      const minute = Math.floor(time/60);
      let second = time % 60;
      second = second < 10 ? '0' + second: second;
      countdown.innerHTML = "TimeLeft "+`${minute}: ${second}`;
     
      time --;
      if (time < 0) { //stop the setInterval when time = 0 
        clearInterval(refreshIntervalId);
    }
    }

  }
  
  render() {
    return (
      
      <div className='textlink' id ='countdown' >
     
      </div>
    )
  }
}
