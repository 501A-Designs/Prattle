import React from 'react'

export default function GridItems(props) {
    const alignStyle = {
        display: 'grid',
        gridTemplateColumns: `${props.grid}`,
        gap: '0.5em'
    }
    return (
        <div style={alignStyle} className={props.className}>
            {props.children}
        </div>
    )
}
