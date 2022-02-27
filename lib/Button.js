import React from 'react'
// Icons
import { IconContext } from "react-icons";

export default function Button(props) {
    let padding, fontSize, width, boxShadow;

    if (props.size === undefined) {
        padding = '0.7em';
        fontSize = 'auto'
    }
    if (props.size === 'medium') {
        padding = '0.6em';
        fontSize = '0.6em';
    }
    if (props.width === 'fit') {
        width = 'fit-content';
    }
    if (props.boxShadow === true){
        boxShadow = 'var(--boxShadow)';
    }

    let standardButton = {
        backgroundColor:"var(--baseColor0)",borderRadius:"5px",
        border:"var(--baseBorder2)",
        color:"var(--txtColor0)",
        fontSize:fontSize,
        padding:`${padding} 1em`,
        width:width,
        height:'fit-content',
        whiteSpace:'noWrap',
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        gap:"5px",
        cursor:"pointer",
        outline:"2px solid transparent",userSelect:"none",
        transition:"0.3s",
        boxShadow:boxShadow
    }

    return (
        <button
            className="iconButton"
            style={standardButton}
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
