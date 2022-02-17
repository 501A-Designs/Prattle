import React, { useState, useEffect } from 'react'
import TextMessage from '../../lib/TextMessage'
import TextMessageNote from '../../lib/TextMessageNote';
import { supabase } from '../../utils/supabaseClient'
import Link from 'next/link'
import ShedButton from '../../lib/ShedButton';
import Notifier from "react-desktop-notification"
import EmojiButton from '../../lib/EmojiButton';
// VscSettingsGear
import { VscHome, VscSymbolParameter, VscRocket, VscMail } from "react-icons/vsc";
import { useAppContext, AppContextProvider } from '../../lib/AppContext';
import { useRouter } from 'next/router'


function IndivisualChat({ roomId }) {
  const router = useRouter()
  const user = supabase.auth.user();
  const [message, setMessage] = useState();

  const [messagesArray, setMessagesArray] = useState([]);
  const [messagesNotesArray, setMessagesNotesArray] = useState();
  const [latestMessagedate, setLatestMessageDate] = useState();

  const [messageByte, setMessageByte] = useState(0);
  const [messageWordCount, setMessageWordCount] = useState(0);

  let messageSubscription = null;

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
        sent_by_user: user.user_metadata.first_name,
        room_id: roomId
      },])
    console.log(message);
    setMessage('');
    setMessageByte(0);
    setMessageWordCount(0);
  }

  const handleNewMessage = (payload) => {
    setMessagesArray((prevMessages) => [payload.new, ...prevMessages]);
  };

  const fetchMessages = async (prop) => {
    console.log(prop);
    if (!messagesArray.length) {
      let { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .eq('room_id', roomId)
        .order('created_at', { ascending: false });
      setMessagesArray(messages);
    }
  }
  const fetchMessageNotes = async (prop) => {
    console.log(prop)
    let { data: notes, error } = await supabase
      .from('notes')
      .select('*')
      .eq('room_id', roomId)
      .order('id', { ascending: false });
    setMessagesNotesArray(notes);
  }
  const fetchLatestMessageDate = async (prop) => {
    let { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      .eq('room_id', prop)
      .order('id', { ascending: true });
    setLatestMessageDate(messages[0].created_at.split('T')[0])
  }
  // Deleting messages
  const eraseMessage = async () => {
    let timeStamp = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }).split(' ')[0];
    let reFormattedDate = `${timeStamp.split('/')[0]}-${timeStamp.split('/')[1]}-${timeStamp.split('/')[2]}`;
    if (latestMessagedate != reFormattedDate) {
      console.log('keep')
    } else {
      const { data, error } = await supabase
        .from('messages')
        .delete()
      console.log('delete')
    }
  }

  const getMessagesAndSubscribe = async () => {
    if (!messageSubscription) {
      fetchMessages();
      messageSubscription = supabase
        .from("messages")
        .on("*", (payload) => {
          handleNewMessage(payload);
          desktopNotification(payload);
        })
        .subscribe();
    }
  };

  const desktopNotification = (prop) => {
    if (prop.new.sent_by_user !== user.user_metadata.first_name) {
      Notifier.start("New message", prop.new.message, `https://prattle.vercel.app/chats/${roomId}`, "https://raw.githubusercontent.com/501A-Designs/Prattle/main/public/shedlivelogo.png");
    }
  }

  useEffect(() => {
    eraseMessage();
    fetchLatestMessageDate(roomId);
    fetchMessages(roomId);
    fetchMessageNotes(roomId);
  }, [roomId])

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

  // const { currentRoomName } = useAppContext();

  function CurrentRoomNameTitle() {
    // const { currentRoomName } = useAppContext();
    const { currentRoom, setCurrentRoom } = useAppContext();
    console.log(currentRoom);
    return (
      <>
        <h2 style={{ margin: '1.5em 0em 0.5em 0em' }}>{currentRoom}</h2>
      </>
    )
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
        <AppContextProvider>
          <CurrentRoomNameTitle />
          {/* <h2>{currentRoomName}</h2> */}
        </AppContextProvider>
        <ShedButton
          disabled={!roomId}
          click={(e) => { e.preventDefault(); router.push("/"); }}
          icon={<VscHome />}
          name="Main Page"
        />
        <ShedButton
          disabled={!roomId}
          click={(e) => { e.preventDefault(); router.push("/shortcuts"); }}
          icon={<VscSymbolParameter />}
          name="Shortcuts Info"
        />
        <ShedButton
          disabled={!roomId}
          click={(e) => { e.preventDefault(); router.push("/rooms"); }}
          icon={<VscRocket />}
          name="Join / Create Groups"
        />
        {/* <ShedButton
          disabled={!roomId}
          // type="submit"
          // click={handleMessageSubmit}
          icon={<VscSettingsGear />}
          name="Chat Settings"
        /> */}
      </div>
      <div className="notesContainer">
        {messagesNotesArray !== undefined ?
          messagesNotesArray.map(props =>
            <TextMessageNote
              key={props.message}
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
        {messagesArray.map(props =>
          <TextMessage
            key={props.message}
            messageId={props.id}
            currentRoom={roomId}
            name={props.sent_by_user}
            message={props.message}
            time={props.created_at}
          />
        )}
        <p>All messages before {latestMessagedate} (Today) are deleted.</p>
      </div>
      <div className="sendMessageForm">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5em', height: '2em' }}>
          {message ?
            <section className="emojiButtonContainer">
              <EmojiButton emoji={'👋'} click={(e) => { e.preventDefault(); setMessage(message + '👋') }} />
              <EmojiButton emoji={'👌'} click={(e) => { e.preventDefault(); setMessage(message + '👌') }} />
              <EmojiButton emoji={'👍'} click={(e) => { e.preventDefault(); setMessage(message + '👍') }} />
              <EmojiButton emoji={'👎'} click={(e) => { e.preventDefault(); setMessage(message + '👎') }} />
              <EmojiButton emoji={'👏'} click={(e) => { e.preventDefault(); setMessage(message + '👏') }} />
              <EmojiButton emoji={'🤘'} click={(e) => { e.preventDefault(); setMessage(message + '🤘') }} />
              <EmojiButton emoji={'😂'} click={(e) => { e.preventDefault(); setMessage(message + '😂') }} />
              <EmojiButton emoji={'😍'} click={(e) => { e.preventDefault(); setMessage(message + '😍') }} />
              <EmojiButton emoji={'😝'} click={(e) => { e.preventDefault(); setMessage(message + '😝') }} />
              <EmojiButton emoji={'😠'} click={(e) => { e.preventDefault(); setMessage(message + '😠') }} />
              <EmojiButton emoji={'😢'} click={(e) => { e.preventDefault(); setMessage(message + '😢') }} />
              <EmojiButton emoji={'🤧'} click={(e) => { e.preventDefault(); setMessage(message + '🤧') }} />
              <EmojiButton emoji={'🤯'} click={(e) => { e.preventDefault(); setMessage(message + '🤯') }} />
              <EmojiButton emoji={'🤭'} click={(e) => { e.preventDefault(); setMessage(message + '🤭') }} />
              <EmojiButton emoji={'🤨'} click={(e) => { e.preventDefault(); setMessage(message + '🤨') }} />
            </section>
            : <p style={{ margin: 'auto' }}>Get your conversation going!</p>}
          <p style={{ margin: 'auto' }}>{messageByte} Bytes</p>
          <p style={{ margin: 'auto' }}>{messageWordCount} Words</p>
        </div>
        <form
          style={{ marginTop: '0.5em' }}
          className="shedAlignedForm"
          onSubmit={handleMessageSubmit}
        >
          <input
            placeholder="Your message"
            onChange={handleMessageChange}
            value={message}
          />
          <ShedButton
            disabled={!message}
            type="submit"
            click={handleMessageSubmit}
            icon={<VscMail />}
            name="Send"
          />
        </form>
      </div>
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