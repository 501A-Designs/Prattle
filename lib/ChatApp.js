import router from 'next/router';
import React, { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Image from 'next/image'

import ContactsChip from './ContactsChip';
import { AppContextProvider } from './AppContext';
import shedliveLogo from '../public/shedlivelogo.png'

export default function ChatApp() {
    const user = supabase.auth.user();

    const [groupsArray, setGroupsArray] = useState();
    const fetchRoomInfo = async () => {
        let { data: users, error } = await supabase
            .from('users')
            .select('*')
            .eq('user_id', user.id)
            .order('id', { ascending: false });
        setGroupsArray(users);
    }
    useEffect(() => {
        fetchRoomInfo();
    }, [])

    return (
        <div>
            <AppContextProvider>
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
                    <ul>
                        <li>Username: {user.user_metadata.first_name}</li>
                        <li>Email Address: {user.email}</li>
                    </ul>
                    <p>
                        Welcome to Prattle, you are authenticated.
                        <br />
                        Now that you are in you can create or join existing rooms through <a href="rooms">here!</a>
                    </p>

                    {/* MAKE CHATS SEPERATE BY PAGE */}
                    <div className="chatContacts">
                        {/* <ShedButton
                        disabled={!groupsArray}
                        click={disconnect}
                        icon={<VscDebugDisconnect />}
                        name="Disconnect from group"
                    /> */}
                        {groupsArray ? groupsArray.map((props) => {
                            return <ContactsChip
                                key={props.room_name}
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
            </AppContextProvider>
        </div>
    )
}