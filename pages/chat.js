import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from "next/router";
import ShedButton from './lib/ShedButton';
import { VscMail, VscAccount, VscAdd, VscChevronUp, VscSignOut, VscActivateBreakpoints } from "react-icons/vsc";

import ContactsChip from './lib/ContactsChip';
import TextMessage from './lib/TextMessage';
import TextMessageNote from './lib/TextMessageNote';
import { v4 as uuidv4 } from 'uuid';

export default function chat() {
    const user = supabase.auth.user();
    const [openUserToggle, setOpenUserToggle] = useState(true);
    const [addGroupToggle, setAddGroupToggle] = useState(false);

    const [message, setMessage] = useState();
    const [messageByte, setMessageByte] = useState(0);
    const [messageWordCount, setMessageWordCount] = useState(0);
    const [messagesArray, setMessagesArray] = useState();
    const [messagesNotesArray, setMessagesNotesArray] = useState();
    const [groupsArray, setGroupsArray] = useState();

    const [inspectedUser, setInspectedUser] = useState();

    const [groupNameInput, setGroupNameInput] = useState();
    const [joinGroupInput, setJoinGroupInput] = useState();

    const [generateRoom, setGeneratedRoom] = useState()
    const [currentRoom, setCurrentRoom] = useState()
    const [fetchedRoomName, setFetchedRoomName] = useState('')


    // Send Message
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
        setMessageByte(e.target.value.split('').length);
        setMessageWordCount(e.target.value.split(' ').length);
        if (e.target.value === '') {
            setMessageByte(0);
            setMessageWordCount(0);
        }
    }

    // Create Group
    const handleCreateGroup = async (e) => {
        e.preventDefault();
        let roomIdValue = uuidv4();
        const { data, error } = await supabase
            .from('rooms')
            .insert(
                [{
                    room_name: groupNameInput,
                    room_id: roomIdValue
                },]
            )
        setGeneratedRoom(roomIdValue);
        setGroupNameInput('');
    }

    useEffect(async () => {
        let { data: rooms, error } = await supabase
            .from('rooms')
            .select('*')
            .eq('room_id', joinGroupInput);
        setFetchedRoomName(rooms[0].room_name);
    }, [joinGroupInput])

    // Join a group
    const handleJoinGroup = async (e) => {
        e.preventDefault();
        console.log(fetchedRoomName);
        const { data, error } = await supabase
            .from('users')
            .insert([{
                user_id: user.id,
                room_id: joinGroupInput,
                room_name: fetchedRoomName
            }])
        setCurrentRoom(joinGroupInput);
        setJoinGroupInput('');
    }

    // Sent message
    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        let timeStamp = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
        const { data, error } = await supabase
            .from('messages')
            .insert([{
                created_at: timeStamp,
                message: message,
                sent_by_user: user,
                room_id: currentRoom
            },])
        console.log(message);
        setMessage('');
        setMessageByte(0);
        setMessageWordCount(0);
    }

    // fetch message / notes
    useEffect(async () => {
        let { data: messages, error } = await supabase
            .from('messages')
            .select('*')
            .eq('room_id', currentRoom)
            .order('id', { ascending: false });
        setMessagesArray(messages);
    }, [message, currentRoom])

    useEffect(async () => {
        let { data: notes, error } = await supabase
            .from('notes')
            .select('*')
            .eq('room_id', user.id)
            .order('id', { ascending: false });
        setMessagesNotesArray(notes);
    }, [message, currentRoom])

    useEffect(async () => {
        let { data: users, error } = await supabase
            .from('users')
            .select('*')
            .eq('user_id', user.id)
            .order('id', { ascending: false });
        setGroupsArray(users);
    }, [message])
    console.log(messagesArray)

    useEffect(async () => {
        let timeStamp = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }).split(' ')[0];
        let reFormattedTime = `${timeStamp.split('/')[0]}-${timeStamp.split('/')[1]}-${timeStamp.split('/')[2]}T23:30:30+00:00`;
        console.log(reFormattedTime)
        const { data, error } = await supabase
            .from('messages')
            .delete()
            .gte("created_at", reFormattedTime)
    }, [message])

    // Signout
    const router = useRouter();
    const signout = async () => {
        await supabase.auth.signOut()
        router.push("/signin");
    }

    return (
        <>
            {
                user ?
                    <div className="container">
                        <a href="/">&lt; Navigate back</a>
                        <div className="chatAppContainer">
                            <section>
                                <h3>Notes</h3>
                                <div className="messagesContainer">
                                    {messagesNotesArray === null || currentRoom ?
                                        messagesNotesArray.map(props =>
                                            <TextMessageNote
                                                room={currentRoom}
                                                whoSaid={props.who_said}
                                                message={props.message}
                                            />
                                        ) :
                                        <p>
                                            ShedLive cannot save more than 20 Notes.
                                            <br />
                                            (notes that are not shown are automatically delete).
                                        </p>
                                    }
                                </div>
                            </section>
                            <section>
                                <div >
                                    <h3>Chat</h3>
                                    {currentRoom &&
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <h4>Current Room ID:</h4>
                                            <code>{currentRoom}</code>
                                        </div>
                                    }
                                </div>
                                <div className="messagesContainer">
                                    {messagesArray === null || currentRoom ?
                                        messagesArray.map(props =>
                                            <TextMessage
                                                inspectUserData={() => {
                                                    setOpenUserToggle(true);
                                                    setAddGroupToggle(false);
                                                    setInspectedUser([
                                                        props.sent_by_user.user_metadata.first_name,
                                                        props.sent_by_user.id,
                                                        props.sent_by_user.email,
                                                        props.sent_by_user.last_sign_in_at,
                                                        props.sent_by_user.identities[0].last_sign_in_at.split('T')[0],
                                                        props.sent_by_user.identities[0].last_sign_in_at.split('T')[1],
                                                    ])
                                                }}
                                                name={props.sent_by_user.user_metadata.first_name}
                                                message={props.message}
                                                time={props.created_at}
                                            />
                                        ) :
                                        <div>
                                            <h2>Get Started !</h2>
                                            <ol>
                                                <li>Join an existing group or create your own group</li>
                                                <li>In case you create your own group, make sure to ask your friends what their user ID's are.</li>
                                                <li>Once you added their user ID's you can start chatting!</li>
                                            </ol>
                                            <p>
                                                In case your messages are not showing, please note that ShedLive deletes messages after 24 hours have past.
                                                <br />
                                                <br />
                                                Make sure to preserve important messages through the notes feature.
                                            </p>
                                        </div>
                                    }
                                    <p>All messages will be deleted on 23:30:30 today.</p>
                                </div>
                                {messagesNotesArray === null || currentRoom &&
                                    <form className="shedForm" style={{ marginTop: '1em' }} onSubmit={handleMessageSubmit}>
                                        <input
                                            placeholder="Type text message"
                                            onChange={handleMessageChange}
                                            value={message}
                                        />
                                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5em' }}>
                                            <p style={{ margin: 'auto' }}>Sending as {user.user_metadata.first_name}</p>
                                            <p style={{ margin: 'auto' }}>{messageByte} Bytes</p>
                                            <p style={{ margin: 'auto' }}>{messageWordCount} Words</p>
                                            <ShedButton
                                                disabled={!message}
                                                type="submit"
                                                click={handleMessageSubmit}
                                                icon={<VscMail />}
                                                name="Send"
                                            />
                                        </div>
                                    </form>
                                }
                            </section>
                            <section>
                                <div style={{ textAlign: 'right', marginBottom: '2em' }}>
                                    <h2 style={{ marginBottom: '0.1em' }}>ShedLive</h2>
                                    <p style={{ marginTop: '0.1em' }}>More than just a chat app</p>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5em' }}>
                                    <ShedButton
                                        click={() => {
                                            openUserToggle === true ?
                                                setOpenUserToggle(false) : setOpenUserToggle(true); setAddGroupToggle(false);
                                        }}
                                        icon={
                                            openUserToggle === true ?
                                                <VscChevronUp /> : <VscAccount />
                                        }
                                        name="Profile inspector"
                                    />
                                    <ShedButton
                                        // disabled={openUserToggle}
                                        click={() => {
                                            addGroupToggle === true ?
                                                setAddGroupToggle(false) : setAddGroupToggle(true);
                                            setOpenUserToggle(false);
                                        }}
                                        icon={
                                            addGroupToggle === true ?
                                                <VscChevronUp /> : <VscAdd />
                                        }
                                        name="Join / Create"
                                    />
                                    <ShedButton
                                        click={signout}
                                        icon={<VscSignOut />}
                                        name="Sign Out"
                                    />
                                </div>
                                {openUserToggle == true &&
                                    <div>
                                        <h4>{inspectedUser ? inspectedUser[0] + `'s` : user.user_metadata.first_name + `'s`} Profile Info</h4>
                                        <table>
                                            <tr>
                                                <th>Descriptor</th>
                                                <th>Data</th>
                                            </tr>
                                            <tr>
                                                <td>Username</td>
                                                <td>{inspectedUser ? inspectedUser[0] : user.user_metadata.first_name}</td>
                                            </tr>
                                            <tr>
                                                <td>User ID</td>
                                                <td>{inspectedUser ? inspectedUser[1] : user.id}</td>
                                            </tr>
                                            <tr>
                                                <td>Email Address</td>
                                                <td>{inspectedUser ? inspectedUser[2] : user.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Last Signed In Date</td>
                                                <td>{inspectedUser ? inspectedUser[3] : user.last_sign_in_at.split("T")[0]}</td>
                                            </tr>
                                            <tr>
                                                <td>Last Signed In Time</td>
                                                <td>{inspectedUser ? inspectedUser[4] : user.last_sign_in_at.split("T")[1]}</td>
                                            </tr>
                                        </table>
                                    </div>
                                }
                                {addGroupToggle == true &&
                                    <div>
                                        <h3 style={{ marginBottom: '0.5em' }}>Join a Shed</h3>
                                        {generateRoom &&
                                            <div>
                                                <h4>Generated Room ID:</h4>
                                                <code>{generateRoom}</code>
                                                <p>Copy the room ID above and insert it into the input below so that you can join the room you created.</p>
                                            </div>
                                        }
                                        <form className="shedForm" style={{ marginTop: '1em' }} onSubmit={handleCreateGroup}>
                                            <p>Join an existing shedlive group. When you insert the group ID make sure the group name is the group your intend to join.</p>
                                            {joinGroupInput &&
                                                <p>
                                                    Searching for group . . .
                                                    <br />
                                                    {fetchedRoomName && `Found group name: ${fetchedRoomName}`}
                                                </p>
                                            }
                                            <input
                                                placeholder="Group ID"
                                                onChange={(e) => setJoinGroupInput(e.target.value)}
                                                value={joinGroupInput}
                                            />
                                            <ShedButton
                                                disabled={!fetchedRoomName}
                                                type="submit"
                                                click={handleJoinGroup}
                                                icon={<VscActivateBreakpoints />}
                                                name="Join a group"
                                            />
                                        </form>
                                        <h3 style={{ marginBottom: '0.5em' }}>Create a Shed</h3>
                                        <form className="shedForm" style={{ marginTop: '1em' }} onSubmit={handleCreateGroup}>
                                            <p>A shedlive group requires a minimum of 3 people</p>
                                            <input
                                                placeholder="New group name"
                                                onChange={(e) => setGroupNameInput(e.target.value)}
                                                value={groupNameInput}
                                            />
                                            <ShedButton
                                                disabled={!groupNameInput}
                                                type="submit"
                                                click={handleCreateGroup}
                                                icon={<VscActivateBreakpoints />}
                                                name="Create group"
                                            />
                                        </form>
                                    </div>

                                }
                                <div>
                                    {!user ?
                                        <p>
                                            Nobody is in your contacts list.
                                            <br />
                                            Click the buttton above to add somebody to your contacts list.
                                        </p> :
                                        <div className="chatContacts">
                                            {groupsArray ? groupsArray.map((props) => {
                                                return <ContactsChip
                                                    click={() => setCurrentRoom(props.room_id)}
                                                    type={'standard'}
                                                    name={props.room_name}
                                                    id={props.room_id}
                                                />
                                            }) :
                                                <p>
                                                    You are not in any groups.
                                                    <br />
                                                    <br />
                                                    (You can go ahead and create one and invite your friends and family, or join an existing one).
                                                </p>
                                            }
                                        </div>
                                    }
                                </div>
                            </section>
                        </div>
                    </div > :
                    <h1>You havent created an account</h1>
            }
        </>
    )
}
