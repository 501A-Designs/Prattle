import React from 'react'

export default function Card(props) {
    return (
        <div className="card">
            <h3>{props.name}</h3>
            <p>{props.content}</p>
        </div>
    )
}
