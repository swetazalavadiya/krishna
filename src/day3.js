import React from 'react';
import './day3.css'

class Assignment1 extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      value: false,
    };
  }
  render() {
    return (
      <div className='assignment1'>
        <textarea
          data={this.state.input}
          onChange={(event) => this.setState({ input: event.target.value })}
        />
        <br />
        <button onClick={() => {this.setState({value: !this.state.value})}}>
          convert uppercase
        </button>
        {this.state.value && <p>{this.state.input.toUpperCase()}</p>}
      </div>
    )
  }
}
export default Assignment1;
