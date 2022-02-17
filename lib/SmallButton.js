import React from 'react'
// Icons
import { IconContext } from "react-icons";

export default function SmallButton(props) {
    return (
        <button
            className="iconButton"
            onClick={props.click}
            disabled={props.disabled}
            title={props.title}
        >
            <IconContext.Provider value={{ className: 'icons' }}>
                {props.icon}
            </IconContext.Provider>
        </button>
    )
}
