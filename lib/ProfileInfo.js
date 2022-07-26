import React, { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import AlignItems from './style-component/AlignItems';
import { useRouter } from "next/router";

import { FiInstagram, FiLink, FiTwitter,FiFile,FiYoutube } from 'react-icons/fi';
import IconButton from './button-component/IconButton';


export default function ProfileInfo(props) {
    let profileId = props.profileId;
    const router = useRouter();
    const [userInfo, setUserInfo] = useState('');

    const fetchProfileInfo = async () => {
        let { data, error } = await supabase
            .from('profiles')
            .select("*")
            .eq('id', profileId);
        setUserInfo(data[0]);
    }

    useEffect(() => {
        fetchProfileInfo();
    },[profileId])

    return (
        <>
            {userInfo ?
            <AlignItems
                spaceBetween
                style={{
                    marginBottom:'2em'
                }}
            >
                <AlignItems gap={'1.5em'}>
                    <img
                        onClick={() =>{router.push('/profile/'+profileId)}}
                        src={userInfo.profile.picture}
                        style={{
                            width: '5em',
                            height: '5em',
                            borderRadius:'var(--borderRadius2)',
                            border:'var(--baseBorder2)',
                            margin:0,
                            backgroundColor:'var(--baseColor0)'
                        }}
                    />
                    <div>
                        <h2 style={{margin:0}}>{userInfo.profile.name}</h2>
                        <p>{userInfo && userInfo.additional_info.user_profile}</p>
                    </div>
                </AlignItems>
                <AlignItems>
                    {userInfo.additional_info.website &&
                        <IconButton
                            onClick={()=> window.open(`${userInfo.additional_info.website}`, "_blank")}
                        >
                            <FiLink/>
                        </IconButton>
                    }
                    {userInfo.additional_info.instagram &&
                        <IconButton
                            onClick={()=> window.open(`${userInfo.additional_info.instagram}`, "_blank")}
                        >
                            <FiInstagram/>
                        </IconButton>
                    }
                    {userInfo.additional_info.twitter &&
                        <IconButton
                            onClick={()=> window.open(`${userInfo.additional_info.twitter}`, "_blank")}
                        >
                            <FiTwitter/>
                        </IconButton>
                    }
                    {userInfo.additional_info.note &&                                        
                        <IconButton
                            onClick={()=> window.open(`${userInfo.additional_info.note}`, "_blank")}
                        >
                            <FiFile/>
                        </IconButton>
                    }
                    {userInfo.additional_info.youtube &&                                        
                        <IconButton
                            onClick={()=> window.open(`${userInfo.additional_info.youtube}`, "_blank")}
                        >
                            <FiYoutube/>
                        </IconButton>
                    }
                </AlignItems>
            </AlignItems>:
            <h3>プロフィール処理中...</h3>
            }
        </>
    )
}
