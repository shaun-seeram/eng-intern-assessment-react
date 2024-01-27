import React from 'react'

interface StopWatchButtonProps {
    children: React.ReactNode,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    classes?: string
}

export default function StopWatchButton({children, onClick, classes}: StopWatchButtonProps) {
    return(
        <button onClick={onClick} className={classes}>
            {children}
        </button>
    )
} 

// Reusable component