import React from 'react'
// Icons
import { IconContext } from "react-icons";

export default function PrateTypeButton(props) {
    let iconHolder = {
        borderRadius:'calc(var(--borderRadius)*20)',
        padding:'0.7em',
        backgroundColor:'var(--baseColor2)',
        border: 'var(--baseBorder2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };
    return (
        <button
            className={`prateTypeButton ${props.className}`}
            onClick={props.click}
            type={props.type}
            disabled={props.disabled}
        >
            <div style={iconHolder}>
                <IconContext.Provider value={{ className: 'icons' }}>
                    {props.icon}
                </IconContext.Provider>
            </div>
            <span>{props.name}</span>
        </button>
    )
}
