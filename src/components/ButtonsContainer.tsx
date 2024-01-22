import React from "react";
import StopWatchButton from "./StopWatchButton";

export default function ButtonsContainer({timerActive, onStart, onPause, onLap, onReset}: {timerActive: boolean, onStart: React.MouseEventHandler<HTMLButtonElement>, onPause: React.MouseEventHandler<HTMLButtonElement>, onLap: React.MouseEventHandler<HTMLButtonElement>, onReset: React.MouseEventHandler<HTMLButtonElement>}) {

    return (
        <div className='stopwatchButtonContainer'>
            {timerActive ?
                <StopWatchButton onClick={onLap} classes="">Lap</StopWatchButton> :
                <StopWatchButton onClick={onReset} classes="">Reset</StopWatchButton>
            }

            {timerActive ?
                <StopWatchButton onClick={onPause} classes="stop">Pause</StopWatchButton> :
                <StopWatchButton onClick={onStart} classes="start">Start</StopWatchButton>
            }
        </div>
    )
}