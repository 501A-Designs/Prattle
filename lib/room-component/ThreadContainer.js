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
import { FiChevronUp, FiPlus } from 'react-icons/fi';
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
                <IconButton
                    onClick={props.closeThreadFunction}
                    name="Close"
                    solid
                >
                    <FiChevronUp/>
                </IconButton>
                {user.id === props.roomCreator ? 
                    <IconButton
                        onClick={() => openModal()}
                        name="Add"
                    >
                        <FiPlus/>
                    </IconButton>: 
                    <>
                        {props.roomEditable === true &&
                            <IconButton
                                onClick={() => openModal()}
                                name="Add"
                            >
                                <FiPlus/>
                            </IconButton>
                        }
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
                <h3>Add to thread</h3>
                {messageThread && 
                    <TabComponent icon ={<VscReply/>} name={'スレッドに追加'}>
                      {messageSending ? <p>送信中...</p>:<GhenInterpreter inputValue={messageThread}/>}
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
                            disabled={!messageThread}
                            type="submit"
                            click={handleThreadMessageSubmit}
                            icon={<VscMail />}
                            name="投稿"
                        />
                    </AlignItems>
                </form>
            </Modal>
        </>
    )
}
