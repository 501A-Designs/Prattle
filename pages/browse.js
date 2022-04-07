import React,{ useState, useEffect} from 'react'
import { supabase } from '../utils/supabaseClient'

import RoomThumbNail from '../lib/RoomThumbNail'
import GridItems from '../lib/style-component/GridItems'
import VisibilityTag from '../lib/tag-component/VisibilityTag';
import AlignItems from '../lib/style-component/AlignItems';
import { isMobile } from 'react-device-detect';
import Button from '../lib/button-component/Button';
import TextMessage from '../lib/room-component/TextMessage';

export default function Browse() {
    const user = supabase.auth.user();
    const [allPublicRooms, setAllPublicRooms] = useState();

    const [searchInput, setSearchInput] = useState([]);
    const [searchStatus, setSearchStatus] = useState()
    const [searchedMessages, setSearchedMessages] = useState([]);

    let fetchAllRooms = async () => {
      let { data: publicRooms, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('room_public', true);
      setAllPublicRooms(publicRooms);
      console.log('fetched');
      setSearchedMessages();
      setSearchStatus();
    }
    useEffect(() => {
      fetchAllRooms();
      setSearchedMessages();
    }, [])

    if (searchInput.length === 0) {()=>{fetchAllRooms()}}
    const handleSearchSubmit = async (e) =>{
      e.preventDefault();
      setSearchStatus('querying');
      const { data: roomData, roomError } = await supabase
        .from('rooms')
        .select()
        .eq('room_public', true)
        .textSearch('description', `${searchInput}`);
      setAllPublicRooms(roomData);
      const { data: messageData, messageError } = await supabase
        .from('messages')
        .select()
        .textSearch('message', `${searchInput}`)
        .order('created_at', { ascending: false });
      setSearchedMessages(messageData)
      setSearchStatus('executed')
    }
    console.log(searchStatus);

  return (
    <div className="bodyPadding">
        <h1>Prattle Rooms</h1>
        <h4>他の人がどうしてるを確認してみよう</h4>
        <br />
        <form
          className="shedAlignedForm"
          onSubmit={handleSearchSubmit}
        >
            <input
                placeholder="Prattleの部屋・投稿を検索"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
            />
            <Button
                disabled={!searchInput}
                type="submit"
                click={handleSearchSubmit}
                // icon={<VscMail />}
                name="検索"
            />
        </form>
        <br/>
        <AlignItems spaceBetween={true}>
          <GridItems>
            <AlignItems>
              <VisibilityTag
                size={'small'}
                isEditable={true}
              />
              <label>自分も会話に参加できる部屋</label>
            </AlignItems>
            <AlignItems>
              <VisibilityTag
                size={'small'}
                isEditable={false}
              />
              <label>閲覧のみの部屋</label>
            </AlignItems>
          </GridItems>
          <Button click={fetchAllRooms} name="全部屋表示"/>
        </AlignItems>
        
        <br/>
        <AlignItems margin={'0 0 2em 0em'}>
          {searchStatus == 'querying' && 
            <>
              <img src="https://i.gifer.com/ZZ5H.gif" width="30px" height="30px"/>
              <h2 style={{margin:0}}>Prattle内を検索中...</h2>
            </>
          }
          {searchStatus == 'executed' &&
            <>
              {allPublicRooms &&
                <GridItems>
                  <h2 style={{margin:0}}>{allPublicRooms.length}件ヒット</h2>
                  {allPublicRooms.length === 0 && <p>違うキーワードを使ってまた調べてみよう！</p>}
                </GridItems>
              }
            </>
          }
        </AlignItems>
        <div className="grid triGrid">
            {allPublicRooms && allPublicRooms.map(props=>
                <RoomThumbNail
                    key={props.room_id}
                    backgroundImage={props.background_image}
                    roomName={props.room_name}
                    roomCode={props.room_id}
                    description={props.description}
                    user={user}
                    isEditable={props.room_editable}
                    // src={''}
                    // author={'bruhh they'}
                />
            )}
        </div>
        <br/>
        <GridItems>
          {searchedMessages && <>          
            {searchedMessages.length !== 0 && <h3 style={{marginBottom:'0.5em'}}>Prate投稿{searchedMessages.length}件ヒット</h3>}
              {searchedMessages && searchedMessages.map(props =>
                <TextMessage
                  hideThread={true}
                  style={{border:'var(--baseBorder1)',borderRadius:'var(--borderRadius)', boxShadow:'var(--boxShadow)',padding:'0.5em'}}
                  key={props.message}
                  messageId={props.id}
                  // currentRoom={roomId}
                  id={props.sent_by_user}
                  message={props.message}
                  time={props.created_at}
                  // roomCreator={roomInfo.room_creator}
                  // roomEditable={roomInfo.room_editable}
                />  
              )}
          </>}
        </GridItems>
    </div>
  )
}
