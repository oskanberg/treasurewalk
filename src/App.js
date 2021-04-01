import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";

import Detector from './Detector';
import Puzzle from './Puzzle';

const Page = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    text-align: center;
`;

class App extends Component {
    render() {
        return (
            <Router>
                <Page>
                    <Route path="/" exact component={Detector} />
                    <Route path="/p/:test" component={Puzzle} />
                </Page>
            </Router>
        );
    }
}

export default App;
