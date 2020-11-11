import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
    Link,
} from "react-router-dom";
import './App.css';
import Login from './Login.js'
import SignUp from './SignUp.js'
import Home from './Home.js'
import Plants from './Plants.js'

export default class App extends Component {
  state = {
    username: localStorage.getItem('USERNAME') || '',
    token: localStorage.getItem('TOKEN') || '',
  }

  changeTokenAndUsername = (booger1, booger2) => {
    localStorage.setItem('TOKEN', booger2);
    localStorage.setItem('USERNAME', booger1);

    this.setState({
      username: booger1,
      token: booger2
    })
  }

  render() {
    return (
      <div>
        <Router>
          <ul>
            { this.state.username}
            <Link to="/login"><div>log in</div></Link>
            <Link to="/signup"><div>sign up</div></Link>
          </ul>
          <Switch>
            <Route exact path='/' render={(routerProps) => <Home {...routerProps} />} />
            <Route exact path='/login' render={(routerProps) => <Login {...routerProps} />} />
            <Route 
              exact 
              path='/signup' 
              render={(routerProps) => 
                <SignUp  
                  {...routerProps} 
                  changeTokenAndUsername={this.changeTokenAndUsername} 
                  />
                } 
              />
            <Route exact path='/plants' render={(routerProps) => <Plants {...routerProps} token={this.state.token} />} />

          </Switch>
        </Router>
      </div>
    )
  }
}