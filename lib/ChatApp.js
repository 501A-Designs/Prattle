import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import RoomThumbNail from './RoomThumbNail';
import { VscSignOut, VscComment } from "react-icons/vsc";

import GridItems from './style-component/GridItems';
import ProfileInfo from './ProfileInfo';
import Button from './Button';
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
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12960.940416891455!2d139.7846588!3d35.6958317!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x4ab15517a1599198!2sKaichi%20Nihonbashi%20Gakuen%20Junior%20and%20Senior%20High%20School!5e0!3m2!1sen!2sjp!4v1646395501174!5m2!1sen!2sjp"></iframe>
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