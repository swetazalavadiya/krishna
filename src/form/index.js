import React from "react";

class Assignment2 extends React.Component{
    constructor(){
        super()
        this.state={
            inputText:'',
            inputText2:'',
            inputText3:'',
            inputText4:'',
            inputText5:'',
            inputText6:'',
        }
    }

    handleSubmit(event){
        event.preventDefault();
        this.setState({
            showPreview:true,
        })
    }
    handleReset(event){
        event.preventDefault();
        this.setState({
            showPreview:false,
        })
    }
    changeHandler(value){
        this.setState({
            inputText:value,
        })
    }
    changeHandler2(value){
        this.setState({
            inputText2:value,
        })
    }
    changeHandler3(value){
        this.setState({
            inputText3:value,
        })
    }
    changeHandler4(value){
        this.setState({
            inputText4:value,
        })
    }
    changeHandler5(value){
        this.setState({
            inputText5:value,
        })
    }
    changeHandler6(value){
        this.setState({
            inputText6:value,
            
        })
    }

    render(){
        console.log(this.state.inputText6)
        return (
            <div className="formAssignment">
            <form onSubmit={(event)=>this.handleSubmit(event)} onReset={(event)=>this.handleReset(event)}>
            <input className="inputclass" placeholder= "firstName" type="text" value={this.state.inputText} onChange={(event)=>this.changeHandler(event.target.value)} />
            <label>  </label>
            <input className="inputclass" placeholder= "lastName" type="text" value={this.state.inputText2}onChange={(event)=>this.changeHandler2(event.target.value)} />
            <label>  </label>
            <input className="inputclass" placeholder= "gender" type="text" value={this.state.inputText3}onChange={(event)=>this.changeHandler3(event.target.value)} />
            <label>  </label>
            <input className="inputclass" placeholder= "country" type="text" value={this.state.inputText4}onChange={(event)=>this.changeHandler4(event.target.value)} />
            <br/>
            <input className="inputclass" placeholder= "email" type="text" value={this.state.inputText5}onChange={(event)=>this.changeHandler5(event.target.value)} />
            <br/>
            <input placeholder= "photo" type="file" value={this.state.inputText6}onChange={(event)=>this.changeHandler6(event.target.value)} />
            
            <button className="inputclass2" type="submit"> Submit</button>
            <label>  </label>
            <button className="inputclass2" type="reset"> Reset</button>
            </form>
            {this.state.showPreview &&(
            <div>
                <h1>Preview of Form</h1>
                <p>{this.state.inputText} {this.state.inputText2} <br/>{this.state.inputText3} {this.state.inputText4} <br/>{this.state.inputText5} <br/>{this.state.inputText6}</p>
            </div>)}
            </div>
        )
    }
}

export default Assignment2