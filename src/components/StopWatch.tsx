import React from 'react'

export default function StopWatch({time}: {
    time: string
}) {

    return (
        <div className='stopwatchTime'>{time}</div>
    )
}