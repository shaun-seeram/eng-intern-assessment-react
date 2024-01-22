import React, { useEffect, useRef, useState } from 'react'
import StopWatchButton from './StopWatchButton';
import LapsContainer from './LapsContainer';

export default function StopWatch() {

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
        <>
            <div className='stopwatchUpper'>
                <div className='stopwatchTime'>{formatTime(time)}</div>
                <div className='stopwatchButtonContainer'>
                    { timerActive ? 
                        <StopWatchButton onClick={handleLapTimer} classes="">Lap</StopWatchButton> : 
                        <StopWatchButton onClick={handleResetTimer} classes="">Reset</StopWatchButton>
                    }

                    { timerActive ? 
                        <StopWatchButton onClick={handlePauseTimer} classes="stop">Pause</StopWatchButton> : 
                        <StopWatchButton onClick={handleStartTimer} classes="start">Start</StopWatchButton>
                    }
                </div>
            </div>


            <LapsContainer laps={laps} formatTime={formatTime} />
        </>
    )
}