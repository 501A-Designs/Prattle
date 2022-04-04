import React, { useState, useEffect } from 'react'
import SmallButton from "../button-component/SmallButton";
import { VscReply, VscNote, VscCopy,VscChevronUp } from "react-icons/vsc";
import { supabase } from '../../utils/supabaseClient'
import ThreadContainer from './ThreadContainer';
import styles from '../../styles/message/TextMessage.module.css';
import AlignItems from '../style-component/AlignItems';
import { useRouter } from 'next/router'
import GridItems from '../style-component/GridItems';
import { toast } from 'react-toastify';
import GhenInterpreter from '../GhenInterpreter';

export default function TextMessage(props) {
    const router = useRouter()
    const user = supabase.auth.user();
    const [messagesThreadArray, setMessagesThreadArray] = useState([]);
    const [messagesThreadDisplay, setMessagesThreadDisplay] = useState(false);

    let messageId = props.messageId;
    let name = props.name;
    let content = props.message;
    let time = props.time;
    let room = props.currentRoom;
    let openThreadModal = props.openThreadModal;

    useEffect(async () => {
            let { data: threads, error } = await supabase
                .from('threads')
                .select('*')
                .eq('linked_id', messageId)
                .order('created_at', { ascending: true });
            if (threads) {
                setMessagesThreadArray(threads);
            }
            console.log(messagesThreadArray);
        },[room])

    const handleSaveNote = async () => {
        if (window.confirm(`Add [${content}] to notes?`)) {
            const { data, error } = await supabase
                .from('notes')
                .insert([{
                    created_at: time,
                    message: content,
                    set_by: user.user_metadata.first_name,
                    who_said: name,
                    room_id: room
                },])
            console.log('created')
        }
    }
    const copiedContent = () => {
        navigator.clipboard.writeText(content);
        toast('Copied raw content');
    }

    // const mobileStyle = {
    //     display:'flex',
    //     justifyContent: 'space-between',
    // }
    // const desktopStyle = {
    //     display:'grid',
    //     gridTemplateColumns:'1fr'
    // }

    return (
        <div
            className={styles.textMessage}
            key={props.key}
        >
            <div className={styles.messageContainer}>
                <h4 className={styles.messageSender}>{name}</h4>
                <GridItems gap={'0'}>
                    <div className={styles.messageContent}>
                        <GhenInterpreter inputValue={content}/>
                    </div>
                    {messagesThreadArray.length !== 0 && messagesThreadDisplay === false &&
                        <AlignItems arrow={true}>
                            <p style={{cursor:'pointer'}} onClick={()=>{user ? setMessagesThreadDisplay(true):router.push('/signup')}}>
                                {user ? <>{messagesThreadArray.length} More in thread</>:<>ログインして見る</>}
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
            {user &&
            <>
                {user.id === props.roomCreator &&   
                    <>
                    {props.roomEditable === true &&
                    <>                    
                        <SmallButton
                            click={messagesThreadDisplay === true ?
                                () => setMessagesThreadDisplay(false):
                                () => setMessagesThreadDisplay(true)}
                            icon={messagesThreadDisplay === true ? <VscChevronUp/>:<VscReply />}
                            title={messagesThreadDisplay === true ? '閉じる':'スレッドを開く'}
                        />
                        <SmallButton
                            click={() => handleSaveNote()}
                            icon={<VscNote />}
                            title={'メモ'}
                        />
                        <SmallButton
                            click={() => copiedContent()}
                            icon={<VscCopy />}
                            name={'テキストをコピー'}
                        />
                    </>
                    }
                    </>
                }
                {user.id !== props.roomCreator &&   
                    <>
                    {props.roomEditable === true &&
                    <>                    
                        <SmallButton
                            click={messagesThreadDisplay === true ?
                                () => setMessagesThreadDisplay(false):
                                () => setMessagesThreadDisplay(true)}
                            icon={messagesThreadDisplay === true ? <VscChevronUp/>:<VscReply />}
                            title={messagesThreadDisplay === true ? '閉じる':'スレッドを開く'}
                        />
                        <SmallButton
                            click={() => handleSaveNote()}
                            icon={<VscNote />}
                            title={'メモ'}
                        />
                        <SmallButton
                            click={() => copiedContent()}
                            icon={<VscCopy />}
                            name={'テキストをコピー'}
                        />
                    </>
                    }
                    </>
                }
                {user.id === props.roomCreator &&   
                    <>
                    {props.roomEditable !== true &&
                    <>                    
                        <SmallButton
                            click={messagesThreadDisplay === true ?
                                () => setMessagesThreadDisplay(false):
                                () => setMessagesThreadDisplay(true)}
                            icon={messagesThreadDisplay === true ? <VscChevronUp/>:<VscReply />}
                            title={messagesThreadDisplay === true ? '閉じる':'スレッドを開く'}
                        />
                        <SmallButton
                            click={() => handleSaveNote()}
                            icon={<VscNote />}
                            title={'メモに追加'}
                        />
                        <SmallButton
                            click={() => copiedContent()}
                            icon={<VscCopy />}
                            title={'テキストをコピー'}
                        />
                    </>
                    }
                    </>
                }
            </>
            }
            <time className={styles.messageTime}>{time.split('T')[1]}</time>
            </AlignItems>
        </div>
    )
}