import React from 'react'

export default function AlignItems(props) {
    const alignStyle = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: '0.5em'
    }
    return (
        <div style={alignStyle} className={props.className}>
            {props.children}
        </div>
    )
}
