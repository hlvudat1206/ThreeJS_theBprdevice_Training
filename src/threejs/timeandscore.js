import React, { Component } from 'react'
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
export default class Timeandscore extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount(){
    //time
    const startMinute = 2;
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
    //Score
    let startScore = 1;
    const countup = document.getElementById('countup');
    let refreshIntervalId2 = setInterval(updateCountup, 1000);
    function updateCountup (){
      countup.innerHTML = "Score "+`${startScore}`;
      startScore ++;
    }

  }
  
  render() {
    return (
      <div className = "container-fluid bg-dark text-white">

        <div className='col-12'>
          <div className='row'>
            <div className = 'col-10' id ='countup'>

            </div>

            <div className = 'col-2' id ='countdown'>

            </div>
          </div>
        </div>
        
        
   
      </div>
    )
  }
}
