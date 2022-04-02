import React from 'react'

export default function Card(props) {
    let card ={
        padding: '1rem',
        margin: '1.5rem',
    }
    if (props.bottomBorder === true) {
        card = {
            padding: '1rem',
            margin: '1.5rem',
            borderBottom: 'var(--baseBorder2)',
        }
    }
    return (
        <div ref={props.ref} style={card}>
            <h3 style={{marginTop: 0}}>{props.name}</h3>
            <p>{props.content}</p>
            {props.children}
        </div>
    )
}
