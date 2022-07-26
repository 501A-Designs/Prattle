import React, { useState } from 'react'
import TextMessage from './TextMessage'
import Button from '../button-component/Button';
import { VscMail,VscClose,VscChevronUp,VscComment,VscReply } from "react-icons/vsc";
import { supabase } from '../../utils/supabaseClient'
import styles from '../../styles/message/ThreadContainer.module.css';
import AlignItems from '../style-component/AlignItems';
import SmallButton from '../../lib/button-component/SmallButton';
import IconButton from '../../lib/button-component/IconButton';
import GhenInterpreter from '../GhenInterpreter';

Modal.setAppElement('#__next');
import Modal from 'react-modal';
import TabComponent from '../TabComponent';
import { FiChevronUp, FiGitBranch, FiPlus, FiXCircle } from 'react-icons/fi';
import { modalStyle } from '../../modalStyle';

export default function ThreadContainer(props) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const user = supabase.auth.user();
    const openModal =()=> setIsOpen(true);
    const closeModal =()=> setIsOpen(false);

    let messagesThreadArray = props.messagesThreadArray;
    const [messageThread, setMessageThread] = useState('');
    const [messageSending, setMessageSending] = useState(false);


    // console.log(props.roomInfo)
    let roomId = props.roomInfo.room_id;
    let roomCreator = props.roomInfo.room_creator;
    let roomEditable = props.roomInfo.room_editable;

    // Sent message
    const handleThreadMessageSubmit = async (e) => {
        e.preventDefault();
        setMessageSending(true);
        let timeStamp = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
        const { data, error } = await supabase
            .from('messages')
            .insert([{
                created_at: timeStamp,
                message: messageThread,
                sent_by_user_id: user.id,
                sent_by_user_photo: user.user_metadata.picture,
                sent_by_user_name: user.user_metadata.name,
                noted:false,
                room_id: roomId && roomId,
                linked_id: props.linkedId
            },])
        setMessageThread('');
        setMessageSending(false);
        closeModal();
    }
    return (
        <>
            <div className={styles.threadContainer}>
                {messagesThreadArray && messagesThreadArray.map(props =>
                    <TextMessage
                        nested={true}
                        style={{marginLeft: '0.5em'}}

                        key={props.id}
                        data={props}
                        currentRoom={roomId}
                    />
                )}
                {/* {messageSent != 0 && <p style={{marginLeft:'1em'}}>{messageSent} 通スレッドへ送信済み</p>} */}
            </div>
            <AlignItems>
                {user.id === roomCreator ? 
                    <IconButton
                        onClick={() => openModal()}
                        name="Add"
                        solid
                    >
                        <FiPlus/>
                    </IconButton>:
                    roomEditable &&
                    <IconButton
                        onClick={() => openModal()}
                        name="Add"
                        solid
                    >
                        <FiPlus/>
                    </IconButton>
                }
                <IconButton
                    onClick={props.closeThreadFunction}
                >
                    <FiChevronUp/>
                </IconButton>
            </AlignItems>
            <Modal
                isOpen={modalIsOpen}
                style={modalStyle}
            >
                <AlignItems spaceBetween>
                    <h3>Add to thread</h3>
                    <IconButton
                        onClick={() => closeModal()}
                        noOutline
                    >
                        <FiXCircle/>
                    </IconButton>
                </AlignItems>
                {messageThread && 
                    <TabComponent
                        icon ={<FiGitBranch/>}
                        name={'スレッドに追加'}
                    >
                        {messageSending ? 
                            <p>送信中...</p>:
                            <GhenInterpreter inputValue={messageThread}/>
                        }
                    </TabComponent>
                }
                {!messageSending &&                
                    <form
                        className="shedForm"
                        onSubmit={handleThreadMessageSubmit}
                    >
                        <textarea
                            placeholder='メッセージ'
                            onChange={(e) => setMessageThread(e.target.value)}
                            value={messageThread}
                        />
                        <AlignItems spaceBetween={true}>
                            <br/>
                            <Button
                                onClick={handleThreadMessageSubmit}
                                disabled={!messageThread}
                                type="submit"
                                solid
                            >
                                投稿
                            </Button>
                        </AlignItems>
                    </form>
                }
            </Modal>
        </>
    )
}
