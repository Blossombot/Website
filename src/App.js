import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    NavLink,
    Link,
    Route,
    Switch
} from 'react-router-dom';
import './App.css';

import SearchPage from './pages/search';
import HelpPage from './pages/help';
import AboutPage from './pages/about';
import TermsPage from './pages/terms';
import TermPage from './pages/term';
import NotFoundPage from './pages/notfound';

function App() {
    return (
        <Router>
            <div className="App">
                <nav className="App-nav">
                    <NavLink className="App-navItem" exact to="/">Search</NavLink>
                    <NavLink className="App-navItem" to="/help">Help</NavLink>
                    <NavLink className="App-navItem" to="/about">About</NavLink>
                    <NavLink className="App-navItem" to="/terms">Terms</NavLink>
                </nav>
                <header className="App-header">
                    <img src="/blossom.svg" alt="Blossom" />
                </header>
                <Switch>
                    <Route path="/" exact component={SearchPage} />
                    <Route path="/help" component={HelpPage} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/terms" component={TermsPage} />
                    <Route path="/term/:term" component={TermPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;