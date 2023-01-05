import React from "react";
import './index.css'

class Assignment3 extends React.Component{
    constructor(){
        super()
        this.state={
            count:0
        }
    }
    increseCounter(){
        this.setState({
            count:this.state.count +1
        })
    }
    decreseCounter(){
        this.setState({
            count:this.state.count +1
        })
    }
    render(){
        console.log(this.state.count)
        return (
            <div className="countAssignment">

            <button className="input2"> Count - {this.state.count}</button>
            <br/>
            
            <button className="input" onClick={()=>this.increseCounter()}> + Increase</button>
            <label>  </label>
            <button className="input" onClick={()=>this.decreseCounter()}> - Decrease</button>
           
            </div>
        )
    }
}

export default Assignment3