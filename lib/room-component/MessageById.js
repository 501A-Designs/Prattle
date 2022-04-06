import React,{useEffect, useState} from 'react'
import { supabase } from '../../utils/supabaseClient'
import TextMessage from './TextMessage';
import { IconContext } from 'react-icons/lib';
import { VscDebugRestartFrame } from "react-icons/vsc";
import AlignItems from '../style-component/AlignItems';
import RoomView from '../tooltip-component/RoomView';
import Button from '../button-component/Button';

export default function MessageById(props) {
    const [messageArray, setMessageArray] = useState([]);
    const [displayRoomView, setDisplayRoomView] = useState(false);

    const fetchMessages = async () => {
        if (messageArray) {
          let { data: messages, error } = await supabase
            .from('messages')
            .select('*')
            .eq('id', props.messageId);
          setMessageArray(messages);
        }
    }

    let messageData;
    if (messageArray){
        messageData = messageArray[0];
    }

    useEffect(() => {
        fetchMessages();
    }, [props.messageId])

    let tabTitle ={
        color: 'black',
        fontSize: '0.7em',
        margin:'0',
        padding: '0.5em 1em',
        width: 'fit-content',
        backgroundColor: 'var(--baseColor1)',
        borderRadius: 'var(--borderRadius) var(--borderRadius) 0 0',
    }

    return (
        <div style={{marginTop: '0.5em'}}>
            {displayRoomView && <RoomView close={()=>{setDisplayRoomView(false)}} roomId={messageData.room_id}/>}
            <div style={tabTitle} onClick={()=>{setDisplayRoomView(true)}}>
                <AlignItems>
                    <IconContext.Provider value={{ className: 'icons' }}>
                        <VscDebugRestartFrame/>
                    </IconContext.Provider>
                    リプレート
                </AlignItems>
            </div>
            {messageArray && 
                <>                
                    {messageArray[0] ?
                        <TextMessage
                            hideThread={true}
                            style={{border:'var(--baseBorder1)', borderRadius:'0 var(--borderRadius) var(--borderRadius) var(--borderRadius)'}}
                            key={messageData.message}
                            messageId={props.messageId}
                            currentRoom={messageData.room_id}
                            id={messageData.sent_by_user}
                            message={messageData.message}
                            time={messageData.created_at}
                        />:<p>No Prate Found</p>
                    }
                </>
            }
        </div>
    )
}
