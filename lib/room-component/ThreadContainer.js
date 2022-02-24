import React, { useState } from 'react'
import TextMessage from './TextMessage'
import Button from '../Button';
import { VscMail,VscClose,VscChevronUp } from "react-icons/vsc";
import { supabase } from '../../utils/supabaseClient'
import styles from '../../styles/message/ThreadContainer.module.css';
import AlignItems from '../style-component/AlignItems';
import SmallButton from '../../lib/SmallButton';

Modal.setAppElement('#__next');
import Modal from 'react-modal';

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
    // Sent message
    const handleThreadMessageSubmit = async (e) => {
        e.preventDefault();
        let timeStamp = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
        const { data, error } = await supabase
            .from('threads')
            .insert([{
                created_at: timeStamp,
                message: messageThread,
                sent_by_user: user.user_metadata.first_name,
                linked_id: props.linkedId
            },])
        setMessageThread('');
        setMessageSent(messageSent + 1);
    }
    return (
        <>
            <div className={styles.threadContainer}>
                {messagesThreadArray === [] && <p>Nothing found</p>}
                {messagesThreadArray && messagesThreadArray.map(props =>
                    <TextMessage
                        key={props.message}
                        messageId={props.id}
                        name={props.sent_by_user}
                        message={props.message}
                        time={props.created_at}
                    />
                )}
                {messageSent != 0 && <p style={{marginLeft:'1em'}}>{messageSent} sent to thread</p>}
            </div>
            <AlignItems>
                {user.id === props.roomCreator ?   
                    <>
                        <Button
                            size={'medium'}
                            name="Add prate to thread"
                            click={() => openModal()}
                        />
                        <p style={{width: 'fit-content'}}>{messagesThreadArray.length} Prates in this thread</p>
                    </>:
                    <Button
                        icon={<VscChevronUp/>}
                        size={'medium'}
                        name="Close thread"
                        click={props.closeThreadFunction}
                    />
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
                <h3>Add to prate to thread</h3>
                <p>You can use the same shortcuts used for your normal prate</p>
                <form
                    className="shedAlignedForm"
                    onSubmit={handleThreadMessageSubmit}
                >
                    <input
                        placeholder="Your message"
                        onChange={(e) => setMessageThread(e.target.value)}
                        value={messageThread}
                    />
                    <Button
                        disabled={!messageThread}
                        type="submit"
                        click={handleThreadMessageSubmit}
                        icon={<VscMail />}
                        name="Send"
                    />
                </form>
            </Modal>
        </>
    )
}
