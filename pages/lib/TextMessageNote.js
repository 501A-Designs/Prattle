import React from 'react'
import { IconContext } from "react-icons";
import { VscComment } from "react-icons/vsc";

export default function TextMessageNote(props) {
    return (
        <div className="note">
            <section>
                <IconContext.Provider value={{ className: 'icons' }}>
                    <VscComment />
                </IconContext.Provider>
                {props.whoSaid}
            </section>
            <span>Room: {props.room}</span>
            <p>{props.message}</p>
        </div>
    )
}
