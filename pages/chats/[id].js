import React, { useState, useEffect } from 'react'
import { useAppContext } from '../appContext';
import TextMessage from '../lib/TextMessage'
import TextMessageNote from '../lib/TextMessageNote';
import { supabase } from '../../utils/supabaseClient'
import Link from 'next/link'
import ShedButton from '../lib/ShedButton';
import { VscMail, VscAccount, VscAdd, VscChevronUp, VscSignOut, VscActivateBreakpoints, VscDebugDisconnect } from "react-icons/vsc";


function IndivisualChat({ roomId }) {
  const user = supabase.auth.user();
  const [message, setMessage] = useState();

  const [messagesArray, setMessagesArray] = useState([]);
  const [messagesNotesArray, setMessagesNotesArray] = useState();
  const [latestMessagedate, setLatestMessageDate] = useState();
  const [newChangeInfo, setNewChangeInfo] = useState();

  const [messageByte, setMessageByte] = useState(0);
  const [messageWordCount, setMessageWordCount] = useState(0);

  let messageSubscription = null;

  let timeStamp = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }).split(' ')[0];
  let reFormattedDate = `${timeStamp.split('/')[0]}-${timeStamp.split('/')[1]}-${timeStamp.split('/')[2]}`;

  const getMessagesAndSubscribe = async () => {
    if (!messageSubscription) {
      fetchMessages();
      messageSubscription = supabase
        .from("messages")
        .on("*", (payload) => {
          handleNewMessage(payload);
        })
        .subscribe();
    }
  };

  useEffect(() => {
    getMessagesAndSubscribe();
    return () => {
      supabase.removeSubscription();
    };
  }, []);

  // Sent message
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    let timeStamp = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
    const { data, error } = await supabase
      .from('messages')
      .insert([{
        created_at: timeStamp,
        message: message,
        sent_by_user: user,
        room_id: roomId
      },])
    console.log(message);
    setMessage('');
    setMessageByte(0);
    setMessageWordCount(0);
  }

  const fetchMessages = async (prop) => {
    let { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      .eq('room_id', prop)
      .order('created_at', { ascending: false });
    setMessagesArray(messages);
    if (latestMessagedate.split('T')[0] < reFormattedDate) {
      eraseMessage();
      console.log('delete')
    } else {
      console.log('keep');
    }
  }
  const fetchMessageNotes = async (prop) => {
    let { data: notes, error } = await supabase
      .from('notes')
      .select('*')
      .eq('room_id', prop)
      .order('id', { ascending: false });
    setMessagesNotesArray(notes);
  }
  const fetchLatestMessageDate = async (prop) => {
    let { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      .eq('room_id', prop)
      .order('id', { ascending: true });
    setLatestMessageDate(messages[0].created_at)
  }

  useEffect(() => {
    fetchLatestMessageDate(roomId);
    fetchMessages(roomId);
    fetchMessageNotes(roomId);
  }, [roomId])

  const handleNewMessage = (payload) => {
    setMessagesArray((prevMessages) => [payload.new, ...prevMessages]);
  };


  // Deleting messages
  const eraseMessage = async () => {
    const { data, error } = await supabase
      .from('messages')
      .delete()
  }

  // Send Message
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setMessageByte(e.target.value.split('').length);
    setMessageWordCount(e.target.value.split(' ').length);
    if (e.target.value === '') {
      setMessageByte(0);
      setMessageWordCount(0);
    }
  }


  return (
    <>
      <Link href="/">
        <a>&lt; Navigate back</a>
      </Link>
      <h2>ShedLive</h2>
      <div className="notesContainer">
        {messagesNotesArray !== undefined ?
          messagesNotesArray.map(props =>
            <TextMessageNote
              key={props}
              setBy={props.set_by}
              whoSaid={props.who_said}
              message={props.message}
            />
          ) :
          <p>
            ShedLive cannot save more than 20 Notes.
            <br />
            (notes that are not shown are automatically delete).
          </p>
        }
      </div>
      <div className="messagesContainer">
        {newChangeInfo &&
          <p style={{ cursor: 'pointer', color: 'rgb(107, 255, 70)' }}>
            New changes by {newChangeInfo.sent_by_user.user_metadata.first_name == user.user_metadata.first_name ? 'you' : newChangeInfo.sent_by_user.user_metadata.first_name}
          </p>
        }
        {messagesArray.map(props =>
          <TextMessage
            key={props.user}
            inspectUserData={() => {
              setOpenUserToggle(true);
              setAddGroupToggle(false);
              setInspectedUser([
                props.sent_by_user.user_metadata.first_name,
                props.sent_by_user.id,
                props.sent_by_user.email,
                props.sent_by_user.last_sign_in_at,
                props.sent_by_user.identities[0].last_sign_in_at.split('T')[0],
                props.sent_by_user.identities[0].last_sign_in_at.split('T')[1],
              ])
            }}
            name={props.sent_by_user.user_metadata.first_name}
            content={props.message}
            time={props.created_at}
          />
        )}
        <p>All messages before {latestMessagedate} (Today) are deleted.</p>
      </div>
      <form className="shedForm" style={{ marginTop: '1em', position: 'sticky', bottom: '1em' }} onSubmit={handleMessageSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5em' }}>
          <p style={{ margin: 'auto' }}>SHEDLIVE.CO</p>
          <p style={{ margin: 'auto' }}>{messageByte} Bytes</p>
          <p style={{ margin: 'auto' }}>{messageWordCount} Words</p>
          <ShedButton
            disabled={!message}
            type="submit"
            click={handleMessageSubmit}
            icon={<VscMail />}
            name="Send"
          />
        </div>
        <input
          placeholder="Your message"
          onChange={handleMessageChange}
          value={message}
        />
      </form>
    </>
  )
}

export async function getServerSideProps({ params }) {
  let roomId = params.id;
  return {
    props: { roomId },
  }
}

export default IndivisualChat