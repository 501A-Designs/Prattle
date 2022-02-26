import React,{ useState, useEffect} from 'react'
import { supabase } from '../utils/supabaseClient'

import RoomThumbNail from '../lib/RoomThumbNail'
import GridItems from '../lib/style-component/GridItems'

export default function Browse() {
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
                    // src={''}
                    // author={'bruhh they'}
                />
            )}
        </GridItems>
    </div>
  )
}
