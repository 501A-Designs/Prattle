import React from 'react'
import Button from './button-component/Button'
import GridItems from './style-component/GridItems'

export default function ToolTip(props) {
    const toolTip ={
        position: 'absolute',
        width: '200px',
        zIndex:'10',
        backgroundColor: 'var(--baseColor0)',
        border: 'var(--baseBorder2)',
        borderRadius: 'calc(var(--borderRadius))',
        padding: '0.5em',
        boxShadow: 'var(--boxShadow)',
    }
    return (
        <div style={toolTip}>
            {props.title && <h5 style={{margin:'0.8em 0'}}>{props.title}</h5>}
            <GridItems>
                {props.children}
            </GridItems>
        </div>
    )
}
