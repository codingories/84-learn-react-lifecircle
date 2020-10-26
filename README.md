### componentWillReceiveProps 钩子
- 当组件接受新的props时，会触发此钩子?
- 已经被弃用，更名为UNSAFE_componentWillReceiveProps
- 尽量不要用
```javascript
import React from 'react'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {x:1}
  }

  onClick = ()=>{
    this.setState({
      x: this.state.x + 1
    })
  }

  render(){
    return (
      <div className="App">
        App <button onClick={this.onClick}>+1</button>
        <B name={this.state.x}/>
      </div>
    );
  }
}

class B extends React.Component{
  componentWillReceiveProps(newProps, nextContext) {
    console.log('props变化了') // 数值+1，打印
    console.log('旧的props')
    console.log(this.props) // {name:1}
    console.log('新的props')
    console.log(newProps) // {name:2}
  }

  render(){
    return (
      <div>{this.props.name}</div>
    )
  }
}

export default App;

```

### 读写State
- 读用this.state.xxx.yyy.zzz
- 写用this.setState(???,fn)
  - 注意setState不会立即改变this.state,会在当前代码运行完了以后，再去更新this.state,从而触发UI更新
- this.setState((state,props)=>newState,fn),这种方式的state反而更容易于理解
- fn会在写入成功后执行
- 写时会shallow merge
  - setState会自动将新state与旧state进行一级合并


### 什么是生命周期
- 类比如下代码
- let div = document.createElement('div') // 这是div的create/construct过程
- div.textContent = 'hi' // 这是初始化state
- document.body.appendChild(div) // 这是div的mount过程
- div.textContent = 'hi2' // 这是div的update过程
- div.remove() // 这是div的unmount过程


### React的生命周期
- <font color='red'>constructor()</font>
  - react组件创建的时候会调用,初始化state
- static getDerivedStateFromProps()
- <font color='red'>shouldComponentUpdate()</font>
  - 是否应该更新,return false阻止更新
- <font color='red'>render()</font>
  - 渲染,创建虚拟dom
- getSnapshotBeforeUpdate()
- <font color='red'>componentDidMount()</font>
  - 当然react挂载一个组件就会去执行一个函数,组件已经出现在页面上
- <font color='red'>componentDidUpdate()</font>
  - 当组件更新之后就会去执行这个函数,组件已经更新
- <font color='red'>componentWillUnmount()</font>
  - 组件将要死亡的时候
- static getDerivedStateFromError()
- componentDidCatch()

### constructor,可不写
- 用途
  - 初始化props
  - 初始化state,但此时不能调用setState
  - 用来写bind this
```
constructor(){
  /* 其他代码略 */
  this.onClick = this.onClick.bind(this)
}
可以用新语法代替
onClick = ()=>{}
constructor(){ /* 其他代码略 */ }
```
  
### shouldComponentUpdate
  - 返回true表示不阻止UI更新  
  - 返回false表示阻止UI更新
  - 面试常问: shouldComponentUpdate有什么用?
    - 答: 允许手动判断是否进行组件更新，我们可以根据应用场景灵活设置返回值，避免不必要更新
```javascript
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
```
### React.PureComponent代替shouldComponentUpdate
- PureComponent 会在 render 之前对比新 state 和旧 state 的每一个 key，以及新 props 和旧 props 的每一个 key。如果所有 key 的值全都一样，就不会 render；如果有任何一个 key 的值不同，就会 render。

### render
- 用于展示视图
- 只能有一个根元素
- 如果有两个根元素，就要用```<React.Fragment>```包起来
- ```<React.Fragment>```可以缩写成```<></>```

- 技巧
  - render 里面可以写if...else
  - render里面可以写?:表达式
  - render里面不能直接写for循环，需要用数组
  - render里面可以写array.map(循环)