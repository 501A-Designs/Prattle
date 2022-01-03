import React from 'react'

export default function ClickableCard(props) {
    return (
        <a href={props.href} className={'clickableCard'}>
            <h3>{props.name} &rarr;</h3>
            <p>{props.content}</p>
        </a>
    )
}
