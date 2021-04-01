import React, { useState } from 'react';
import styled from "styled-components";
import { withWobble } from "react-motions";
import bunny from './bunny.png';

import puzzles from './puzzles.json';
import Confetti from 'react-confetti';

const Puzzle = ({ match, className }) => {
    let [guess, setGuess] = useState("");
    let [wobble, setWobble] = useState(false);
    let [correct, setCorrect] = useState(false);

    let selectedIdx = puzzles.findIndex(puz => puz.name === match.params.test);
    if (selectedIdx === -1) {
        return <p>sorry that's not a puzzle</p>;
    }

    let url = "tada!";
    if (selectedIdx + 1 < puzzles.length) {
        let l = puzzles[selectedIdx + 1].location;
        url = `https://maps.google.com/maps?&z=15&mrt=yp&t=k&q=${l.lat},${l.lon}`;
    }

    let p = puzzles[selectedIdx];

    const checkGuess = e => {
        e.preventDefault();
        let ts = p.answer.map(ans => ans.toLowerCase().replace(/\s/g, ''));
        let g = guess.toLowerCase().replace(/\s/g, '');
        if (ts.some(ans => ans === g)) {
            setCorrect(true);
        } else {
            setGuess("");
            setWobble(true);
            setTimeout(() => setWobble(false), 1000);
        }
    };
    let qText = p.question.map((q, i) => (<h1 key={i}>{q}</h1>));
    let c = (correct ?
        (
            <div className={className}>
                <Confetti/>
                <h1>yay!</h1>
                <img src={bunny} alt="an bunny" />
                <p>here's something to ponder on the way to the next spot:</p>
                <p>{p.hint}</p>
                <a href={url} target="_blank" rel="noopener noreferrer">next location</a>
            </div>
        ) :
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
        text-align: center;
        border-radius: 2px;
        line-height: 2em;
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

export default StyledPuzzle;