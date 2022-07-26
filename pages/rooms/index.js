import React, { useState } from 'react'

import { supabase } from '../../utils/supabaseClient'
import { useRouter } from "next/router";
import Button from '../../lib/button-component/Button';

import { v4 as uuidv4 } from 'uuid';

import Modal from 'react-modal';
import AlignItems from '../../lib/style-component/AlignItems';
import StaticScreen from '../../lib/scene-component/StaticScreen';
Modal.setAppElement('#__next');

export default function Home() {
  const user = supabase.auth.user();
  const router = useRouter();

  // input state
  const [groupNameInput, setGroupNameInput] = useState();
  const [groupImageInput, setGroupImageInput] = useState();
  const [groupDescriptionInput, setGroupDescriptionInput] = useState();
  const [roomPublic, setRoomPublic] = useState(false);
  const [roomEditable, setRoomEditable] = useState(false);
  function toggleRoomPublic(value){ return !value }
  function toggleRoomEditable(value){ return !value }

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
    <AlignItems center={true} className={'fadeIn centerAll'}>
      {user ?
        <>
          {!status ? 
            <form
              className="shedForm bodyPadding"
              style={{ marginTop: '1em' }}
              onSubmit={handleCreateGroup}
            >
              <h3>新規作成</h3>
              <p>
                部屋の名前を指定してください。絵文字等を使用してクリエイティブになろう ;)
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
              {/* <AlignItems>
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
              </AlignItems> */}
              <Button
                onClick={handleCreateGroup}
                disabled={!groupNameInput}
                type="submit"
                solid
              >
                部屋作成
              </Button>
            </form>:
            <p>{status}</p>
          }
        </>:
        <StaticScreen type='notLoggedIn'/>
      }
    </AlignItems>
  )
}
