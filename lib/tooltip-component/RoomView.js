import React,{ useState, useEffect} from 'react'
import Button from '../button-component/Button';
import SmallButton from '../button-component/SmallButton';
import GridItems from '../style-component/GridItems'
import {VscClose} from "react-icons/vsc";
import { useRouter } from "next/router";
import { supabase } from '../../utils/supabaseClient'

export default function RoomView(props) {
  const [roomInfo, setRoomInfo] = useState();
  const router = useRouter();

  const fetchRoomInfo = async () => {
    let { data: roomData, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('room_id', props.roomId);
    setRoomInfo(roomData[0]);
  }
    const toolTip ={
        position: 'absolute',
        width: '200px',
        zIndex:'10',
        backgroundColor: 'var(--baseColor0)',
        border: 'var(--baseBorder2)',
        borderRadius: 'calc(var(--borderRadius)*2)',
        padding: '1.5em 1em 1em 1em',
        boxShadow: 'var(--boxShadow)',
    }

    useEffect(() => {
      fetchRoomInfo();
    }, [props.roomId])
    console.log(roomInfo)

    return (
        <div style={toolTip} className={'popOut'}>
            <SmallButton
                icon={<VscClose/>}
                click={props.close}
                right={true}
            />
            {roomInfo && 
              <>
                {roomInfo.background_image &&            
                  <img src={roomInfo.background_image} width={'100%'}/>
                }
              </>
            }
            <GridItems>
                <h5 style={{margin:'0.8em 0 0 0'}}>{roomInfo ? roomInfo.room_name:'更新中...'}</h5>
                <p style={{color:'var(--baseColor5)'}}>{roomInfo && roomInfo.description}</p>
                <Button
                  size={'medium'}
                  name={'部屋を開く'}
                  click={(e)=> {
                    e.preventDefault();
                    router.push(`/rooms/${roomInfo.room_id}`)}
                  }
                />
            </GridItems>
        </div>
    )
}