import React from 'react'

export default React.memo(function LapsContainer({laps, formatTime}: {laps: Array<number>, formatTime: Function}) {

    const sortedArray = laps.map((lap, i) => {
        if (i > 0) {
            return laps[i] - laps[i-1]
        }
        return lap
    }).sort((a, b) => a - b);

    const lapNodeArray = laps.map((lap, i) => {

        let classes = "";
        const adjustedlap = i > 0 ? laps[i] - laps[i - 1] : lap;

        if (laps.length === 0 || (i > 0 && laps[i] === laps[i - 1]) || lap === 0) {
            return
        } 
        
        if (adjustedlap === sortedArray[0]) {
            classes = "best"
        } else if (laps.length > 1 && adjustedlap === sortedArray[sortedArray.length - 1]) {
            classes = "worst"
        }

        return <li key={i} className={classes}><span>Lap {i + 1}</span> <span>{formatTime(adjustedlap)}</span></li>
    }).reverse()

    return (
        <div className='stopwatchLower'>
            <ul>
                {lapNodeArray}
            </ul>
        </div>
    )
})