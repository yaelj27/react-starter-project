import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom'
import Header from './components/Header';
import Body from './components/Body';
import Footer from "./components/Footer/Footer";
import HomePage from "./scenes/Homepage";

class App extends Component {
    render() {
        return (
            <div className="site">
                <Header/>
                <Body>
                <Switch>
                    <Route path='/' component={HomePage}/>
                </Switch>
                </Body>
                <Footer/>
            </div>
        );
    }
}


export default connect()(App);

