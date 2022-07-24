import React, { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';

Modal.setAppElement('#__next');
import Modal from 'react-modal';
import Button from '../../lib/button-component/Button';
import GhenInterpreter from '../../lib/GhenInterpreter';

import moment from 'moment';
import 'moment/locale/ja'
import AlignItems from '../../lib/style-component/AlignItems';
import GridItems from '../../lib/style-component/GridItems';
import SmallButton from '../../lib/button-component/SmallButton';

function IndivisualPrate() {
    const router = useRouter();
    const messageId = router.query.id;

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
        messageId && fetchMessage();
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
                    <SmallButton
                        onClick={()=>{copiedContent();}}
                    >
                        ユーザーIDをコピー
                    </SmallButton>
                </header>
            }
            <div className="bodyPadding">
                {message && 
                    <div
                        style={{
                            boxShadow:'var(--boxShadow)', borderRadius:'var(--borderRadius2)',border:'var(--baseBorder2)'
                        }}
                    >
                        <AlignItems spaceBetween={true} margin={'1em'}>
                            {userInfo && <AlignItems gap={'1em'}>
                                <img
                                    style={{
                                        borderRadius:'var(--borderRadius1)',
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
                                    onClick={() =>router.push(`/rooms/${message.room_id}`)}
                                >
                                    送信先の部屋
                                </Button>
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

export default IndivisualPrate