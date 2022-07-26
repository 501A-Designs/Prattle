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
    const openModal =()=> {
      setIsOpen(true);
    }
    function closeModal() {
      setIsOpen(false);
    }

    const user = supabase.auth.user();
    let messagesThreadArray = props.messagesThreadArray;
    const [messageThread, setMessageThread] = useState();
    const [messageSent, setMessageSent] = useState(0);
    const [messageSending, setMessageSending] = useState(false)
    // Sent message
    const handleThreadMessageSubmit = async (e) => {
        e.preventDefault();
        setMessageSending(true);
        let timeStamp = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
        const { data, error } = await supabase
            .from('threads')
            .insert([{
                created_at: timeStamp,
                message: messageThread,
                sent_by_user: user.id,
                linked_id: props.linkedId
            },])
        setMessageThread('');
        setMessageSent(messageSent + 1);
        setMessageSending(false);
    }
    return (
        <>
            <div className={styles.threadContainer}>
                {messagesThreadArray === [] && <p>Nothing found</p>}
                {messagesThreadArray && messagesThreadArray.map(props =>
                    <TextMessage
                        nested={true}
                        style={{marginLeft: '0.5em'}}
                        key={props.message}
                        messageId={props.id}
                        id={props.sent_by_user}
                        message={props.message}
                        time={props.created_at}
                    />
                )}
                {messageSent != 0 && <p style={{marginLeft:'1em'}}>{messageSent} 通スレッドへ送信済み</p>}
            </div>
            <AlignItems>
                {user.id === props.roomCreator ? 
                    <IconButton
                        onClick={() => openModal()}
                        name="Add"
                        solid
                    >
                        <FiPlus/>
                    </IconButton>: 
                    <>
                        {props.roomEditable === true &&
                            <IconButton
                                onClick={() => openModal()}
                                name="Add"
                                solid
                            >
                                <FiPlus/>
                            </IconButton>
                        }
                    </>
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
            </Modal>
        </>
    )
}
