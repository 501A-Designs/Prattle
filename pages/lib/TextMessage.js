import React, { useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import Image from 'next/image'

export default function TextMessage(props) {
    const user = supabase.auth.user();
    let name = props.name;
    let message = props.message;
    let time = props.time;
    let room = props.currentRoom;


    // Sent message
    let foundUrl = 'none';
    // const [foundUrl, setFoundUrl] = useState(false)
    let regex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);
    let regexImg = new RegExp(/(https?:\/\/.*\.(?:png|jpg))/i);

    if (message.match(regex)) {
        foundUrl = 'url';
    }
    // if (message.match(regexImg)) {
    //     foundUrl = 'img';
    // }
    else {
        foundUrl = 'none';
    }

    const handleSaveNote = async () => {
        if (window.confirm(`Add [${message}] to notes?`)) {
            console.log(room)
            const { data, error } = await supabase
                .from('notes')
                .insert([{
                    created_at: time,
                    message: message,
                    set_by: user.user_metadata.first_name,
                    who_said: name,
                    room_id: user.id
                },])
            console.log(error);
        }
    }

    return (
        <div
            className="shedLiveTextMessage"
            key={props.key}
        >
            <h4 title="View Profile" onClick={props.inspectUserData}>{name}</h4>
            {foundUrl === 'none' && <span title="Save to notes" onClick={handleSaveNote}>{message}</span>}
            {foundUrl === 'url' &&
                <div>
                    <a href={message}>{message}</a>
                    {message.match(new RegExp(/(https?:\/\/.*\.(?:png|jpg))/i)) &&
                        // <img src={message} alt="Img url on ShedLive" />
                        <Image
                            src={message}
                            alt="Img url on ShedLive"
                        />
                    }
                </div>
            }
            <time>{time.split('T')[1]}</time>
        </div>
    )
}
