import React, { useState } from 'react'
import TextMessage from './TextMessage'
import ShedButton from './ShedButton'
import { VscMail } from "react-icons/vsc";
import { supabase } from '../utils/supabaseClient'

export default function ThreadContainer(props) {
    const user = supabase.auth.user();
    let messagesThreadArray = props.messagesThreadArray;
    const [messageThread, setMessageThread] = useState();
    const [messageSent, setMessageSent] = useState(0);
    // Sent message
    const handleThreadMessageSubmit = async (e) => {
        e.preventDefault();
        let timeStamp = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
        const { data, error } = await supabase
            .from('threads')
            .insert([{
                created_at: timeStamp,
                message: messageThread,
                sent_by_user: user.user_metadata.first_name,
                linked_id: props.linkedId
            },])
        setMessageThread('');
        setMessageSent(messageSent + 1);
    }
    return (
        <>
            <div className="threadContainer">
                {messagesThreadArray === [] && <p>Nothing found</p>}
                {messagesThreadArray && messagesThreadArray.map(props =>
                    <TextMessage
                        key={props.message}
                        messageId={props.id}
                        name={props.sent_by_user}
                        message={props.message}
                        time={props.created_at}
                    />
                )}
                {messageSent != 0 && <div>{messageSent} sent to thread</div>}
            </div>
            <form
                className="shedAlignedForm"
                onSubmit={handleThreadMessageSubmit}
            >
                <input
                    placeholder="Your message"
                    onChange={(e) => setMessageThread(e.target.value)}
                    value={messageThread}
                />
                <ShedButton
                    disabled={!messageThread}
                    type="submit"
                    click={handleThreadMessageSubmit}
                    icon={<VscMail />}
                    name="Send"
                />
            </form>
        </>
    )
}
