import React from 'react'

export default function GridItems(props) {
    const alignStyle = {
        display: 'grid',
        gridTemplateColumns: `${props.grid}`,
        gap: `${props.gap ? props.gap : '0.5em'}`,
        width: '100%',
    }
    return (
        <div style={alignStyle} className={props.className}>
            {props.children}
        </div>
    )
}
