import React, { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'


Modal.setAppElement('#__next');
import Modal from 'react-modal';
import GridItems from '../../lib/style-component/GridItems';
import RoomThumbNail from '../../lib/RoomThumbNail';
import AlignItems from '../../lib/style-component/AlignItems';

function IndivisualProfile({ profileId }) {
    const router = useRouter()
    const [rooms, setRooms] = useState('');
    const [userInfo, setUserInfo] = useState('');

    const fetchRooms = async () => {
        let { data: room, error } = await supabase
            .from('rooms')
            .select('*')
            .eq('room_creator', profileId)
            .eq('room_public', true);
        setRooms(room);
    }
    const fetchProfileInfo = async () => {
        let { data: usersInfo, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', profileId);
        setUserInfo(usersInfo[0]);
    }
    console.log(userInfo);

    useEffect(() => {
        fetchRooms();
        fetchProfileInfo();
    }, [profileId])


    return (
        <div className="bodyPadding">
            <h4>Profile Information</h4>
            <AlignItems gap={'1.5em'}>
                <img src={userInfo.profile.user_image} style={{width: '5em', height: '5em', borderRadius:'calc(var(--borderRadius)*2)',margin:0}}/>
                <div>
                    <h2 style={{margin:0}}>{userInfo.profile.first_name}</h2>
                    <p>{userInfo.profile.user_profile}</p>
                </div>
            </AlignItems>
            {/* <h3>Rooms made by {userInfo.profile.first_name}</h3> */}
            <GridItems grid={'1fr 1fr 1fr'}>
                {rooms && rooms.map((props) => {
                    return <RoomThumbNail
                            key={props.room_name}
                            backgroundImage={props.background_image}
                            roomName={props.room_name}
                            roomCode={props.room_id}
                        />
                })}
            </GridItems>
        </div>
    )
}

export async function getServerSideProps({ params }) {
  let profileId = params.id;
  return {
    props: { profileId },
  }
}

export default IndivisualProfile