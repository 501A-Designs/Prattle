import React from 'react'
import styles from '../styles/ClickableCard.module.css'

export default function ClickableCard(props) {
    return (
        <a href={props.href} className={styles.clickableCard}>
            <h3>{props.name} &rarr;</h3>
            <p>{props.content}</p>
        </a>
    )
}
