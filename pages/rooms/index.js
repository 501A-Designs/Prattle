import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import { supabase } from '../../utils/supabaseClient'
import { useRouter } from "next/router";
import Button from '../../lib/Button';
import PrateTypeButton from '../../lib/PrateTypeButton';

import { VscSignOut, VscLock, VscComment, VscCommentDiscussion, VscActivateBreakpoints,VscClose } from "react-icons/vsc";
import { IconContext } from "react-icons";

import { v4 as uuidv4 } from 'uuid';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GridItems from '../../lib/style-component/GridItems';

import Modal from 'react-modal';
import SmallButton from '../../lib/SmallButton';
Modal.setAppElement('#__next');

export default function Home() {
    const [modalContent, setModalContent] = useState('');
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

    const copyRoomId = () => {
        navigator.clipboard.writeText(generateRoom);
        // toast("Copied room code")
    };
    const user = supabase.auth.user();
    const [groupNameInput, setGroupNameInput] = useState();
    const [joinGroupInput, setJoinGroupInput] = useState();
    const [generateRoom, setGeneratedRoom] = useState()

    const [fetchedRoomName, setFetchedRoomName] = useState('');

    const fetchRoomName = async () => {
        let { data: rooms, error } = await supabase
            .from('rooms')
            .select('*')
            .eq('room_id', joinGroupInput);
        setFetchedRoomName(rooms[0].room_name);
    }

    useEffect(() => {
        fetchRoomName
    }, [joinGroupInput])

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

    const router = useRouter();
    const [currentRoom, setCurrentRoom] = useState();
    useEffect(() => {
        if (currentRoom != undefined) {
            router.push(`/chats/${currentRoom}`)
        }
    }, [currentRoom])

    const signout = async () => {
        await supabase.auth.signOut()
        router.push("/signin");
    }

    return (
        <div className="bodyPadding">
            {user ?
                <>
                <Modal
                    isOpen={modalIsOpen}
                    style={modalStyle}
                >
                    <SmallButton
                        click={() => closeModal()}
                        icon={<VscClose />}
                        right={true}
                    />
                    {modalContent === 'join' && <div>
                        <h3>Join a Room</h3>
                        {generateRoom &&
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <h4>Generated Room ID:</h4>
                                    <code onClick={copyRoomId}>{generateRoom}</code>
                                </div>
                                <p>
                                    Copy the room ID by clicking the above and insert it into the input below so that you can join the room you created.
                                </p>
                            </div>
                        }
                        <form
                            className="shedForm"
                            style={{ marginTop: '1em' }}
                            onSubmit={handleCreateGroup}
                        >
                            <p>
                                Join an existing prattle room. When you insert the room ID make sure the room name is the room you intend to join.
                            </p>
                            {joinGroupInput &&
                                <p>
                                    Searching for private room . . .
                                    <br />
                                    {fetchedRoomName && `Found group name: ${fetchedRoomName}`}
                                </p>
                            }
                            <input
                                placeholder="Group ID"
                                onChange={(e) => setJoinGroupInput(e.target.value)}
                                value={joinGroupInput}
                            />
                            <Button
                                click={async (e) => {
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
                                }}
                                disabled={!fetchedRoomName}
                                type="submit"
                                icon={<VscActivateBreakpoints />}
                                name="Join room"
                            />
                        </form>
                    </div>}
                    {modalContent === 'create' && <div>
                            <h3>Create A Room</h3>
                            <form
                                className="shedForm"
                                style={{ marginTop: '1em' }}
                                onSubmit={handleCreateGroup}
                            >
                                <p>Name your new prattle room. You can add emojis and be creative ;)</p>
                                <input
                                    placeholder="New room name"
                                    onChange={(e) => setGroupNameInput(e.target.value)}
                                    value={groupNameInput}
                                />
                                <input
                                    placeholder="Room banner image URL *Optional"
                                    // onChange={(e) => setGroupNameInput(e.target.value)}
                                    // value={groupNameInput}
                                />
                                <Button
                                    disabled={!groupNameInput}
                                    type="submit"
                                    click={handleCreateGroup}
                                    icon={<VscActivateBreakpoints />}
                                    name="Create Room"
                                />
                            </form>
                    </div>
                    }
                </Modal>
                {/* <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                /> */}
                <GridItems grid={'1fr'}>
                    <div>
                        <h2>Get Started</h2>
                        <ol>
                            <li>Join an existing group or create your own group</li>
                            <li>In case you create your own group, make sure share the generated group ID to your friends and family so that they can join.</li>
                            <li>Once you added their join the chat just start chatting live!</li>
                        </ol>
                        <p>
                            In case your messages are not showing, please note that Prattle deletes messages after 24 hours have past. Make sure to preserve important messages through the notes feature. Also, chat contents will not update unless you start typing. ShedLive aims to emulate traditional conversations and the ability to only listen when the person is present.
                        </p>
                        <Button
                            click={signout}
                            icon={<VscSignOut />}
                            name="Sign Out"
                        />
                    </div>
                    <hr />
                    <div>
                        <h2>Join / Create a new room</h2>
                        <p>
                            This page [rooms] is a directory containing your chat rooms. If you have already joined a room, you can add you room id after this url with a back slash to jump to your intended chat room as seen below.
                        </p>
                        <code>
                            prattle.vercel.app/rooms/[room id]
                        </code>
                        <h3>Whats next?</h3>
                        <GridItems grid={'1fr 1fr 1fr'}>
                            <PrateTypeButton
                                click={() => {
                                    openModal();
                                    setModalContent('join');
                                }}
                                icon={<VscLock />}
                                name={'Join A Private Room'}
                            />
                            <PrateTypeButton
                                click={() => {
                                    openModal();
                                    setModalContent('create');
                                }}
                                icon={<VscComment />}
                                name={'Create A Room'}
                            />
                            <PrateTypeButton
                                click={() => {
                                    router.push('/browse')
                                }}
                                icon={<VscCommentDiscussion />}
                                name={'Browse Public Rooms'}
                            />
                        </GridItems>
                    </div>
                </GridItems>
                </> :
                <h1>You are logged out</h1>
            }
        </div>
    )
}
