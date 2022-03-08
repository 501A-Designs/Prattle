import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import RoomThumbNail from './RoomThumbNail';
import { VscSignOut, VscComment } from "react-icons/vsc";

import GridItems from './style-component/GridItems';
import ProfileInfo from './ProfileInfo';
import Button from './button-component/Button';
import { useRouter } from "next/router";
import { BrowserView, MobileView } from 'react-device-detect';

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
            <GridItems grid={MobileView ? '1fr' : '4fr 1fr 1fr'}>
                <p>
                    ようこそ、ログインされております。
                    <br />
                    新しく部屋を作成したり、他の人がどういるかを確認しよう！
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
                <h4>Groups Made By You:</h4>
                <GridItems grid={MobileView ? '1fr' : '1fr 1fr'}>
                    {groupsArray &&
                        <>
                            {groupsArray.length !== 0 ? groupsArray.map((props) => {
                                return <RoomThumbNail
                                        key={props.room_name}
                                        backgroundImage={props.background_image}
                                        roomName={props.room_name}
                                        roomCode={props.room_id}
                                        description={props.description}
                                        removeVisibilityTag={true}
                                    />
                            }) :
                                <p>
                                    部屋が作成されていません
                                </p>
                            }   
                        </>
                    }
                </GridItems>
            </div>
        </>
    )
}