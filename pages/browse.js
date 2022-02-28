import React,{ useState, useEffect} from 'react'
import { supabase } from '../utils/supabaseClient'

import RoomThumbNail from '../lib/RoomThumbNail'
import GridItems from '../lib/style-component/GridItems'
import VisibilityTag from '../lib/VisibilityTag';
import AlignItems from '../lib/style-component/AlignItems';

export default function Browse() {
    const user = supabase.auth.user();
    const [allPublicRooms, setAllPublicRooms] = useState();

    useEffect(async () => {
        let { data: publicRooms, error } = await supabase
          .from('rooms')
          .select('*')
          .eq('room_public', true);
        setAllPublicRooms(publicRooms);
        // console.log(publicRooms)
    }, [])



  return (
    <div className="bodyPadding">
        <h1>Prattle Rooms</h1>
        <h4>View what other people are doing by popping into different rooms.</h4>
        <GridItems>
          <AlignItems>
            <VisibilityTag
              size={'small'}
              isEditable={true}
            />
            <label>Rooms where you can add your own prates</label>
          </AlignItems>
          <AlignItems>
            <VisibilityTag
              size={'small'}
              isEditable={false}
            />
            <label>Rooms that are view only</label>
          </AlignItems>
        </GridItems>
        <hr/>
        <br/>
        <GridItems grid={'1fr 1fr 1fr'}>
            {allPublicRooms && allPublicRooms.map(props=>
                <RoomThumbNail
                    key={props.room_id}
                    backgroundImage={props.background_image}
                    roomName={props.room_name}
                    roomCode={props.room_id}
                    description={props.description}
                    user={user}
                    isEditable={props.room_editable}
                    // src={''}
                    // author={'bruhh they'}
                />
            )}
        </GridItems>
    </div>
  )
}
