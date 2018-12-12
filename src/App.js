import React, { Component } from 'react';
import './App.css';

import PageHome from './pages/home/home'
import PageNotFound from './pages/notfound/'
import PageAboutMe from './pages/aboutme/'
import PageArticleManager from './pages/article-manager/index'

import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route } from 'react-router'

import NavBar from './components/navbar'
import {makeRequest} from './services/fetch'

class App extends Component {
  state = {
    userAuth:false,
  }

  attemptLogin = async (body) => {
    await makeRequest('login/', 'POST', body) 
      .then(resp=>resp.json())
      .then(val=>this.setState({userAuth:val.msg.Auth}))
      .catch(err=>console.log(err))
  }

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <header>
          <NavBar loginFunc={this.attemptLogin} isAuth={this.state.userAuth}/>
        </header>
          
        <section>
          <Switch>
            <Route exact path="/" component={PageHome}/>
            <Route path="/articlemanager" component={PageArticleManager} />
            <Route path="/about" component={PageAboutMe}/>
            <Route component={PageNotFound}/>
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
