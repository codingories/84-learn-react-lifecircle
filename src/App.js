import React from 'react'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      n: 1
    }
  }
  onClick = ()=>{
    this.setState(state=>({
      n: state.n + 1
    }))
    this.setState(state=>({
      n: state.n - 1
    }))
  }
  shouldComponentUpdate(newProps, newState) {
    if(newState.n === this.state.n){ // 如果新的state的n和当前state的n相等，则不变
      return false
    } else {
      return true
    }
  }

  render(){
    console.log('render了一次')
    return (
      <div>App
        <div>
          {this.state.n} <button onClick={this.onClick}>+1</button>
        </div>

      </div>
    )
  }
}

export default App;
