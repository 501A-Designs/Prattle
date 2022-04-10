import React, { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';

Modal.setAppElement('#__next');
import Modal from 'react-modal';
import GridItems from '../../lib/style-component/GridItems';
import RoomThumbNail from '../../lib/RoomThumbNail';
import ProfileInfo from '../../lib/ProfileInfo';
import { isMobile } from 'react-device-detect';
import Button from '../../lib/button-component/Button';

function IndivisualProfile({ profileId }) {
    const router = useRouter()
    const user = supabase.auth.user();
    const [rooms, setRooms] = useState('');
    
    if (user) {        
        if (user.id === profileId) {
            router.push('/profile')
        }
    }

    const fetchRooms = async () => {
        let { data: room, error } = await supabase
            .from('rooms')
            .select('*')
            .eq('room_creator', profileId)
            .eq('room_public', true);
        setRooms(room);
    }

    const copiedContent = () => {
        navigator.clipboard.writeText(`${profileId} `);
        toast('ユーザーIDがコピーされました');
    }

    useEffect(() => {
        fetchRooms();
    }, [profileId])

    return (
        <>
            <header>
                {user &&           
                    <Button
                        click={()=>{copiedContent();}}
                        name="ユーザーIDをコピー"
                    />
                }
            </header>
            <div className="bodyPadding">
                <ProfileInfo profileId={profileId}/>
                <GridItems grid={isMobile ? '1fr' : '1fr 1fr 1fr'}>
                    {rooms && rooms.map((props) => {
                        return <RoomThumbNail
                                key={props.room_name}
                                backgroundImage={props.background_image}
                                roomName={props.room_name}
                                roomCode={props.room_id}
                                description={props.description}
                                user={user}
                                isEditable={props.room_editable}
                            />
                    })}
                </GridItems>
                {rooms && <>{rooms.length === 0 && <p>このユーザーは一般公開されている部屋を作成していません</p>}</>}
            </div>
        </>
    )
}

export async function getServerSideProps({ params }) {
  let profileId = params.id;
  return {
    props: { profileId },
  }
}

export default IndivisualProfile