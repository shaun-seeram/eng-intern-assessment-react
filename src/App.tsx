import React, { useEffect, useRef, useState } from 'react'
import LapsContainer from './components/LapsContainer';
import StopWatch from './components/StopWatch'
import ButtonsContainer from './components/ButtonsContainer';

export default function App() {

    const [timerActive, setTimerActive] = useState(false);
    const [time, setTime] = useState(0);
    const [laps, setLaps] = useState([]);
    const timerRef = useRef(null);

    // useEffect(() => {
    //     if (timerActive) {
    //         timerRef.current = setInterval(() => {
    //             setTime((oldTime) => {
    //                 return oldTime += 10
    //             })
    //         }, 10)
    //     } else {
    //         clearInterval(timerRef.current);
    //     }
    // }, [timerActive]);

    // Some code from the below functions could've also been written in a useEffect (as seen above), but I opted to leave in separate functions as I felt it was more readable, and less code. Nonetheless, I left the above to demonstrate my knowledge of useEffect.

    function handleStartTimer() {
        setTimerActive(true);
        timerRef.current = setInterval(() => {
            setTime((oldTime) => {
                return oldTime += 10
            })
        }, 10)
    }

    function handlePauseTimer() {
        setTimerActive(false);
        clearInterval(timerRef.current);
    }

    function handleResetTimer() {
        setTimerActive(false);
        clearInterval(timerRef.current);
        setTime(0)
        setLaps([])
    }

    function handleLapTimer() {
        setLaps((oldLapsArray) => [...oldLapsArray, time])
    }

    function formatTime(time: number) {
        const ms = Math.floor((time % 1000) / 10).toLocaleString('en-US', {minimumIntegerDigits: 2});
        const s = Math.floor((time / 1000) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2});
        const m = Math.floor((time / 1000 / 60) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2});
        const h = Math.floor((time / 1000 / 60 / 60) % 24).toLocaleString('en-US', {minimumIntegerDigits: 2});

        return `${h}:${m}:${s}.${ms}`
    }

    return(
        <div className='stopwatchContainer'>
            <div className='stopwatchUpper'>
                <StopWatch time={formatTime(time)} />
                <ButtonsContainer timerActive={timerActive} onStart={handleStartTimer} onPause={handlePauseTimer} onLap={handleLapTimer} onReset={handleResetTimer} />
            </div>

            <LapsContainer laps={laps} formatTime={formatTime} />
        </div>
    )
}