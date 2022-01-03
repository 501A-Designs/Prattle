import React, { useEffect } from 'react'
// Icons
import { IconContext } from "react-icons";
import { VscCircleLargeFilled, VscActivateBreakpoints, VscBookmark } from "react-icons/vsc";
import { useRouter } from "next/router";
import { useAppContext } from './AppContext';

export default function ContactsChip(props) {
    const router = useRouter();
    const { currentRoom, setCurrentRoom } = useAppContext();
    useEffect(() => {
        if (currentRoom != undefined) {
            router.push(`/chats/${currentRoom}`)
        }
    }, [currentRoom])

    return (
        <button
            className="contactsChip"
            onClick={() => {
                setCurrentRoom(props.currentRoom);
                console.log(currentRoom)
            }}
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
