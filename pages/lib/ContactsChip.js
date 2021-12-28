import React from 'react'
// Icons
import { IconContext } from "react-icons";
import { VscCircleLargeFilled, VscActivateBreakpoints, VscBookmark } from "react-icons/vsc";

export default function ContactsChip(props) {
    return (
        <button
            className="contactsChip"
            onClick={props.click}
            key={props.key}
        >
            <IconContext.Provider value={{ className: 'icons' }}>
                {props.type === 'newChange' && <VscCircleLargeFilled />}
                {props.type === 'standard' && <VscActivateBreakpoints />}
                {props.type === 'important' && <VscBookmark />}
            </IconContext.Provider>
            <div>
                <h4>{props.name}</h4>
                <p>{props.id}</p>
            </div>
        </button>
    )
}
