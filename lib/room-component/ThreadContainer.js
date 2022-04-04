import React, { useState } from 'react'
import TextMessage from './TextMessage'
import Button from '../button-component/Button';
import { VscMail,VscClose,VscChevronUp,VscComment,VscReply } from "react-icons/vsc";
import { supabase } from '../../utils/supabaseClient'
import styles from '../../styles/message/ThreadContainer.module.css';
import AlignItems from '../style-component/AlignItems';
import SmallButton from '../../lib/button-component/SmallButton';
import GhenInterpreter from '../GhenInterpreter';

Modal.setAppElement('#__next');
import Modal from 'react-modal';
import TabComponent from '../TabComponent';

export default function ThreadContainer(props) {
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
                <Button
                    icon={<VscChevronUp/>}
                    size={'medium'}
                    name="Close"
                    click={props.closeThreadFunction}
                />
                {user.id === props.roomCreator ? 
                    <Button
                        icon={<VscComment/>}
                        size={'medium'}
                        name="Add"
                        click={() => openModal()}
                    />: 
                    <>
                        {props.roomEditable === true &&
                            <Button
                                icon={<VscComment/>}
                                size={'medium'}
                                name="Add"
                                click={() => openModal()}
                            />
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
                    className="shedAlignedForm"
                    onSubmit={handleThreadMessageSubmit}
                >
                    <input
                        placeholder="メッセージ"
                        onChange={(e) => setMessageThread(e.target.value)}
                        value={messageThread}
                    />
                    <Button
                        disabled={!messageThread}
                        type="submit"
                        click={handleThreadMessageSubmit}
                        icon={<VscMail />}
                        name="送信"
                    />
                </form>
            </Modal>
        </>
    )
}
