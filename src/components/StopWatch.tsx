import React, { useEffect, useRef, useState } from 'react'
import StopWatchButton from './StopWatchButton';

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
            <div>{formatTime(time)}</div>

            <div>
                { timerActive ? 
                    <StopWatchButton onClick={handlePauseTimer}>Pause</StopWatchButton> : 
                    <StopWatchButton onClick={handleStartTimer}>Start</StopWatchButton>
                }

                { timerActive ? 
                    <StopWatchButton onClick={handleLapTimer}>Lap</StopWatchButton> : 
                    <StopWatchButton onClick={handleResetTimer}>Reset</StopWatchButton>
                }
            </div>

            <div>
                {laps.map((lap, i) => {

                    if (laps.length === 0 || ( i > 0 && laps[i] === laps[i - 1]) || lap === 0) {
                        return 
                    }

                    return (
                        <p key={i}>Lap {i+1}: {formatTime(i > 0 ? laps[i] - laps[i - 1] : lap)}</p>
                    )
                })}
            </div>
        </>
    )
}