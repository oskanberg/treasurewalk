
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import bunny from './bunny.png';
import puzzles from './puzzles.json';

const useGeolocation = () => {
    const [state, setState] = useState({
        accuracy: null,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: null,
        longitude: null,
        speed: null,
        timestamp: Date.now()
    });
    let mounted = true;
    let watchId;

    const onEvent = event => {
        if (mounted) {
            setState({
                accuracy: event.coords.accuracy,
                altitude: event.coords.altitude,
                altitudeAccuracy: event.coords.altitudeAccuracy,
                heading: event.coords.heading,
                latitude: event.coords.latitude,
                longitude: event.coords.longitude,
                speed: event.coords.speed,
                timestamp: event.timestamp
            });
        }
    };

    useEffect(
        () => {
            watchId = navigator.geolocation.watchPosition(onEvent, null, { enableHighAccuracy: true });

            return () => {
                mounted = false;
                navigator.geolocation.clearWatch(watchId);
            };
        },
        []
    );

    return state;
};

// https://stackoverflow.com/questions/639695/how-to-convert-latitude-or-longitude-to-meters
const measure = (lat1, lon1, lat2, lon2) => {
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000; // meters
};

const StyledButtons = styled.nav`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    a { font-size: 4rem; }
    cursor: pointer;
`;

const Detector = () => {
    const pos = useGeolocation();
    const [selectedPuzzle, setSelectedPuzzle] = useState(0);
    const buttons = puzzles.map((_, i) => <a style={{ color: i === selectedPuzzle ? 'rgb(255, 24, 251)' : 'blueviolet' }} key={i} onClick={() => setSelectedPuzzle(i)}>{i}</a>);

    let distance = measure(puzzles[selectedPuzzle].location.lat, puzzles[selectedPuzzle].location.lon, pos.latitude, pos.longitude);

    return (
        <div>
            <StyledButtons>{buttons}</StyledButtons>
            {
                distance - pos.accuracy < 10 ?
                    (<>
                        <Link to={`/p/${puzzles[selectedPuzzle].name}`}>
                            <p>You found it! Answer a question for the next location!</p>
                            <img src={bunny} />
                        </Link>
                    </>) :
                    (<p>{distance.toFixed(1)}(±{pos.accuracy})m away.</p>)
            }
        </div>
    );
};

export default Detector;