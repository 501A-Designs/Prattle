import React, { useState, useEffect } from 'react'
import IconButton from "../button-component/IconButton";
import { supabase } from '../../utils/supabaseClient'
import ThreadContainer from './ThreadContainer';
import styles from '../../styles/message/TextMessage.module.css';
import AlignItems from '../style-component/AlignItems';
import { useRouter } from 'next/router'
import GridItems from '../style-component/GridItems';
import { toast } from 'react-toastify';
import GhenInterpreter from '../GhenInterpreter';
import ProfileView from '../tooltip-component/ProfileView';

import moment from 'moment';
import 'moment/locale/ja'
import { FiChevronUp, FiCopy, FiCornerUpLeft, FiExternalLink, FiFileText } from 'react-icons/fi';

export default function TextMessage(props) {
  const router = useRouter()
  const user = supabase.auth.user();
  const [messagesThreadArray, setMessagesThreadArray] = useState([]);
  const [messagesThreadDisplay, setMessagesThreadDisplay] = useState(false);

  let id = props.data.id;
  let senderId = props.data.sent_by_user_id;
  let senderPhotoUrl = props.data.sent_by_user_photo;
  let message = props.data.message;
  let time = props.data.time;

  let room = props.currentRoom;
  let openThreadModal = props.openThreadModal;

  useEffect(async () => {
    if (props.hideThread !== true) {
      let { data: threads, error } = await supabase.from('messages')
        .select('*')
        .eq('linked_id', id)
        .order('created_at', { ascending: true });
      if (threads) {
        setMessagesThreadArray(threads);
      }
    }
  },[room])

  const handleSaveNote = async () => {
    if (window.confirm(`[${message}] をメモに追加しますか？`)) {
      const { data, error } = await supabase
      .from('messages')
      .update({noted: true})
      .eq('id', props.currentRoom);
      console.log('noted');
    }
  }

  const copiedContent = () => {
    navigator.clipboard.writeText(`:prate>${id} `);
    toast('Prate IDがコピーされました。Prattle上で送信すること他の人の投稿を再投稿（リプレイト）されます。');
  }

  function PrateMessageButtons() {
    return (
      <>
        <IconButton
          onClick={
            messagesThreadDisplay === true ?
              () => setMessagesThreadDisplay(false):
              () => setMessagesThreadDisplay(true)
          }
          title={messagesThreadDisplay === true ? '閉じる':'スレッドを開く'}
          noOutline
        >
          {messagesThreadDisplay === true ? <FiChevronUp/>:<FiCornerUpLeft />}
        </IconButton>
        <IconButton
          onClick={() => handleSaveNote()}
          title={'メモ'}
          noOutline
        >
          <FiFileText/>
        </IconButton>
        <IconButton
            onClick={() => copiedContent()}
            title={'Re-prate用にコピー'}
            noOutline
        >
          <FiCopy/>
        </IconButton>
      </>
    )
  }
    

  return (
    <div
      className={`
        ${styles.textMessage}
        ${props.nested && styles.nested}
      `}
      style={props.style}
      key={props.key}
    >
      <div className={styles.messageContainer}>
        <img
          className={styles.userImage}
          src={senderPhotoUrl}
          onClick={()=>router.push(`/profile/${senderId}/`)}
        />
          <GridItems gap={'0'}>
            <div
              onClick={() => router.push(`/prate/${id}`)}
              className={styles.messageContent}
            >
              <GhenInterpreter inputValue={message}/>
            </div>
            {messagesThreadArray.length !== 0 && messagesThreadDisplay === false &&
              <AlignItems arrow={true}>
                <p
                  style={{cursor:'pointer'}}
                  onClick={()=>{
                    user ? setMessagesThreadDisplay(true):
                    router.push('/signup')
                  }}
                >
                  {user ? 
                    <>スレッドに {messagesThreadArray.length} 件</>:
                    <>ログインして見る</>
                  }
                </p>
              </AlignItems>
            }
            {messagesThreadDisplay === true &&      
              <ThreadContainer
                messagesThreadArray={messagesThreadArray}
                linkedId={messageId} 
                openThreadModal={openThreadModal}
                roomCreator={props.roomCreator}
                roomEditable={props.roomEditable}
                closeThreadFunction={()=>setMessagesThreadDisplay(false)}
              />
            }
          </GridItems>
            </div>
            <AlignItems flexEnd={true}>
            <time className={'messageTime'}>
              {moment(time).subtract(9, 'hours').fromNow()}
            </time>

            {user &&
            <>
              {props.roomEditable === true && <PrateMessageButtons/>}
              {user.id === props.roomCreator &&   
                <>
                  {
                    props.roomEditable !== true && <PrateMessageButtons/>
                  }
                </>
              }
            </>
            }
            </AlignItems>
        </div>
    )
}