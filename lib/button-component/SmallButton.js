import React from 'react'
// Icons
import { IconContext } from "react-icons";

export default function SmallButton(props) {
    let position;
    if (props.right===true) {        
        position = {
            position: 'absolute',
            top: '1em',
            right: '1em',
        }
    }
    return (
        <button
            key={props.key}
            style={position}
            className="iconSmallButton"
            onClick={props.click}
            disabled={props.disabled}
            title={props.title}
        >
            <IconContext.Provider value={{ className: 'icons' }}>
                {props.icon}
            </IconContext.Provider>
            {props.name && <span style={{fontSize:'0.8em', padding: '0em 0.5em'}}>{props.name}</span>}
        </button>
    )
}
