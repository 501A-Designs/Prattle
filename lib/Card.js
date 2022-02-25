import React from 'react'

export default function Card(props) {
    const card ={
        padding: '1rem',
        margin: '1.5rem',
        color: 'var(--baseColor5)',
        borderBottom: 'var(--baseBorder2)',
    }
    return (
        <div style={card}>
            <h3>{props.name}</h3>
            <p>{props.content}</p>
        </div>
    )
}
