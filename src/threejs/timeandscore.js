import React, { Component } from 'react'
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
let minute, second;
export default class Timeandscore extends Component {
  constructor(props) {
    super(props);
    // this.updatecountTimes = this.updatecountTimes.bind(this)
  }
  
  componentDidMount(){
    //time
    const startMinute = 2;
    let time = startMinute * 60;
    const countdown = document.getElementById('countdown');

    // updateCountdown
    let refreshIntervalId = setInterval(()=>{
      // console.log('in ra offscore in cTime: ',this.props.offscoreTime)
      minute = Math.floor(time/60);
      second = time % 60;
      second = second < 10 ? '0' + second: second;
      countdown.innerHTML = "TimeLeft "+`${minute}: ${second}`;
      
      time --;
      if (time < 0 ) { //stop the setInterval when time = 0 
        clearInterval(refreshIntervalId);
    }
      if (this.props.offscoreTime === true){
        clearInterval(refreshIntervalId);
      }
      // console.log('in ra time con lai: ',minute*60 + second)
    }, 1000); //update every 1 second
    
 
    //Score
    let startScore = 1;
    const countup = document.getElementById('countup');
    let refreshIntervalId2 = setInterval(() => {
      // console.log('in ketqua nhan: ',startScore*this.props.pushscore)
      
      if (this.props.pushscore === 0) {
        countup.innerHTML = "Score "+`${startScore}`;
      } else {
        countup.innerHTML = "Score "+`${startScore*this.props.pushscore}`;
      }
      if(this.props.offscoreTime === true){
        clearInterval(refreshIntervalId2);
        const scoreSum = startScore*this.props.pushscore + (minute*60 + second)*256;
        {this.props.getscoreResult(scoreSum)}
      }
      
      startScore ++;
    }, 100);

    // function updateCountup (){
    //   countup.innerHTML = "Score "+`${startScore}*${this.props.pushscore}`;
    //   startScore ++;
    // }

    
    let coefficientTimes = 1
    const counttimes = document.getElementById('counttimes');
    console.log('in ra score: ',this.props.pushscore);

    let refreshTimes = setInterval(() =>{
      // console.log('in ra score222: ',this.props.pushscore);
      if (this.props.pushscore === 0){
        counttimes.innerHTML = "x "+`${coefficientTimes}`;
      } else{
        counttimes.innerHTML = "x "+`${this.props.pushscore}`;
      }

      if(this.props.offscoreTime === true){
        clearInterval(refreshTimes);
      }
      
    }, 1000);
    
    //user
    const username = document.getElementById('username');
    
    let refreshName = setInterval(()=>{
      username.innerHTML = "Name: "+`${this.props.pushnewuser}`;
    },1000);
  
 
    



  }
  
  render() {
    return (
      <div className = "container-fluid bg-dark text-white">

        <div className='col-12'>
          <div className='row'>
            <div className = 'col-4'>
             Copyright by Lab 202 at B4
            </div>
            <div className = 'col-2' id ='countup'>

            </div>
            <div className = 'col-4' id ='counttimes'>

            </div>
       

            <div className = 'col-2' id ='countdown'>

            </div>
          </div>
        </div>
        
        
   
      </div>
    )
  }
}
