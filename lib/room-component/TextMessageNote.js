import React from 'react'
import { IconContext } from "react-icons";
import { VscComment } from "react-icons/vsc";
import AlignItems from '../style-component/AlignItems';

export default function TextMessageNote(props) {
    let textMessageNote ={
        userSelect: 'none',
        borderBottom: 'var(--baseBorder2)',
        minWidth: '100px',
        padding:'0.5em'
    }
    return (
        <div style={textMessageNote}>
            <AlignItems>
                <IconContext.Provider value={{ className: 'icons' }}>
                    <VscComment />
                </IconContext.Provider>
                {props.whoSaid}
            </AlignItems>
            <span style={{ fontSize: '0.8em'}}>Statement noted by: {props.setBy}</span>
            <p>{props.message}</p>
        </div>
    )
}
