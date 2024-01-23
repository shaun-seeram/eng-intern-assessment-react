import React from "react";
import StopWatchButton from "./StopWatchButton";

interface ButtonsContainerProps {
    timerActive: boolean,
    onStart: React.MouseEventHandler<HTMLButtonElement>,
    onPause: React.MouseEventHandler<HTMLButtonElement>,
    onLap: React.MouseEventHandler<HTMLButtonElement>,
    onReset: React.MouseEventHandler<HTMLButtonElement>
}

export default function ButtonsContainer({timerActive, onStart, onPause, onLap, onReset}: ButtonsContainerProps) {
    return (
        <div className='stopwatchButtonContainer'>
            {timerActive ?
                <StopWatchButton onClick={onLap}>Lap</StopWatchButton> :
                <StopWatchButton onClick={onReset}>Reset</StopWatchButton>
            }

            {timerActive ?
                <StopWatchButton onClick={onPause} classes="stop">Pause</StopWatchButton> :
                <StopWatchButton onClick={onStart} classes="start">Start</StopWatchButton>
            }
        </div>
    )
}

// Ternary statement to conditionally show required buttons based on state