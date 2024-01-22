import React from 'react'

export default function LapsContainer({laps, formatTime}: {laps: Array<number>, formatTime: Function}) {

    const lapNodeArray = laps.map((lap, i) => {

        if (laps.length === 0 || (i > 0 && laps[i] === laps[i - 1]) || lap === 0) {
            return
        }

        return (
            <li key={i}><span>Lap {i + 1}</span> <span>{formatTime(i > 0 ? laps[i] - laps[i - 1] : lap)}</span></li>
        )
    })

    return (
        <div className='stopwatchLower'>
            <ul>
                {lapNodeArray.reverse()}
            </ul>
        </div>
    )
}