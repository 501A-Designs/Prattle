import React from 'react'

export default function CenterAll(props) {
    let centerAll = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }
    return (
        <div style={centerAll}>
            {props.children}
        </div>
    )
}
