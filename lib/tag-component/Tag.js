import React from 'react'
import { IconContext } from "react-icons";

export default function Tag(props) {
    let padding = '0.6em';
    let fontSize = '0.7em';
    let backgroundColor;
    let color;
    let border;
    if (props.color === 'blue'){
        backgroundColor = "#C8F4FF";
        color = "#039AC1";
        border = "1px solid #C8F4FF"
    }

    let visibilityTag = {
        backgroundColor : backgroundColor,
        color : color,
        border:border,
        borderRadius:"calc(var(--borderRadius)*1)",
        fontSize:fontSize,
        padding:'0.5em 1em',
        width: 'fit-content',
        height:'fit-content',
        whiteSpace:'noWrap',
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        gap:"5px",
        outline:"2px solid transparent",
        userSelect:"none",
    }

    return (
        <div
            style={visibilityTag}
            onClick={props.click}
        >
            <IconContext.Provider value={{ className: 'icons' }}>
                {props.icon}
            </IconContext.Provider>
            <span>{props.children ? props.children:'場所名'}</span>
        </div>
    )
}
