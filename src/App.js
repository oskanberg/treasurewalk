import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import { withWobble } from "react-motions";
import Detector from './Detector';

const puzzles = {
    "fat-slice-freight": {
        question: ["Identify the food (Lottie will give it to you)"],
        answer: "jellyfish",
        location: {
            lat: 50.995056,
            lon: -0.7710286
        }
    },
    "sin-vote-meal": {
        question: ["What was the most popular baby name in the UK when you were born?"],
        answer: "Thomas",
        location: {
            lat: 51.000463,
            lon: -0.632216
        }
    },
    "child-rain-dough": {
        question: ["OVER ___ DOG", "Find the word that can come after OVER, and before DOG", "e.g. the word SCREEN can be added to both WIDE and SAVER to make WIDESCREEN and SCREENSAVER"],
        answer: "LAP",
        location: {
            lat: 50.996788,
            lon: -0.631533
        }
    },
    "tin-beam-split": {
        question: ["Kvass is a beverage fermented from what?"],
        answer: "rye bread",
        location: {
            lat: 50.996140,
            lon: -0.634005
        }
    },
    "crouch-glass-clerk": {
        question: ["MOCKS YELLS can be found at the end of any decent walk."],
        answer: "smelly socks",
        location: {
            lat: 51.001249,
            lon: -0.636593
        }
    },
    "judge-rank-steel": {
        question: ["If a hen and a half lays an egg and a half, every day and a half, how many eggs do half a dozen hens, lay in half a dozen days?"],
        answer: "24",
        location: {
            lat: 50.989687,
            lon: -0.629819
        }
    }
};

const Puzzle = ({ match, className }) => {
    let [guess, setGuess] = useState("");
    let [wobble, setWobble] = useState(false);
    let p = puzzles[match.params.test];
    if (!p) {
        return <p>sorry that's not a puzzle</p>;
    }

    const checkGuess = e => {
        e.preventDefault();
        let t = p.answer.toLowerCase().replace(/\s/g, '');
        let g = guess.toLowerCase().replace(/\s/g, '');
        if (t === g) {
            const url = `https://maps.google.com/maps?&z=15&mrt=yp&t=k&q=${p.location.lat},${p.location.lon}`;
            console.log("opening", url);
            window.open(url);
        } else {
            setGuess("");
            setWobble(true);
            setTimeout(() => setWobble(false), 1000);
        }
    };
    let qText = p.question.map((q, i) => (<h1 key={i}>{q}</h1>));
    let c = (
        <form className={className} onSubmit={checkGuess}>
            {qText}
            <input type="text" value={guess} onChange={e => setGuess(e.target.value)} autoFocus />
            <input type="submit" value="check" />
        </form>
    );
    return (wobble ? withWobble(c) : c);

};

const StyledPuzzle = styled(Puzzle)`
    h1 {
        font-size: 3em;
        margin-top: 0;
    }
    input[type="text"] {
        width: 100%;
        border: 1px solid #ffeb3a;
        background: transparent;
        text-align: center;
        border-radius: 2px;
        line-height: 2em;
    }
    input[type="submit"] {
        border: 1px solid #ffeb3a;
        margin: 1em;
        background-color: transparent;
        border-radius: 2px;
        padding: 0.5em 1em;
        color: #ffeb3a;
        font-weight: bold;
    }
    padding: 1em;
    margin: 1em auto;
    max-width: 40em;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Page = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`;

class App extends Component {
    render() {
        return (
            <Router>
                <Page>
                    <Route path="/" exact component={() => <Detector puzzles={puzzles}/>} />
                    <Route path="/p/:test" component={StyledPuzzle} />
                </Page>
            </Router>
        );
    }
} export default App;
