import React, { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'


Modal.setAppElement('#__next');
import Modal from 'react-modal';
import GridItems from '../../lib/style-component/GridItems';
import RoomThumbNail from '../../lib/RoomThumbNail';
import ProfileInfo from '../../lib/ProfileInfo';

function IndivisualProfile({ profileId }) {
    const router = useRouter()
    const [rooms, setRooms] = useState('');

    const fetchRooms = async () => {
        let { data: room, error } = await supabase
            .from('rooms')
            .select('*')
            .eq('room_creator', profileId)
            .eq('room_public', true);
        setRooms(room);
    }

    useEffect(() => {
        fetchRooms();
    }, [profileId])

    return (
        <div className="bodyPadding">
            <h4>Profile Information</h4>
            <ProfileInfo profileId={profileId}/>
            <h3>Rooms made by this person</h3>
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