import React, { useState } from 'react'
import Link from 'next/link'

import { supabase } from '../../utils/supabaseClient'
import { useRouter } from "next/router";
import Button from '../../lib/button-component/Button';
import PrateTypeButton from '../../lib/PrateTypeButton';

import { VscComment, VscCommentDiscussion, VscActivateBreakpoints,VscClose } from "react-icons/vsc";

import { v4 as uuidv4 } from 'uuid';
import GridItems from '../../lib/style-component/GridItems';

import Modal from 'react-modal';
import SmallButton from '../../lib/button-component/SmallButton';
import AlignItems from '../../lib/style-component/AlignItems';
import { isMobile, MobileView } from 'react-device-detect';
import StaticScreen from '../../lib/scene-component/StaticScreen';
import CenterAll from '../../lib/style-component/CenterAll';
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
            width: 'auto',
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
        <CenterAll>
            {user ?
                <>
                    {!status ? 
                        <form
                        className="shedForm"
                        style={{ marginTop: '1em' }}
                        onSubmit={handleCreateGroup}
                        >
                            <h3>新規作成</h3>
                            <p>部屋の名前を指定してください。絵文字等を使用してクリエイティブになろう ;)
                                <br />
                                *概要は40字以上入力できません
                            </p>
                            <input
                                placeholder="部屋名"
                                onChange={(e) => setGroupNameInput(e.target.value)}
                                value={groupNameInput}
                            />
                            <input
                                placeholder="バナー画像URL *任意"
                                onChange={(e) => setGroupImageInput(e.target.value)}
                                value={groupImageInput}
                            />
                            <input
                                placeholder="部屋の概要 *任意"
                                onChange={(e)=> setGroupDescriptionInput(e.target.value)}
                                value={groupDescriptionInput}
                            />
                            {groupDescriptionInput &&
                                <>
                                    {groupDescriptionInput.split('').length > 40 && <p style={{color: 'red'}}>40字以上です！</p>}
                                </>
                            }
                            <AlignItems>
                                <input
                                    type="checkbox"
                                    checked={roomPublic}
                                    onChange={()=>setRoomPublic(toggleRoomPublic)}
                                />
                                <label><Link target="_blank" href="/usage">パブリックシェア</Link>を有効化</label>
                            </AlignItems>
                            <AlignItems>
                                <input
                                    type="checkbox"
                                    checked={roomEditable}
                                    onChange={()=>{setRoomEditable(toggleRoomEditable)}}
                                />
                                <label>部屋を<Link target="_blank" href="/browse">ブラウズページ</Link>やプロフィールに表示化</label>
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
                </>:
                <StaticScreen type='notLoggedIn'/>
            }
        </CenterAll>
    )
}
