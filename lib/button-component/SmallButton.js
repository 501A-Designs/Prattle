import React from 'react'
import { isMobile } from 'react-device-detect';
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


    let iconSmallButton = {
        backgroundColor: 'var(--baseColor1)',
        borderRadius: 'var(--borderRadius)',
        color: 'var(--txtColor0)',
        border: 'none',
        padding: '0.5em',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px',
        cursor: 'pointer',
        outline: '2px solid transparent',
        userSelect: 'none',
        transition: '0.3s',
    }

    return (
        <button
            key={props.key}
            style={Object.assign(iconSmallButton, position)}
            className="iconSmallButton"
            onClick={props.click}
            disabled={props.disabled}
            title={props.title}
        >
            <IconContext.Provider value={{ className: 'icons' }}>
                {props.icon}
            </IconContext.Provider>
            {props.name && <>
                {!isMobile && <span style={{fontSize:'0.8em', padding: '0em', margin:'0em'}}>{props.name}</span>}
            </>}
        </button>
    )
}
