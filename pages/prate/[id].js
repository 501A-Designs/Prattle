import React, { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import { VscLinkExternal } from "react-icons/vsc";

Modal.setAppElement('#__next');
import Modal from 'react-modal';
import TextMessage from '../../lib/room-component/TextMessage'
import Button from '../../lib/button-component/Button';
import GhenInterpreter from '../../lib/GhenInterpreter';

import moment from 'moment';
import 'moment/locale/ja'
import AlignItems from '../../lib/style-component/AlignItems';
import GridItems from '../../lib/style-component/GridItems';

function IndivisualPrate({ messageId }) {
    const router = useRouter()
    const user = supabase.auth.user();
    const [message, setMessage] = useState();

    const [userInfo, setUserInfo] = useState();
    const fetchMessage = async () => {
        let { data: message, error } = await supabase
            .from('messages')
            .select('*')
            .eq('id', messageId);
        setMessage(message[0]);
        fetchProfileInfo();
    }
        
    useEffect(() => {
        fetchMessage();
    }, [messageId])

    const fetchProfileInfo = async () => {
        if (message !== undefined) {
            console.log('profiles');
            let { data: profiles, error } = await supabase
                .from('profiles')
                .select("*")
                .eq('id', message.sent_by_user);
            setUserInfo(profiles[0]);
        }
    }
    useEffect(() => {
        fetchProfileInfo();
    }, [message])

    const copiedContent = () => {
        navigator.clipboard.writeText(`${userInfo.id} `);
        toast('ユーザーIDがコピーされました。');
    }

    return (
        <>
            {user &&           
                <header>
                    <Button
                        click={()=>{copiedContent();}}
                        name="ユーザーIDをコピー"
                    />
                </header>
            }
            <div className="bodyPadding">
                {/* <ProfileInfo profileId={profileId}/> */}
                {message && <div style={{boxShadow:'var(--boxShadow)', borderRadius:'var(--borderRadius)',border:'var(--baseBorder2)'}}>
                        <AlignItems spaceBetween={true} margin={'1em'}>
                            {userInfo && <AlignItems gap={'1em'}>
                                <img
                                    style={{
                                        borderRadius:'calc(var(--borderRadius)*50)',
                                        width:'3em',
                                        height:'3em',
                                        border:'var(--baseBorder2)',
                                        boxShadow:'var(--boxShadow)',
                                    }}
                                    src={userInfo.profile.user_image}
                                />
                                <GridItems gap={'0'}>
                                   <h3 style={{margin:0, padding:0}}>{userInfo.profile.first_name}</h3>
                                    <time className={'messageTime'}>{moment(message.created_at).subtract(9, 'hours').fromNow()}</time>
                                </GridItems>
                            </AlignItems>}
                            <AlignItems>
                                <Button
                                    name={'送信先の部屋'}
                                    icon={<VscLinkExternal/>}
                                    click={() =>router.push(`/rooms/${message.room_id}`)}
                                />
                            </AlignItems>
                        </AlignItems>
                        <hr/>
                        <div style={{margin:'1em'}}>
                            <GhenInterpreter inputValue={message.message}/>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export async function getServerSideProps({ params }) {
  let messageId = params.id;
  return {
    props: { messageId },
  }
}

export default IndivisualPrate