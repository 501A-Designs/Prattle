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
import ProfileView from '../tooltip-component/ProfileView';

export default function TextMessage(props) {
    const router = useRouter()
    const user = supabase.auth.user();
    const [messagesThreadArray, setMessagesThreadArray] = useState([]);
    const [messagesThreadDisplay, setMessagesThreadDisplay] = useState(false);

    let messageId = props.messageId;
    let id = props.id;
    let content = props.message;
    let time = props.time;
    let room = props.currentRoom;
    let openThreadModal = props.openThreadModal;

    useEffect(async () => {
        if (props.hideThread !== true) {
            let { data: threads, error } = await supabase
                .from('threads')
                .select('*')
                .eq('linked_id', messageId)
                .order('created_at', { ascending: true });
            if (threads) {
                setMessagesThreadArray(threads);
            }
        }
    },[room])

    const handleSaveNote = async () => {
        if (window.confirm(`Add [${content}] to notes?`)) {
            const { data, error } = await supabase
                .from('notes')
                .insert([{
                    created_at: time,
                    message: content,
                    set_by: user.id,
                    who_said: id,
                    room_id: room
                },])
            console.log('created')
        }
    }
    const copiedContent = () => {
        navigator.clipboard.writeText(`:prate-${messageId} `);
        toast('Copied prate');
    }
    let userIsMe = false;
    if (user) {if (user.id === id) {userIsMe = true;}}

    const [userInfo, setUserInfo] = useState('');
    const fetchProfileInfo = async () => {
        if (!userInfo) {            
            let { data: profiles, error } = await supabase
                .from('profiles')
                .select("*")
                .eq('id', id);
                console.log(id);
            setUserInfo(profiles[0]);
        }
    }
    useEffect(() => {
        fetchProfileInfo();
    },[id])
    const [displayProfileView, setDisplayProfileView] = useState(false);

    return (
        <div
            className={styles.textMessage}
            style={props.hideThread && {border:'var(--baseBorder1)'}}
            key={props.key}
        >
            <div className={styles.messageContainer}>
                {displayProfileView === true && <ProfileView close={()=> setDisplayProfileView(false)} profileData={userInfo} />}
                {userInfo ? 
                    <>
                        {userIsMe ? 
                            <img
                                className={styles.userImage}
                                src={userInfo.profile.user_image}
                                style={{border: '2px solid lightgreen'}}
                            />:
                            <img
                                className={styles.userImage}
                                title={userInfo.profile.first_name}
                                onClick={()=> setDisplayProfileView(true)}
                                src={userInfo.profile.user_image}
                            />
                        }
                    </>:
                    <div className={styles.placeHolderImage}></div>
                }
                {/* <h4 className={styles.messageSender}>{name}</h4> */}
                <GridItems gap={'0'}>
                    <div className={styles.messageContent}>
                        <GhenInterpreter inputValue={content}/>
                    </div>
                    {messagesThreadArray.length !== 0 && messagesThreadDisplay === false &&
                        <AlignItems arrow={true}>
                            <p style={{cursor:'pointer'}} onClick={()=>{user ? setMessagesThreadDisplay(true):router.push('/signup')}}>
                                {user ? <>スレッドに {messagesThreadArray.length} 件</>:<>ログインして見る</>}
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