import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

import { supabase } from '../utils/supabaseClient'
import { useRouter } from "next/router";
import ShedButton from './lib/ShedButton';
import { VscMail, VscAccount, VscAdd, VscChevronUp, VscSignOut, VscActivateBreakpoints, VscDebugDisconnect } from "react-icons/vsc";


export default function Chat() {


    const [generateRoom, setGeneratedRoom] = useState()
    const [currentRoom, setCurrentRoom] = useState()
    const [currentRoomName, setCurrentRoomName] = useState()




    const disconnect = () => {
        supabase.unsubscribe();
        setCurrentRoom();
        setMessagesArray();
    };

    // Signout
    const router = useRouter();


    return (
        <>
            <div>
                <div className="chatContacts">
                    <ShedButton
                        disabled={!groupsArray}
                        click={disconnect}
                        icon={<VscDebugDisconnect />}
                        name="Disconnect from group"
                    />
                    {groupsArray ? groupsArray.map((props) => {
                        return <ContactsChip
                            key={props.room_name}
                            click={() => {
                                setCurrentRoom(props.room_id);
                                setCurrentRoomName(props.room_name)
                            }}
                            type={'standard'}
                            name={props.room_name}
                            id={props.room_id}
                        />
                    }) :
                        <p>
                            You are not in any groups.
                            <br />
                            <br />
                            (You can go ahead and create one and invite your friends and family, or join an existing one).
                        </p>
                    }
                </div>
            </div>
        </>
    )
}
