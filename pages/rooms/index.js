import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify';

import { supabase } from '../../utils/supabaseClient'
import { useRouter } from "next/router";
import Button from '../../lib/Button';
import PrateTypeButton from '../../lib/PrateTypeButton';

import { VscSignOut, VscLock, VscComment, VscCommentDiscussion, VscActivateBreakpoints,VscClose } from "react-icons/vsc";

import { v4 as uuidv4 } from 'uuid';
import GridItems from '../../lib/style-component/GridItems';

import Modal from 'react-modal';
import SmallButton from '../../lib/SmallButton';
import Card from '../../lib/Card';
import AlignItems from '../../lib/style-component/AlignItems';
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

    const user = supabase.auth.user();
    const router = useRouter();

    // input state
    const [groupNameInput, setGroupNameInput] = useState();
    const [groupImageInput, setGroupImageInput] = useState();
    const [groupDescriptionInput, setGroupDescriptionInput] = useState();
    const [roomPublic, setRoomPublic] = useState(false);
    const [roomEditable, setRoomEditable] = useState(false);
    function toggleRoomPublic(value){
        return !value;
    }
    function toggleRoomEditable(value){
        return !value;
    }
    const [status, setStatus] = useState('');

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
                    room_public: roomPublic,
                    description:groupDescriptionInput,
                    room_editable: roomEditable,
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
                                <p>Name your new prattle room. You can add emojis and be creative ;)
                                    <br />
                                    *Note, descriptions cannot be no longer than 40 characters long.
                                </p>
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
                                {groupDescriptionInput &&
                                    <>
                                        {groupDescriptionInput.split('').length > 40 && <p style={{color: 'red'}}>Description exceeds character limit!</p>}
                                    </>
                                }
                                <AlignItems>
                                    <input
                                        type="checkbox"
                                        checked={roomPublic}
                                        onChange={()=>setRoomPublic(toggleRoomPublic)}
                                    />
                                    <label>Enable <a target="_blank" href="/usage">public sharing</a></label>
                                </AlignItems>
                                <AlignItems>
                                    <input
                                        type="checkbox"
                                        checked={roomEditable}
                                        onChange={()=>{setRoomEditable(toggleRoomEditable)}}
                                    />
                                    <label>Show room in the <a target="_blank" href="/browse">browse page</a></label>
                                </AlignItems>
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
                    <h1>Create</h1>
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
                    <h3>Domain nav</h3>
                    <GridItems>
                        <h4 style={{marginBottom:'0.5em'}}>Rooms</h4>
                        <code>
                            prattle.vercel.app/rooms/[room id]
                        </code>
                        <h4 style={{marginBottom:'0.5em'}}>Profile Info</h4>
                        <code>
                            prattle.vercel.app/profile/[profile id]
                        </code>
                    </GridItems>
                </div>
                </> :
                <h1>You are logged out</h1>
            }
        </div>
    )
}
