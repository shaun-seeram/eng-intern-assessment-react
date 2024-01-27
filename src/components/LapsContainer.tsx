import React from 'react'

interface LapsContainerProps {
    laps: Array<number>,
    formatTime: Function
}

// Memoized this component because it was continously being reevaluated with the change of the timer in App

export default React.memo(function LapsContainer({laps, formatTime}: LapsContainerProps) {

    const sortedArray = laps.map((lap, i) => {
        return i > 0 ? laps[i] - laps[i - 1] : lap;
    }).sort((a, b) => a - b);

    // ^^ Sorted array to find best and worst lap

    let bestBool = true;
    let worstBool = true;

    const lapNodeArray = laps.map((lap, i) => {

        let classes = "";
        const adjustedlap = i > 0 ? laps[i] - laps[i - 1] : lap;

        if (laps.length === 0 || (i > 0 && laps[i] === laps[i - 1]) || lap === 0) {
            return
        } 
        
        if (adjustedlap === sortedArray[0] && bestBool) {
            classes = "best";
            bestBool = false;
        } else if (laps.length > 1 && adjustedlap === sortedArray[sortedArray.length - 1] && worstBool) {
            classes = "worst";
            worstBool = false;
        }

        return <li key={i} className={classes}><span>Lap {i + 1}</span> <span>{formatTime(adjustedlap)}</span></li>
    }).reverse()

    // ^^ Created an array of nodes, then reversed it so the latest laps appeared first. Used bestBool and worstBool to ensure only one of each are highlighted.

    return (
        <ul>
            {lapNodeArray}
        </ul>
    )
})