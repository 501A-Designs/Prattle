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
    const [searchedMessages, setSearchedMessages] = useState([]);

    let fetchAllRooms = async () => {
      let { data: publicRooms, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('room_public', true);
      setAllPublicRooms(publicRooms);
      console.log('fetched');
      setSearchedMessages();
    }
    useEffect(() => {
      fetchAllRooms();
      setSearchedMessages();
    }, [])

    if (searchInput.length === 0) {()=>{fetchAllRooms()}}
    const handleSearchSubmit = async (e) =>{
      e.preventDefault();
      const { data: roomData, roomError } = await supabase
        .from('rooms')
        .select()
        .eq('room_public', true)
        .textSearch('description', `${searchInput}`);
      setAllPublicRooms(roomData);
      const { data: messageData, messageError } = await supabase
        .from('messages')
        .select()
        .textSearch('message', `${searchInput}`);
      setSearchedMessages(messageData)
      console.log(messageData)
    }

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
            {allPublicRooms && allPublicRooms.length === 0 && <GridItems><h1>あれ、、</h1><p>何も見つかりませんでした<br/>また違うキーワードを使って見てください</p></GridItems>}
        </div>
        <br/>
        <GridItems>
          {searchedMessages && <>          
            {searchedMessages.length !== 0 && <h3 style={{marginBottom:'0.5em'}}>Prate投稿</h3>}
              {searchedMessages && searchedMessages.map(props =>
                <TextMessage
                  hideThread={true}
                  style={{border:'var(--baseBorder1)',borderRadius:'var(--borderRadius)', boxShadow:'var(--boxShadow)'}}
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
