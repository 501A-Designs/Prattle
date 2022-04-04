import React, { useState, useEffect } from 'react'
import Head from 'next/head'

import TextMessage from '../../lib/room-component/TextMessage'
import TextMessageNote from '../../lib/room-component/TextMessageNote';
import { supabase } from '../../utils/supabaseClient'
import Link from 'next/link'
import Button from '../../lib/button-component/Button';
import EmojiButton from '../../lib/button-component/EmojiButton';

import {VscAccount, VscHome, VscSymbolParameter, VscRocket,VscCommentDiscussion,VscSettingsGear,VscComment,VscMail,VscClose,VscArrowSwap,VscNote,VscBold,VscItalic,VscSymbolColor,VscSearch,VscLocation} from "react-icons/vsc";

import { useRouter } from 'next/router'
import AlignItems from '../../lib/style-component/AlignItems';
import StickyBottom from '../../lib/style-component/StickyBottom';

import SmallButton from '../../lib/button-component/SmallButton';
import StylizedBanner from '../../lib/room-component/StylizedBanner';

Modal.setAppElement('#__next');
import Modal from 'react-modal';
import GridItems from '../../lib/style-component/GridItems';
import VisibilityTag from '../../lib/VisibilityTag';
import StaticScreen from '../../lib/scene-component/StaticScreen';
import GhenInterpreter from '../../lib/GhenInterpreter';
import TabComponent from '../../lib/TabComponent';

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

  const emojiData = ['👋','👌','👍','👎','👏','🤘','😂','😍','😝','😠','😢','🤧','🤯','🤭','🤨'];
  const shortcutsData = [
    {sc:'*',name:'太字',icon:<VscBold/>},
    {sc:'/',name:'イタリック',icon:<VscItalic/>},
    {sc:'$色名 ',name:'色',icon:<VscSymbolColor/>},
    {sc:'>',name:'Google検索',icon:<VscSearch/>},
    {sc:'?',name:'Google Mapsピン留め',icon:<VscLocation/>},
  ];

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
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
  const [messageSending, setMessageSending] = useState(false)
  const [roomInfo, setRoomInfo] = useState('');


  const [messagesArray, setMessagesArray] = useState([]);
  const [messagesNotesArray, setMessagesNotesArray] = useState([]);
  const [owner, setOwner] = useState('');

  const [messageByte, setMessageByte] = useState(0);
  const [messageWordCount, setMessageWordCount] = useState(0);

  const fetchRoomInfo = async () => {
      let { data: roomsInfo, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('room_id', roomId);
        // console.log(roomsInfo)
      setRoomInfo(roomsInfo[0]);
  }

  const fetchMessages = async () => {
    if (!messagesArray.length) {
      let { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .eq('room_id', roomId)
        .order('created_at', { ascending: false });
      setMessagesArray(messages);
      console.log(messages)
    }
  }
  // const fetchMessageNotes = async () => {
  //   if (!messagesNotesArray.length) {
  //     let { data: notes, error } = await supabase
  //       .from('notes')
  //       .select('*')
  //       .eq('room_id', roomId)
  //       .order('id', { ascending: false });
  //     setMessagesNotesArray(notes);
  //   }
  // }

  useEffect(() => {
    fetchRoomInfo();
    fetchMessages();
    // fetchMessageNotes();  
  },[])
  
  // Sent message
    const [messageSentNumber, setMessageSentNumber] = useState(0);
    const handleMessageSubmit = async (e) => {
      e.preventDefault();
      setMessageSending(true);
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
      setMessageSending(false);
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

    const handleOwnerTransferSubmit = async (e) => {
      e.preventDefault();
      const { data, error } = await supabase
        .from('rooms')
        .update({ room_creator : owner })
        .eq('room_id', roomId)
      setOwner('');
      router.push('/');
    }

    const handleSharingSubmit = async (prop) => {
      const { data, error } = await supabase
        .from('rooms')
        .update({ room_editable : prop })
        .eq('room_id', roomId);
      router.push('/')
    }
    const handleDiscoverabilitySubmit = async (prop) => {
      const { data, error } = await supabase
        .from('rooms')
        .update({ room_public : prop })
        .eq('room_id', roomId);
      router.push('/')
    }

    //add messages notes array in if Statement
  return (
    <>
      <Head>
        <title>{roomInfo.room_name}</title>
      </Head>
      {roomInfo && messagesArray ?
      <>
      {user && 
        <>
          {user.id === roomInfo.room_creator && 
            <header>
              <h5 style={{margin:0}}>あなたの部屋</h5>
              <Button
                disabled={!roomId}
                click={(e) => { e.preventDefault(); router.push("/"); }}
                icon={<VscHome />}
                name="ダッシュボード"
              />
            </header>
            }
        </>
      }
      {!user && 
        <header>
          <h5 style={{margin:0}}>Prattle をフルで体験するにはアカウントが必要となります</h5>
          <div>
            <Button
              click={()=> router.push('/signup')}
              icon={<VscAccount />}
              name="新規登録"
            />
          </div>
        </header>
      }     
      <GridItems grid={gridStatus}>
            {gridStatus != '1fr' && <div style={sideBarContainer}>
              <GridItems grid={'1fr'}>
                <h3 style={{marginBottom: 0}}>Memo</h3>
                {/* <div className="notesContainer">
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
                      ピン留めした Prate (メッセージ) は全てメモはとしてこちらで表示されます。
                    </p>
                  }
                </div> */}
              </GridItems>
            </div>}
            <div className={'bodyPadding'}>
              <AlignItems scroll={true}>
                {user ?
                  <>
                    {user.id !== roomInfo.room_creator &&
                      <VisibilityTag
                        user={user.id}
                        isEditable={roomInfo.room_editable}
                      />
                    }
                  </>:
                  <VisibilityTag
                    user={user}
                    isEditable={roomInfo.room_editable}
                  />
                }
                <Button
                  size={'medium'}
                  disabled={!roomId}
                  click={()=>{gridStatus === '1fr' ? setGridStatus('1fr 4fr'): setGridStatus('1fr')}}
                  icon={<VscNote />}
                  name="メモ"
                />
                {user &&
                <>
                  {user.id === roomInfo.room_creator && <>
                    <Button
                      size={'medium'}
                      disabled={!roomId}
                      click={(e) => { e.preventDefault(); router.push("/shortcuts"); }}
                      icon={<VscSymbolParameter />}
                      name="ショートカット"
                      />
                    <Button
                      size={'medium'}
                      disabled={!roomId}
                      click={(e) => { e.preventDefault(); router.push("/rooms"); }}
                      icon={<VscRocket />}
                      name="新規部屋作成"
                    />
                    <Button
                      size={'medium'}
                      disabled={!roomId}
                      click={() => {
                        setModalContent('roomSettings');
                        openModal();
                      }}
                      icon={<VscSettingsGear />}
                      name="設定"
                    />
                  </>}
                </>
                }
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
                {modalContent === 'newPrate' &&
                <>
                <h3>Compose a new Prate</h3>
                  {message && 
                    <TabComponent icon={<VscComment/>} name={'新しいPrate'}>
                      {messageSending ? <p>「{roomInfo.room_name}」に送信中...</p>:<GhenInterpreter inputValue={message}/>}
                    </TabComponent>
                  }
                  {/* <AlignItems scroll={true}>
                      {emojiData.map(emoji =>
                        <EmojiButton
                          key={emoji}
                          emoji={emoji}
                          click={(e) => { e.preventDefault(); setMessage(message + emoji) }}
                        />
                      )}
                  </AlignItems> */}
                  <AlignItems scroll={true}>
                      {shortcutsData.map(data =>
                        <Button
                          key={data.sc}
                          name={data.name}
                          size={'medium'}
                          icon={data.icon}
                          click={(e) => { e.preventDefault(); setMessage(data.sc) }}
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
                </>
                }
                {modalContent === 'roomSettings' &&
                <>
                  <h3>Room Settings</h3>
                  <AlignItems spaceBetween={true}>
                    <h4 style={{margin:'0.5em 0'}}>パブリックシェアリング</h4>
                    <span style={{backgroundColor:'var(--baseColor1)',borderRadius:'var(--borderRadius)', fontSize:'0.7em', padding:'0.5em 1em'}}>現在のステータス: {roomInfo.room_editable === true ? '有効' : '無効'}</span>
                  </AlignItems>
                  <p>有効化することで、他の人もこの部屋で会話できるようになります。詳細は <Link href={'/usage'}>Usage</Link> のページからアクセスできます。</p>
                  <GridItems grid={'1fr 1fr'}>
                    <Button
                      name="有効化"
                      click={()=>{handleSharingSubmit(true);}}
                    />
                    <Button
                      name="無効化"
                      click={()=>{handleSharingSubmit(false);}}
                    />
                  </GridItems>
                  <br/>
                  <AlignItems spaceBetween={true}>
                    <h4 style={{margin:'0.5em 0'}}>Prattle 内で部屋を表示</h4>
                    <span style={{backgroundColor:'var(--baseColor1)',borderRadius:'var(--borderRadius)', fontSize:'0.7em', padding:'0.5em 1em'}}>現在のステータス: {roomInfo.room_public === true ? '有効' : '無効'}</span>
                  </AlignItems>
                  <p>本設定を有効化する事で <Link href="/browse">browse</Link> や <Link href={`/profile/${user.id}`}>profile</Link> ページへ部屋が表示されるようになります。</p>
                  <GridItems grid={'1fr 1fr'}>
                    <Button
                      name="有効化"
                      click={()=>{handleDiscoverabilitySubmit(true);}}
                    />
                    <Button
                      name="無効化"
                      click={()=>{handleDiscoverabilitySubmit(false);}}
                    />
                  </GridItems>
                  <h4 style={{marginBottom:'0.5em'}}>部屋のオーナー</h4>
                  <p>オーナーシップを移行したい相手のユーザーIDを以下のフォームに入力する必要があります。</p>
                  <form
                    className="shedAlignedForm"
                    onSubmit={handleOwnerTransferSubmit}
                  >
                    <input
                      placeholder="ユーザーID"
                      onChange={(e)=>{setOwner(e.target.value)}}
                      value={owner}
                    />
                    <Button
                      disabled={!owner}
                      type="submit"
                      click={handleOwnerTransferSubmit}
                      icon={<VscArrowSwap />}
                      name="オーナーを移行"
                    />
                  </form>
                </>
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
              {messageSentNumber != 0 && 
                  <p style={{textAlign: 'center'}}>{messageSentNumber} 通追加済み</p>
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
                    roomEditable={roomInfo.room_editable}
                  />
                )}
              </div>
              {user &&               
                <>
                {user.id === roomInfo.room_creator &&    
                  <>
                    {roomInfo.room_editable === true &&                     
                      <StickyBottom>
                        <Button
                          boxShadow={true}
                          disabled={!roomId}
                          click={() => {
                            setModalContent('newPrate');
                            openModal();
                          }}
                          icon={<VscComment />}
                          name="新規作成"
                        />
                      </StickyBottom>
                    }
                  </>
                }
                {user.id !== roomInfo.room_creator &&    
                  <>
                    {roomInfo.room_editable === true &&                     
                      <StickyBottom>
                        <Button
                          boxShadow={true}
                          disabled={!roomId}
                          click={() => {
                            setModalContent('newPrate');
                            openModal();
                          }}
                          icon={<VscComment />}
                          name="新規作成"
                        />
                      </StickyBottom>
                    }
                  </>
                }
                {user.id === roomInfo.room_creator &&    
                  <>
                    {roomInfo.room_editable !== true &&                     
                      <StickyBottom>
                        <Button
                          boxShadow={true}
                          disabled={!roomId}
                          click={() => {
                            setModalContent('newPrate');
                            openModal();
                          }}
                          icon={<VscComment />}
                          name="新規作成"
                        />
                      </StickyBottom>
                    }
                  </>
                }
                </>
              }
            </div>
          </GridItems>
        </>:<StaticScreen type="loading"><h2>現在ルーム取得中</h2></StaticScreen>
        }
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