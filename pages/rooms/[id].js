import React, { useState, useEffect } from 'react'
import Head from 'next/head'

import TextMessage from '../../lib/room-component/TextMessage'
import TextMessageNote from '../../lib/room-component/TextMessageNote';
import { supabase } from '../../utils/supabaseClient'
import Link from 'next/link'
import Button from '../../lib/Button';
import PrateButton from '../../lib/PrateButton';
import EmojiButton from '../../lib/EmojiButton';

import {VscAccount, VscHome, VscSymbolParameter, VscRocket,VscCommentDiscussion,VscSettingsGear,VscComment,VscMail,VscClose,VscDebugRestart,VscNote } from "react-icons/vsc";

import { useRouter } from 'next/router'
import AlignItems from '../../lib/style-component/AlignItems';
import StickyBottom from '../../lib/style-component/StickyBottom';

import SmallButton from '../../lib/SmallButton';
import StylizedBanner from '../../lib/room-component/StylizedBanner';

Modal.setAppElement('#__next');
import Modal from 'react-modal';
import GridItems from '../../lib/style-component/GridItems';

function IndivisualPrateRoom({ roomId }) {
  const user = supabase.auth.user();

  const [gridStatus, setGridStatus] = useState('1fr');
  let sideBarContainer ={
    borderRight:'var(--baseBorder2)',
    padding: '1em',
    height: '100vh',
    minWidth: '250px',
    position: 'sticky',
    top: '0',
    overflowY: 'auto'
  }

  const emojiData = ['👋','👌','👍','👎','👏','🤘','😂','😍','😝','😠','😢','🤧','🤯','🤭','🤨']

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal =()=> {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  let modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '500px',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'var(--baseColor0)',
        border: 'var(--baseBorder2)',
        borderRadius: 'calc(var(--borderRadius)*2)',
        boxShadow: 'var(--boxShadow)',
        padding: '1em',
    },
  }

  const router = useRouter()
  const [message, setMessage] = useState('');

  const [roomInfo, setRoomInfo] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');


  const [messagesArray, setMessagesArray] = useState([]);
  const [messagesNotesArray, setMessagesNotesArray] = useState();

  const [messageByte, setMessageByte] = useState(0);
  const [messageWordCount, setMessageWordCount] = useState(0);

  const fetchRoomInfo = async () => {
      let { data: roomsInfo, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('room_id', roomId);
      setRoomInfo(roomsInfo[0]);
  }

  const fetchMessages = async () => {
    console.log('bruh')
    if (!messagesArray.length) {
      let { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .eq('room_id', roomId)
        .order('created_at', { ascending: false });
      setMessagesArray(messages);
    }
  }
  const fetchMessageNotes = async () => {
    console.log('bruh')
    let { data: notes, error } = await supabase
      .from('notes')
      .select('*')
      .eq('room_id', roomId)
      .order('id', { ascending: false });
    setMessagesNotesArray(notes);
  }

  useEffect(() => {
    fetchRoomInfo();
    fetchMessages();
    fetchMessageNotes();  
  },[])

  // () => setLoadingMessage('Loading prates');
  // () => setLoadingMessage('This room is private');
  
  // Sent message
    const [messageSentNumber, setMessageSentNumber] = useState(0);
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
      setMessageSentNumber(messageSentNumber + 1);
    }
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
      <Head>
        <title>{roomInfo.room_name}</title>
      </Head>
      {!user && 
        <header>
          <h5 style={{margin:0}}>Create an account to have the full experience.</h5>
          <Button
            click={()=> router.push('/signup')}
            icon={<VscAccount />}
            name="Sign Up"
          />
        </header>
      }     
      <GridItems grid={gridStatus}>
            {gridStatus != '1fr' && <div style={sideBarContainer}>
              <GridItems grid={'1fr'}>
                {user &&
                <>
                  {user.id === roomInfo.room_creator && <>
                    <Button
                      disabled={!roomId}
                      click={(e) => { e.preventDefault(); router.push("/shortcuts"); }}
                      icon={<VscSymbolParameter />}
                      name="Shortcuts Info"
                      />
                    <Button
                      disabled={!roomId}
                      click={(e) => { e.preventDefault(); router.push("/rooms"); }}
                      icon={<VscRocket />}
                      name="Join / Create"
                      />
                  </>}
                </>
                }
                <h3 style={{marginBottom: 0}}>Notes</h3>
                <div className="notesContainer">
                  {messagesNotesArray.length !== 0 ?
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
              </GridItems>
            </div>}
            <div className={'bodyPadding'}>
              <AlignItems>
                <Button
                  size={'medium'}
                  disabled={!roomId}
                  click={(e) => { e.preventDefault(); router.push("/"); }}
                  icon={<VscHome />}
                  name="Main Page"
                />
                <Button
                  size={'medium'}
                  disabled={!roomId}
                  click={()=>{gridStatus === '1fr' ? setGridStatus('1fr 4fr'): setGridStatus('1fr')}}
                  icon={<VscNote />}
                  name="Chat Notes"
                />
                <Button
                  size={'medium'}
                  disabled={!roomId}
                  click={(e) => { e.preventDefault(); router.push("/browse"); }}
                  icon={<VscCommentDiscussion />}
                  name="Browse Other Rooms"
                />
              </AlignItems>
              <Modal
                isOpen={modalIsOpen}
                style={modalStyle}
              >
                <SmallButton
                  click={() => closeModal()}
                  icon={<VscClose />}
                  right={true}
                />
                <h3>Compose a new Prate</h3>
                  <p>View the <a>shortcuts</a> page for a more enhanced prate</p>
                  <AlignItems scroll={true}>
                      {emojiData.map(emoji =>
                        <EmojiButton
                          key={emoji}
                          emoji={emoji}
                          click={(e) => { e.preventDefault(); setMessage(message + emoji) }}
                        />
                      )}
                  </AlignItems>
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
                    <Button
                      disabled={!message}
                      type="submit"
                      click={handleMessageSubmit}
                      icon={<VscMail />}
                      name="Post"
                    />
                  </form>
                  {message &&
                    <AlignItems>
                      <p style={{width:'fit-content'}}>{messageByte} Bytes</p>
                      <p style={{width:'fit-content'}}>{messageWordCount} Words</p>
                    </AlignItems>
                  }
              </Modal>
              <StylizedBanner
                backgroundImage={roomInfo.background_image}
                roomName={roomInfo.room_name}
                roomCode={roomInfo.room_id}
                authorId={roomInfo.room_creator}
                roomPublic={roomInfo.room_public}
                roomDescription={roomInfo.description}
              />
              {loadingMessage && <p>{loadingMessage}</p>}
              {messageSentNumber != 0 && 
                  <p style={{textAlign: 'center'}}>{messageSentNumber} new added to your room</p>
              }
              <div className="messagesContainer">
                {messagesArray.map(props =>
                  <TextMessage
                    key={props.message}
                    messageId={props.id}
                    currentRoom={roomId}
                    name={props.sent_by_user}
                    message={props.message}
                    time={props.created_at}
                    roomCreator={roomInfo.room_creator}
                  />
                )}
              </div>
              {user &&               
                <>
                {user.id === roomInfo.room_creator &&    
                  <StickyBottom>
                    <Button
                      boxShadow={true}
                      disabled={!roomId}
                      click={() => {
                        openModal();
                      }}
                      icon={<VscComment />}
                      name="Compose Prate"
                    />
                  </StickyBottom>
                }
                </>
              }
            </div>
          </GridItems>
    </>
  )
}

export async function getServerSideProps({ params }) {
  let roomId = params.id;
  return {
    props: { roomId },
  }
}

export default IndivisualPrateRoom