import React, { useEffect } from 'react'
// Icons
import { IconContext } from "react-icons";
import { VscCircleLargeFilled, VscActivateBreakpoints, VscBookmark } from "react-icons/vsc";
import { useRouter } from "next/router";
import { useAppContext } from './AppContext';
import styles from '../styles/ContactsChip.module.css'

export default function ContactsChip(props) {
    const router = useRouter();
    const { currentRoom, setCurrentRoom, currentRoomName, setCurrentRoomName } = useAppContext();

    let roomId = props.id;
    let roomName = props.name;
    useEffect(() => {
        console.log(currentRoom)
        console.log(currentRoomName)
        if (currentRoom != undefined && currentRoomName != undefined) {
            router.push(`/rooms/${currentRoom}`)
        }
    }, [currentRoomName])

    return (
        <button
            className={styles.contactsChip}
            onClick={() => {
                setCurrentRoom(roomId);
                setCurrentRoomName(roomName);
            }}
            key={props.key}
        >
            <IconContext.Provider value={{ className: 'icons' }}>
                {props.type === 'newChange' && <VscCircleLargeFilled />}
                {props.type === 'standard' && <VscActivateBreakpoints />}
                {props.type === 'important' && <VscBookmark />}
            </IconContext.Provider>
            <div>
                <h4>{roomName}</h4>
                <p>{roomId}</p>
            </div>
        </button>
    )
}
