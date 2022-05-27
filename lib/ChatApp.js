import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import RoomThumbNail from './RoomThumbNail';
import { VscAdd,VscComment } from "react-icons/vsc";
import GridItems from './style-component/GridItems';
import ProfileInfo from './ProfileInfo';
import { useRouter } from "next/router";
import { isMobile } from 'react-device-detect';
import PrateTypeButton from './PrateTypeButton';
import AlignItems from './style-component/AlignItems';
import Header from './Header';


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

    function RoomPlaceholder(props) {
        let roomsPlaceholder={
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '9em',
            padding: '1em',
        };
        return (
            <div style={roomsPlaceholder}>
                <p style={{textAlign: 'center'}}>{props.children}</p>
            </div>
        )
    }

    return (
        <>
            {/* <h1>Dashboard</h1> */}
            <ProfileInfo
                profileId={user.id}
                hideUserInfo={true}
            >
                {groupsArray && <>{groupsArray.length !== 0 && 
                    <p>合計 {groupsArray.length} 部屋作成済み</p>
                }</>}
            </ProfileInfo>
            {groupsArray &&
                <>
                    <h4>作成した部屋</h4>
                    <div className="grid petaGrid" style={{gap: 20}}>
                        {groupsArray.length !== 0 ? groupsArray.map((props) => {
                            return <RoomThumbNail
                                    key={props.room_name}
                                    backgroundImage={props.background_image}
                                    roomName={props.room_name}
                                    roomCode={props.room_id}
                                    description={props.description}
                                    removeVisibilityTag={true}
                                />
                            }):<RoomPlaceholder>作成された部屋はありません。</RoomPlaceholder>
                        }
                    </div>
                </>
            }
        </>
    )
}