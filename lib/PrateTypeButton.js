import React from 'react'
// Icons
import { IconContext } from "react-icons";

export default function PrateTypeButton(props) {
    return (
        <button
            className={`prateTypeButton ${props.className}`}
            onClick={props.click}
            type={props.type}
            disabled={props.disabled}
        >
            <IconContext.Provider value={{ className: 'icons' }}>
                {props.icon}
            </IconContext.Provider>
            <span>{props.name}</span>
        </button>
    )
}
