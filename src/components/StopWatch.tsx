import React, { useRef, useState } from 'react'
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {

    const [timerActive, setTimerActive] = useState(false);
    const [time, setTime] = useState(0);
    const [laps, setLaps] = useState([]);
    const timerRef = useRef(null);

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
        setLaps((oldLapsArray) => {
            return (
                [...oldLapsArray, time]
            )
        })
    }

    function formatTime(time: number) {
        const ms = Math.floor((time % 1000) / 10).toLocaleString('en-US', {minimumIntegerDigits: 2});
        const s = Math.floor((time / 1000) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2});
        const m = Math.floor((time / 1000 / 60) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2});
        const h = Math.floor((time / 1000 / 60 / 60) % 24).toLocaleString('en-US', {minimumIntegerDigits: 2});

        return `${h}:${m}:${s}:${ms}`
    }

    return(
        <>
            <div>
                {formatTime(time)}
            </div>

            <div>
                { timerActive ? 
                <StopWatchButton onClick={handlePauseTimer}>
                    Pause
                </StopWatchButton> : 
                <StopWatchButton onClick={handleStartTimer}>
                    Start
                </StopWatchButton>
                }

                <StopWatchButton onClick={handleLapTimer}>
                    Lap
                </StopWatchButton>

                <StopWatchButton onClick={handleResetTimer}>
                    Reset
                </StopWatchButton>
            </div>

            <div>
                {laps.map((lap, i) => {

                    if (laps.length === 0 || ( i > 0 && laps[i] === laps[i - 1]) || lap === 0) {
                        return 
                    }

                    return (
                        <p key={i}>{formatTime(i > 0 ? laps[i] - laps[i - 1] : lap)}</p>
                    )
                })}
            </div>
        </>
    )
}