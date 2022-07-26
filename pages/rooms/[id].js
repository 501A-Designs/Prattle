import React, { useState, useEffect } from 'react'
import Head from 'next/head'

import TextMessage from '../../lib/room-component/TextMessage'
import TextMessageNote from '../../lib/room-component/TextMessageNote';
import { supabase } from '../../utils/supabaseClient'
import Link from 'next/link'
import Button from '../../lib/button-component/Button';
import IconButton from '../../lib/button-component/IconButton';

import {FiAlignJustify, FiBold, FiFileText, FiGitBranch, FiItalic, FiMapPin, FiPlus, FiSend, FiSettings, FiXCircle} from 'react-icons/fi'
import {VscArrowSwap,VscBold,VscItalic,VscSymbolColor,VscDebugLineByLine,VscLocation} from "react-icons/vsc";

import { useRouter } from 'next/router'
import AlignItems from '../../lib/style-component/AlignItems';
import StickyBottom from '../../lib/style-component/StickyBottom';
import StylizedBanner from '../../lib/room-component/StylizedBanner';

Modal.setAppElement('#__next');
import Modal from 'react-modal';
import GridItems from '../../lib/style-component/GridItems';
import VisibilityTag from '../../lib/tag-component/VisibilityTag';
import StaticScreen from '../../lib/scene-component/StaticScreen';
import GhenInterpreter from '../../lib/GhenInterpreter';
import TabComponent from '../../lib/TabComponent';
import { isBrowser, isMobile } from 'react-device-detect'
import Header from '../../lib/Header';
import { modalStyle } from '../../modalStyle';
import { useFilter, useInsert, useRealtime } from 'react-supabase';

function IndivisualPrateRoom({ roomId }) {
  const filter = useFilter(
    (query) =>
      query
        .eq('linked_id', roomId)
        .order('created_at', { ascending: false })
        .limit(10),
  )

  const [{ data, fetching, error }, reexecute] = useRealtime('messages',{select: {filter: filter}});

  fetching && console.log(data)
  error && console.log(error)

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

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const openModal =()=> setIsOpen(true);
  const closeModal =()=> setIsOpen(false);

  const router = useRouter();

  const [message, setMessage] = useState('');
  const [messageSending, setMessageSending] = useState(false)
  const [roomInfo, setRoomInfo] = useState('');

  const [messagesArray, setMessagesArray] = useState([]);
  const [messagesNotesArray, setMessagesNotesArray] = useState([]);
  const [owner, setOwner] = useState('');

  const [messageByte, setMessageByte] = useState(0);
  const [messageWordCount, setMessageWordCount] = useState(0);
  
  // Sent message
  const [messageSentNumber, setMessageSentNumber] = useState(0);
console.log(user)
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    setMessageSending(true);
    let timeStamp = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          created_at: timeStamp,
          message: message,
          sent_by_user_id: user.id,
          sent_by_user_photo: user.user_metadata.picture,
          noted:false,
          linked_id: roomId && roomId
        },
      ])

    console.log(data);
    console.log(error)
    setMessage('');
    setMessageByte(0);
    setMessageWordCount(0);
    setMessageSentNumber(messageSentNumber + 1);
    setMessageSending(false);
    reexecute();
  }

  // async function onClickInsert(name) {
  //   const { count, data, error } = await insertTodos({
  //     name,
  //   })
  // }

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
    // const { data, error } = await supabase
    //   .from('rooms')
    //   .update({ room_creator : owner })
    //   .eq('room_id', roomId)
    // setOwner('');
    // router.push('/');
  }

  const handleSharingSubmit = async (prop) => {
    // const { data, error } = await supabase
    //   .from('rooms')
    //   .update({ room_editable : prop })
    //   .eq('room_id', roomId);
    // router.push('/')
  }
  const handleDiscoverabilitySubmit = async (prop) => {
    // const { data, error } = await supabase
    //   .from('rooms')
    //   .update({ room_public : prop })
    //   .eq('room_id', roomId);
    // router.push('/')
  }

  let notesArray = [];
  // messagesArray && messagesArray.map((prop) => {
  //   console.log(prop.noted)
  //   if (prop.noted) {
  //     notesArray.push(prop)
  //   }
  // })

  return (
    <>
      <Head>
        <title>{roomInfo.room_name}</title>
      </Head>
      {/* {messageData ? */}
        <>
          <GridItems grid={gridStatus} gap={'0'}>
            {gridStatus != '1fr' && 
              <div style={sideBarContainer}>
                <GridItems grid={'1fr'}>
                  <h3 style={{marginBottom: 0}}>Memo</h3>
                  <div className="notesContainer">
                    {notesArray.length !== 0 ?
                      notesArray.map(props =>
                        <TextMessageNote
                          key={props.message}
                          whoSaid={props.sent_by_user}
                          message={props.message}
                          time={props.created_at}
                        />
                      ) :
                      <p>
                        ピン留めした Prate (メッセージ) は全てメモはとしてこちらで表示されます。
                      </p>
                    }
                  </div>
                </GridItems>
              </div>
            }
            <div>
              <div>
                <Header/>
                <div className={'bodyPadding'}>
                  {/* <AlignItems spaceBetween style={{marginBottom:'1em'}}>
                    {isBrowser && 
                      <IconButton
                        disabled={!roomId}
                        onClick={()=>{gridStatus === '1fr' ? setGridStatus('1fr 4fr'): setGridStatus('1fr')}}
                      >
                        <FiFileText />
                      </IconButton>
                    }
                    {user && user.id === roomInfo.room_creator && 
                      <IconButton
                        disabled={!roomId}
                        onClick={() => {
                          setModalContent('roomSettings');
                          openModal();
                        }}
                      >
                        <FiSettings/>
                      </IconButton>
                    }
                  </AlignItems> */}

                  {/* MODAL */}
                  <Modal
                    isOpen={modalIsOpen}
                    style={modalStyle}
                  >
                    {/* HEADER & CLOSE BUTTON */}
                    <AlignItems spaceBetween>
                      <h3>
                        {modalContent === 'newPrate' && 'Compose'}
                        {modalContent === 'roomSettings' && 'Settings'}
                      </h3>
                      <IconButton
                        onClick={() => closeModal()}
                        noOutline
                      >
                        <FiXCircle/>
                      </IconButton>
                    </AlignItems>

                    {/* CREATE NEW */}
                    {modalContent === 'newPrate' &&
                    <>
                      {message && 
                        <TabComponent
                          icon={<FiSend/>}
                          name={'新しいPrate'}
                        >
                          {messageSending ? 
                            <p>部屋に送信中...</p>:
                            <GhenInterpreter inputValue={message}/>
                          }
                        </TabComponent>
                      }
                      <form
                        style={{ marginTop: '0.5em' }}
                        className="shedForm"
                        onSubmit={handleMessageSubmit}
                      >
                        <textarea
                          placeholder='メッセージ'
                          onChange={handleMessageChange}
                          value={message}
                        />
                        <AlignItems spaceBetween={true}>
                          {message ?
                            <AlignItems>
                              <p style={{width:'fit-content'}}>{messageByte} Bytes</p>
                              <p style={{width:'fit-content'}}>{messageWordCount} Words</p>
                            </AlignItems>:<p></p>
                          }
                          <Button
                            onClick={handleMessageSubmit}
                            disabled={!message}
                            type="submit"
                            solid
                          >
                            投稿
                          </Button>
                        </AlignItems>
                      </form>
                    </>
                    }
                    {modalContent === 'roomSettings' &&
                    <>
                      <AlignItems spaceBetween={true}>
                        <h4 style={{margin:'0.5em 0'}}>パブリックシェアリング</h4>
                        <span style={{backgroundColor:'var(--baseColor1)',borderRadius:'var(--borderRadius)', fontSize:'0.7em', padding:'0.5em 1em'}}>現在のステータス: {roomInfo.room_editable === true ? '有効' : '無効'}</span>
                      </AlignItems>
                      <p>有効化することで、他の人もこの部屋で会話できるようになります。詳細は <Link href={'/usage'}>Usage</Link> のページからアクセスできます。</p>
                      <GridItems grid={'1fr 1fr'}>
                        <Button
                          onClick={()=>{handleSharingSubmit(true);}}
                        >
                          有効化
                        </Button>
                        <Button
                          onClick={()=>{handleSharingSubmit(false);}}
                        >
                          無効化
                        </Button>
                      </GridItems>
                      <br/>
                      <AlignItems spaceBetween={true}>
                        <h4 style={{margin:'0.5em 0'}}>Prattle 内で部屋を表示</h4>
                        <span style={{backgroundColor:'var(--baseColor1)',borderRadius:'var(--borderRadius)', fontSize:'0.7em', padding:'0.5em 1em'}}>現在のステータス: {roomInfo.room_public === true ? '有効' : '無効'}</span>
                      </AlignItems>
                      <p>本設定を有効化する事で <Link href="/browse">browse</Link> や <Link href={`/profile/${user.id}`}>profile</Link> ページへ部屋が表示されるようになります。</p>
                      <GridItems grid={'1fr 1fr'}>
                        <Button
                          onClick={()=>{handleDiscoverabilitySubmit(true);}}
                        >
                          有効化
                        </Button>
                        <Button
                          onClick={()=>{handleDiscoverabilitySubmit(false);}}
                        >
                          無効化
                        </Button>
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
                    roomId={roomId && roomId}
                    user={user && user}
                  />
                  {/* {messageSentNumber != 0 && 
                    <p style={{textAlign: 'center'}}>{messageSentNumber} 通追加済み</p>
                  } */}
                  <div className="messagesContainer">
                    {data && data.map(props =>
                      <TextMessage
                        style={{marginBottom: '0.5em'}}
                        key={props.id}
                        data={props}
                        currentRoom={roomId}
                        roomCreator={roomInfo.room_creator}
                        roomEditable={roomInfo.room_editable}
                      />
                    )}
                  </div>

                  {/* CREATE NEW BUTTON */}
                  <StickyBottom>
                  {user &&
                    <>
                      <Button
                        solid
                        disabled={!roomId}
                        onClick={() => {
                          setModalContent('newPrate');
                          openModal();
                        }}
                      >
                        <AlignItems>
                          <FiPlus/>
                          <span>新規作成</span>
                        </AlignItems>
                      </Button>
                    </>
                  }
                  </StickyBottom>
                </div>
              </div>
            </div>
          </GridItems>
        </>
        {/* :<StaticScreen type="loading"><h2>現在ルーム取得中</h2></StaticScreen>
        } */}
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