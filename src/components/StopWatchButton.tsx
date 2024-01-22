import React from 'react'

export default function StopWatchButton({children, onClick, classes}: {children: React.ReactNode, onClick: React.MouseEventHandler<HTMLButtonElement>, classes: string}) {
    return(
        <button onClick={onClick} className={classes}>
            {children}
        </button>
    )
} 