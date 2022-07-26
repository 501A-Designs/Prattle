import React,{useEffect, useState} from 'react'
import { supabase } from '../../utils/supabaseClient'
import TextMessage from './TextMessage';
import { IconContext } from 'react-icons/lib';
import { VscDebugRestartFrame } from "react-icons/vsc";
import AlignItems from '../style-component/AlignItems';
import RoomView from '../tooltip-component/RoomView';
import { FiCornerUpRight } from 'react-icons/fi';
import TabComponent from '../TabComponent';
import GhenInterpreter from '../GhenInterpreter';

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
        borderRadius: 'var(--borderRadius1) var(--borderRadius1) 0 0',
    }

    return (
        <div
            style={{marginTop: '0.5em' }}
        >
            {messageArray && messageArray[0] ? 
                <TextMessage
                    hideThread={true}
                    style={{
                        border:'var(--baseBorder1)',
                        borderRadius:'var(--borderRadius2)',
                        padding:'0.5em'
                    }}
                    key={messageData.message}
                    messageId={props.messageId}
                    currentRoom={messageData.room_id}
                    id={messageData.sent_by_user}
                    message={messageData.message}
                    time={messageData.created_at}
                />:<p>見つかりませんでした</p>
            }
            {/* {messageArray && 
                <>                
                    {messageArray[0] ?

                    }
                </>
            } */}
        </div>
        // <div style={{marginTop: '0.5em'}}>
        //     {displayRoomView && <RoomView close={()=>{setDisplayRoomView(false)}} roomId={messageData.room_id}/>}
        //     <div style={tabTitle} onClick={()=>{setDisplayRoomView(true)}}>
        //         <AlignItems>
                    
        //             <span></span>
        //         </AlignItems>
        //     </div>

        // </div>
    )
}
