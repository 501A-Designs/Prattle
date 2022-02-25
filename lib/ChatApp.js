import router from 'next/router';
import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import Image from 'next/image';
import RoomThumbNail from './RoomThumbNail';
import { VscSignOut, VscLock, VscComment, VscCommentDiscussion, VscActivateBreakpoints,VscClose } from "react-icons/vsc";

// import ContactsChip from './ContactsChip';
import shedliveLogo from '../public/shedlivelogo.png'
import GridItems from './style-component/GridItems';
import ProfileInfo from './ProfileInfo';
import Button from './Button';
import { useRouter } from "next/router";

export default function ChatApp() {
    const user = supabase.auth.user();
    const router = useRouter();

    const [groupsArray, setGroupsArray] = useState();
    const fetchRoomInfo = async () => {
        let { data: rooms, error } = await supabase
            .from('rooms')
            .select('*')
            .eq('room_creator', user.id)
            .order('id', { ascending: false });
        setGroupsArray(rooms);
        console.log(rooms);
    }

    useEffect(() => {
        fetchRoomInfo();
    }, [])

    const signout = async () => {
        await supabase.auth.signOut()
        router.push("/signin");
    }

    return (
        <>
            <h1>Dashboard</h1>
            <ProfileInfo profileId={user.id}/>
            <GridItems grid={'4fr 1fr 1fr'}>
                <p>
                    Welcome to Prattle, you are authenticated.
                    <br />
                    Now that you are in you can create or view existing rooms!
                </p>
                <Button
                    icon={<VscComment/>}
                    click={()=> router.push('/rooms')}
                    name="Create New"
                />
                <Button
                    click={signout}
                    icon={<VscSignOut />}
                    name="Sign Out"
                />
            </GridItems>
            <div>
                <h4>Groups you made:</h4>
                <GridItems grid={'1fr 1fr'}>
                    {groupsArray &&
                        <>
                            {groupsArray.length !== 0 ? groupsArray.map((props) => {
                                return <RoomThumbNail
                                        key={props.room_name}
                                        backgroundImage={props.background_image}
                                        roomName={props.room_name}
                                        roomCode={props.room_id}
                                    />
                            }) :
                                <p>
                                    You have not created a room yet.
                                </p>
                            }   
                        </>
                    }
                </GridItems>
            </div>
        </>
    )
}