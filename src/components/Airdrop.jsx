import React,{Component} from "react";

class Airdrop extends Component{
    
    constructor() {
        super()
        this.state = {time: {}, seconds: 20};
        this.timer= 0;
        this.startTime = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    startTimer() {
        if(this.timer == 0) {
            this.timer = setInterval(this.countDown, 1000)
        }
    }

    countDown() {
        //1. countdown one second at a time
        let seconds = this.state.seconds - 1
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds
        })
        //2. stop counting when we hit zero
        if(seconds == 0) {
            clearInterval(this.timer)
        }
    } 

    secondsToTime(secs) {
        let hours, minutes, seconds;
        hours = Math.floor(secs/(60*60))
        let remainder_1 = secs % (60*60)
        minutes = Math.floor(remainder_1 / 60)
        seconds = remainder_1 % 60
        let obj = {
            'h':hours,
            'm':minutes,
            's':seconds
        }
        return obj
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds)
        this.setState({time:timeLeftVar})
    }

    render(){
        return(
            <div style={{color:'black'}}>
                {this.state.time.m}:{this.state.time.s}
                {this.startTimer()}
            </div>
        )
    }
    
} 

export default Airdrop;