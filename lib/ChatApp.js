import router from 'next/router';
import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import Image from 'next/image';
import RoomThumbNail from './RoomThumbNail';

// import ContactsChip from './ContactsChip';
import shedliveLogo from '../public/shedlivelogo.png'
import GridItems from './style-component/GridItems';

export default function ChatApp() {
    const user = supabase.auth.user();

    const [groupsArray, setGroupsArray] = useState();
    const fetchRoomInfo = async () => {
        let { data: rooms, error } = await supabase
            .from('rooms')
            .select('*')
            .eq('room_creator', user.id)
            .order('id', { ascending: false });
        setGroupsArray(rooms);
    }

    useEffect(() => {
        fetchRoomInfo();
    }, [])

    return (
        <>
            <header>
                <Image
                    src={shedliveLogo}
                    width={40}
                    height={40}
                />
                <h3>Prattle</h3>
            </header>
            {/* style={{ color: 'var(--shedPurple)' }}  */}
            <h1 className="gradientText">Hi, {user.user_metadata.first_name}</h1>
            <div>
                <p>
                    Welcome to Prattle, you are authenticated.
                    <br />
                    Now that you are in you can create or join existing rooms through <a href="rooms">here!</a>
                </p>
                <h4>Groups you made:</h4>
                {/* MAKE CHATS SEPERATE BY PAGE */}
                <GridItems grid={'1fr 1fr'}>
                    {groupsArray ? groupsArray.map((props) => {
                        return <RoomThumbNail
                                key={props.room_name}
                                backgroundImage={props.background_image}
                                roomName={props.room_name}
                                roomCode={props.room_id}
                            />
                    }) :
                        <p>
                            You are not in any groups.
                            <br />
                            <br />
                            (You can go ahead and create one and invite your friends and family, or join an existing one).
                        </p>
                    }
                </GridItems>
            </div>
        </>
    )
}