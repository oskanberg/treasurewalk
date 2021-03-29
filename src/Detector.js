
import React, { useState, useEffect } from 'react';

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

const Detector = ({ puzzles }) => {
    const state = useGeolocation();

    return (
        <pre>
            {JSON.stringify(state, null, 2)}
        </pre>
    );
};

export default Detector;