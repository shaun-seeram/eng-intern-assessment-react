import React from 'react'

export default function StopWatchButton({children, onClick}: {children: React.ReactNode, onClick: React.MouseEventHandler<HTMLButtonElement>}) {
    return(
        <button onClick={onClick}>
            {children}
        </button>
    )
}