import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify';

import { supabase } from '../../utils/supabaseClient'
import { useRouter } from "next/router";
import Button from '../../lib/Button';
import PrateTypeButton from '../../lib/PrateTypeButton';

import { VscSignOut, VscLock, VscComment, VscCommentDiscussion, VscActivateBreakpoints,VscClose } from "react-icons/vsc";

import { v4 as uuidv4 } from 'uuid';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GridItems from '../../lib/style-component/GridItems';

import Modal from 'react-modal';
import SmallButton from '../../lib/SmallButton';
import Card from '../../lib/Card';
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
        toast("Copied room code")
    };

    const user = supabase.auth.user();
    const router = useRouter();

    // input state
    const [groupNameInput, setGroupNameInput] = useState();
    const [groupImageInput, setGroupImageInput] = useState();
    const [groupDescriptionInput, setGroupDescriptionInput] = useState();
    const [status, setStatus] = useState('')

    // Create Group
    const handleCreateGroup = async (e) => {
        e.preventDefault();
        let roomIdValue = uuidv4();
        const { data, error } = await supabase
            .from('rooms')
            .insert(
                [{
                    room_name: groupNameInput,
                    room_id: roomIdValue,
                    background_image: groupImageInput,
                    room_creator:user.id,
                    room_public: true,
                    description:groupDescriptionInput,
                },]
            )
        setStatus('Loading...')
        router.push(`/rooms/${roomIdValue}`)
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
                    {modalContent === 'create' && <div>
                        <h3>Create A Room</h3>
                        {!status ? 
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
                                    onChange={(e) => setGroupImageInput(e.target.value)}
                                    value={groupImageInput}
                                />
                                <input
                                    placeholder="Room description *Optional"
                                    onChange={(e)=> setGroupDescriptionInput(e.target.value)}
                                    value={groupDescriptionInput}
                                />
                                <Button
                                    disabled={!groupNameInput}
                                    type="submit"
                                    click={handleCreateGroup}
                                    icon={<VscActivateBreakpoints />}
                                    name="Create Room"
                                />
                            </form>:
                            <p>{status}</p>
                        }
                    </div>
                    }
                </Modal>
                <div>
                    <h1>Join / Create a new room</h1>
                    <h3>Get started</h3>
                    <GridItems grid={'1fr 1fr'}>
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
                    <br/>
                    <p>
                        This page [rooms] is a directory containing your chat rooms. If you have already joined a room, you can add you room id after this url with a back slash to jump to your intended chat room as seen below.
                    </p>
                    <code onClick={()=> copyRoomId()}>
                        prattle.vercel.app/rooms/[room id]
                    </code>
                </div>
                </> :
                <h1>You are logged out</h1>
            }
        </div>
    )
}
