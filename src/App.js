import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Invoices from './modules/Invoices/Invoices.component.js'

class App extends Component {
    render() {
        return (
            <Router>
                <Route path="/" exact component={Invoices} />
            </Router>

        );
    }
}

export default connect(null,{})(App);
