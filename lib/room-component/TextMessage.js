import React, { useState, useEffect } from 'react'
import Button from "../Button";
import SmallButton from "../SmallButton";
import { VscGift, VscReply, VscNote, VscCopy,VscChevronUp } from "react-icons/vsc";
import { supabase } from '../../utils/supabaseClient'
import ThreadContainer from './ThreadContainer';
import styles from '../../styles/message/TextMessage.module.css';
import AlignItems from '../style-component/AlignItems';
import { useRouter } from 'next/router'
import GridItems from '../style-component/GridItems';
import { toast } from 'react-toastify';

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

    // Sent message
    let foundUrl = null;
    let regex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

    if (content.match(regex)) {
        foundUrl = content;
    }
    let firstChar = content.split("")[0];
    let setBold = firstChar.match(new RegExp(/[*]/));
    let setItalic = firstChar.match(new RegExp(/[/]/));
    let setColor = firstChar.match(new RegExp(/[$]/));
    let setGsearch = firstChar.match(new RegExp(/[>]/));
    let setDropdown = firstChar.match(new RegExp(/[+]/));
    let setAlert = firstChar.match(new RegExp(/[!]/));
    let setTag = firstChar.match(new RegExp(/[#]/));
    let tagName = content.split(' ')[0].substring(1);

    let imgClassification = content.match(new RegExp(/(https?:\/\/.*\.(?:png|jpg|gif))/i));
    let ytvidClassification = content.match(new RegExp(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/));
    let embededVid = 'https://www.youtube.com/embed/' + content.split('=')[1];
    let gSearch = 'https://www.google.com/search?q=' + content;


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

    return (
        <div
            className={styles.textMessage}
            key={props.key}
        >
            <div className={styles.messageContainer}>
                <h4 className={styles.messageSender}>{name}</h4>
                <GridItems gap={'0'}>
                    {!foundUrl && !setBold && !setItalic && !setColor && !setGsearch && !setDropdown && !setAlert && !setTag &&
                        <p className={styles.messageContent}>{content}</p>
                    }
                    {setColor &&
                        <>
                            {content.split(' ')[0].substring(1) === 'colorful' ?
                                <span
                                    className={content.split(' ')[0].substring(1)}
                                    title="Cannot add to notes"
                                >
                                    {content.substr(content.indexOf(" ") + 1)}
                                </span>
                                : <span
                                    style={{ color: content.split(' ')[0].substring(1) }}
                                    title="Cannot add to notes"
                                >
                                    {content.substr(content.indexOf(" ") + 1)}
                                </span>
                            }
                        </>
                    }
                    {setBold &&
                        <h3
                            className={styles.messageContent}
                            title="Save bold text message to notes"
                            onClick={handleSaveNote}
                        >
                            {content.substring(1)}
                        </h3>
                    }
                    {setItalic &&
                        <p className={styles.messageContent} style={{ fontStyle: 'italic' }}>{content.substring(1)}</p>
                    }
                    {setGsearch &&
                        <div>
                            Google search:
                            <a href={gSearch}>{content.substring(1)}</a>
                        </div>
                    }
                    {setDropdown &&
                        <details
                            className={styles.messageContent}
                        >
                            <summary>{content.split(' ')[0].substring(1) + ' ' + content.split(' ')[1] + ' ' + content.split(' ')[2]}...</summary>
                            <p className={styles.messageContent}>{content.substring(1)}</p>
                        </details>
                    }
                    {setAlert &&
                        <Button
                            click={() => { alert('Message says: ' + content.substring(1)) }}
                            icon={<VscGift />}
                            name={'Open sealed message'}
                        />
                    }
                    {setTag &&
                        <section>
                            {tagName === "important" &&
                                <span
                                    className={styles.tag}
                                    style={{ backgroundColor: 'red' }}
                                >
                                    {content.split(' ')[0]}
                                </span>
                            }
                            {tagName === "work" &&
                                <span
                                    className="tag"
                                    style={{ backgroundColor: 'orange' }}
                                >
                                    {content.split(' ')[0]}
                                </span>
                            }
                            {tagName === "question" &&
                                <span
                                    className="tag"
                                    style={{ backgroundColor: 'lightblue' }}
                                >
                                    {content.split(' ')[0]}
                                </span>
                            }
                            <p className={styles.messageContent}>{content.substr(content.indexOf(" ") + 1)}</p>
                        </section>
                    }
                    {foundUrl &&
                        <section className={styles.urlContent}>
                            <a href={content}>{imgClassification ? 'JPG/PNG/GIF Image' : content}</a>
                            {imgClassification &&
                                <img src={content} alt="Img url on ShedLive" />
                            }
                            {ytvidClassification &&
                                <iframe src={embededVid} />
                            }
                        </section>
                    }
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
            <AlignItems>
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