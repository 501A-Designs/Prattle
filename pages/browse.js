import React,{ useState, useEffect} from 'react'
import { supabase } from '../utils/supabaseClient'

import RoomThumbNail from '../lib/RoomThumbNail'
import GridItems from '../lib/style-component/GridItems'
import VisibilityTag from '../lib/VisibilityTag';
import AlignItems from '../lib/style-component/AlignItems';
import { isMobile } from 'react-device-detect';

export default function Browse() {
    const user = supabase.auth.user();
    const [allPublicRooms, setAllPublicRooms] = useState();

    useEffect(async () => {
        let { data: publicRooms, error } = await supabase
          .from('rooms')
          .select('*')
          .eq('room_public', true);
        setAllPublicRooms(publicRooms);
    }, [])

  return (
    <div className="bodyPadding">
        <h1>Prattle Rooms</h1>
        <h4>他の人がどうしてるを確認してみよう</h4>
        <GridItems>
          <AlignItems>
            <VisibilityTag
              size={'small'}
              isEditable={true}
            />
            <label>自分も会話に参加できる部屋</label>
          </AlignItems>
          <AlignItems>
            <VisibilityTag
              size={'small'}
              isEditable={false}
            />
            <label>閲覧のみの部屋</label>
          </AlignItems>
        </GridItems>
        <br/>
        <GridItems grid={isMobile ? '1fr' : '1fr 1fr 1fr'}>
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
