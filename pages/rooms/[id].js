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
import { useFilter, useRealtime, useSelect } from 'react-supabase';

import LoadingBar from 'react-top-loading-bar'


function IndivisualPrateRoom({ roomId }) {
  const user = supabase.auth.user();
  
  const [progress, setProgress] = useState(0);
  const [{ data:roomInfoData,fetching:fetchingRoomInfoData }] = useSelect('rooms',{filter:useFilter((query) =>query.eq('room_id', roomId && roomId))})  
  const [{ data:messagesData, fetching:fetchingMessagesData }, reexecute] = useRealtime('messages',
  {select: {
    filter: useFilter(
      (query) =>
        query
        .order('created_at', { ascending: false })
        .limit(10)
        .eq('room_id', roomId)
        .eq('linked_id', roomId)
    )
  }});

  useEffect(() => {
    fetchingMessagesData && setProgress(progress+30);
    fetchingRoomInfoData && setProgress(progress+10);
    roomInfoData && messagesData && setProgress(100);
  }, [fetchingRoomInfoData, fetchingMessagesData])
  
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

  const [message, setMessage] = useState('');
  const [messageSending, setMessageSending] = useState(false)
  const [owner, setOwner] = useState('');

  const [messageByte, setMessageByte] = useState(0);
  const [messageWordCount, setMessageWordCount] = useState(0);
  
  // SEND MESSAGE
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
          sent_by_user_name: user.user_metadata.name,
          noted:false,
          room_id: roomId && roomId,
          linked_id: roomId && roomId
        },
      ])
    setMessage('');
    setMessageByte(0);
    setMessageWordCount(0);
    setMessageSending(false);
    closeModal();
    reexecute();
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
      <LoadingBar
        color='var(--prattleColor1)'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {roomInfoData &&    
        <>
          <Head>
            <title>{roomInfoData[0].room_name}</title>
          </Head>
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
                          ?????????????????? Prate (???????????????) ????????????????????????????????????????????????????????????
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
                            name={'?????????Prate'}
                          >
                            {messageSending ? 
                              <p>??????????????????...</p>:
                              <GhenInterpreter inputValue={message}/>
                            }
                          </TabComponent>
                        }
                        {!messageSending &&
                          <form
                            style={{ marginTop: '0.5em' }}
                            className="shedForm"
                            onSubmit={handleMessageSubmit}
                          >
                            <textarea
                              placeholder='???????????????'
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
                                ??????
                              </Button>
                            </AlignItems>
                          </form>
                        }
                      </>
                      }
                      {modalContent === 'roomSettings' &&
                      <>
                        <AlignItems spaceBetween={true}>
                          <h4 style={{margin:'0.5em 0'}}>?????????????????????????????????</h4>
                          <span style={{backgroundColor:'var(--baseColor1)',borderRadius:'var(--borderRadius)', fontSize:'0.7em', padding:'0.5em 1em'}}>????????????????????????: {roomInfoData[0].room_editable === true ? '??????' : '??????'}</span>
                        </AlignItems>
                        <p>?????????????????????????????????????????????????????????????????????????????????????????????????????? <Link href={'/usage'}>Usage</Link> ?????????????????????????????????????????????</p>
                        <GridItems grid={'1fr 1fr'}>
                          <Button
                            onClick={()=>{handleSharingSubmit(true);}}
                          >
                            ?????????
                          </Button>
                          <Button
                            onClick={()=>{handleSharingSubmit(false);}}
                          >
                            ?????????
                          </Button>
                        </GridItems>
                        <br/>
                        <AlignItems spaceBetween={true}>
                          <h4 style={{margin:'0.5em 0'}}>Prattle ?????????????????????</h4>
                          <span style={{backgroundColor:'var(--baseColor1)',borderRadius:'var(--borderRadius)', fontSize:'0.7em', padding:'0.5em 1em'}}>????????????????????????: {roomInfoData[0].room_public ? '??????' : '??????'}</span>
                        </AlignItems>
                        <p>????????????????????????????????? <Link href="/browse">browse</Link> ??? <Link href={`/profile/${user.id}`}>profile</Link> ????????????????????????????????????????????????????????????</p>
                        <GridItems grid={'1fr 1fr'}>
                          <Button
                            onClick={()=>{handleDiscoverabilitySubmit(true);}}
                          >
                            ?????????
                          </Button>
                          <Button
                            onClick={()=>{handleDiscoverabilitySubmit(false);}}
                          >
                            ?????????
                          </Button>
                        </GridItems>
                        <h4 style={{marginBottom:'0.5em'}}>?????????????????????</h4>
                        <p>????????????????????????????????????????????????????????????ID???????????????????????????????????????????????????????????????</p>
                        <form
                          className="shedAlignedForm"
                          onSubmit={handleOwnerTransferSubmit}
                        >
                          <input
                            placeholder="????????????ID"
                            onChange={(e)=>{setOwner(e.target.value)}}
                            value={owner}
                          />
                          <Button
                            disabled={!owner}
                            type="submit"
                            click={handleOwnerTransferSubmit}
                            icon={<VscArrowSwap />}
                            name="?????????????????????"
                          />
                        </form>
                      </>
                      }
                    </Modal>


                    <StylizedBanner
                      roomId={roomId && roomId}
                      user={user && user}
                      data={roomInfoData[0]}
                    />
                    {messagesData && 
                      <div className="messagesContainer">
                        {messagesData.map(props =>
                          <TextMessage
                            style={{marginBottom: '0.5em'}}
                            key={props.id}
                            data={props}
                            currentRoom={roomId}
                            roomInfo={roomInfoData[0]}
                          />
                        )}
                        {messagesData.length == 0 && <p style={{textAlign: 'center'}}>?????????????????????????????????????????????</p>}
                      </div>
                    }

                    {/* CREATE NEW BUTTON */}
                    <StickyBottom>
                      <AlignItems>
                        {isBrowser && 
                          <IconButton
                            disabled={!roomId}
                            onClick={()=>{gridStatus === '1fr' ? setGridStatus('1fr 4fr'): setGridStatus('1fr')}}
                          >
                            <FiFileText />
                          </IconButton>
                        }
                        {user && user.id === roomInfoData[0].room_creator && 
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
                      </AlignItems>
                      {user &&
                        <>
                          {roomInfoData[0].room_editable || user.id === roomInfoData[0].room_creator && 
                            <button
                              onClick={() => {
                                setModalContent('newPrate');
                                openModal();
                              }}
                              disabled={!roomId}
                              solid
                              style={{
                                fontSize: '1.7em',
                                padding: '0.5em',
                                border: '1.5px solid var(--prattleColor0)',
                                borderRadius: 'calc(var(--borderRadius2)*2)',
                                backgroundColor: 'var(--prattleColor1)',
                                color: 'var(--baseColor0)',
                                cursor:'pointer',
                              }}
                            >
                              <AlignItems justifyContent>
                                <FiPlus/>
                              </AlignItems>
                            </button>
                          }
                        </>
                      }
                    </StickyBottom>
                  </div>
                </div>
              </div>
            </GridItems>
          </>
        </>
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