import React from 'react'

export default function Card(props) {
    let card ={
        padding: '1rem',
    }
    if (props.bottomBorder === true) {
        card = {
            padding: '1rem',
            borderBottom: 'var(--baseBorder2)',
        }
    }
    if (props.borderRadius) {
        card = {
            padding: '1rem',
            // backgroundColor: 'var(--baseColor1)',
            boxShadow: 'var(--boxShadow)',
            border: 'var(--baseBorder2)',
            borderRadius: props.borderRadius,
        }
    }
    return (
        <div ref={props.ref} style={card}>
            <h3>{props.name}</h3>
            <p>{props.content}</p>
            {props.children}
        </div>
    )
}
