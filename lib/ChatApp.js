import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import RoomThumbNail from './RoomThumbNail';
import GridItems from './style-component/GridItems';
import { useRouter } from "next/router";
import AlignItems from './style-component/AlignItems';
import Header from './Header';

import Masonry from 'react-masonry-css';


import { useRealtime } from 'react-supabase'
import { FiPlus } from 'react-icons/fi';
import Button from './button-component/Button';
import { masonGridStyle } from '../masonGridStyle';

import LoadingBar from 'react-top-loading-bar'


export default function ChatApp() {
    const user = supabase.auth.user();
    const router = useRouter();

    const [progress, setProgress] = useState(0);

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
        setProgress(30);
        fetchRoomInfo();
        setProgress(100);
    }, [])

    return (
        <>
            <LoadingBar
                color='var(--prattleColor1)'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <Header/>
            <div className="bodyPadding">
                {groupsArray &&
                    <>
                        <AlignItems spaceBetween style={{width: '100%',}}>
                            <h4>作成した部屋</h4>
                            {groupsArray && groupsArray.length > 0 ? 
                                <p style={{width: 'fit-content'}}>合計 {groupsArray.length} 部屋作成済み</p>:
                                <p style={{width: 'fit-content'}}>作成された部屋はありません。</p>
                            }
                        </AlignItems>
                        <Masonry
                            breakpointCols={masonGridStyle}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column"
                        >
                            {groupsArray.length > 0 && groupsArray.map((props) => {
                                return (
                                    <RoomThumbNail
                                        key={props.room_name}
                                        backgroundImage={props.background_image}
                                        roomName={props.room_name}
                                        roomCode={props.room_id}
                                        description={props.description}
                                        removeVisibilityTag={true}
                                    />
                                )})
                            }
                        </Masonry>
                        
                        {/* {groupsArray.length === 0 &&
                            <AlignItems centerAll>
                                <h3>
                                    作成された部屋はありません。
                                </h3>
                                <p style={{textAlign: 'center'}}>
                                    
                                </p>
                            </AlignItems>
                        } */}
                        {/* <div className="grid petaGrid" style={{gap: 20}}>
                        </div> */}
                    </>
                }
            </div>
        </>
    )
}