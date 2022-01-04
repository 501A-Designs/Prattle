import React from 'react'

export default function EmojiButton(props) {
    return (
        <button
            className="emojiButton"
            onClick={props.click}>
            {props.emoji}
        </button>
    )
}
