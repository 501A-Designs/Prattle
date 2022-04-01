import React, { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import AlignItems from './style-component/AlignItems';
import { useRouter } from "next/router";
import Button from './button-component/Button';

export default function ProfileInfo(props) {
    let profileId = props.profileId;
    const router = useRouter();

    const [userInfo, setUserInfo] = useState('');

    const fetchProfileInfo = async () => {
        let { data: profiles, error } = await supabase
            .from('profiles')
            .select("*")
            .eq('id', profileId);
        setUserInfo(profiles[0]);
    }
    useEffect(() => {
        fetchProfileInfo();
    },[profileId])
    console.log(userInfo);

    const profileInfo={
        borderRadius: 'calc(var(--borderRadius)*1)',
        padding: '0.5em',
        margin: '1em 0'
    }

    return (
        <>
            {userInfo ?
            <div style={profileInfo}>
                <AlignItems gap={'1.5em'}>
                    <img
                        src={userInfo && userInfo.profile.user_image}
                        style={{
                            width: '5em',
                            height: '5em',
                            borderRadius:'calc(var(--borderRadius)*50)',
                            margin:0,
                            boxShadow: 'var(--boxShadow)',
                            backgroundColor:'var(--baseColor0)'
                        }}
                    />
                    <div>
                        <h2 style={{margin:0}}>{userInfo && userInfo.profile.first_name}</h2>
                        <p>{userInfo && userInfo.profile.user_profile}</p>
                        <Button name="フォロー" size={'medium'}/>
                    </div>
                </AlignItems>
            </div>:
            <h3>プロフィール処理中...</h3>
            }
        </>
    )
}
