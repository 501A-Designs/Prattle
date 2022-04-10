import React, { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import AlignItems from './style-component/AlignItems';
import { useRouter } from "next/router";
import SmallButton from './button-component/SmallButton';
import {VscLink,VscDeviceCamera,VscTwitter,VscSymbolFile,VscVmRunning } from "react-icons/vsc";


export default function ProfileInfo(props) {
    let profileId = props.profileId;
    const router = useRouter();

    const [userInfo, setUserInfo] = useState('');

    const [websiteData, setWebsiteData] = useState();
    const [instagramData, setInstagramData] = useState();
    const [twitterData, setTwitterData] = useState();
    const [noteData, setNoteData] = useState();
    const [youtubeData, setYoutubeData] = useState();

    const fetchProfileInfo = async () => {
        let { data: profiles, error } = await supabase
            .from('profiles')
            .select("*")
            .eq('id', profileId);
        setUserInfo(profiles[0]);
        setWebsiteData(profiles[0].social_networks.website);
        setInstagramData(profiles[0].social_networks.instagram);
        setTwitterData(profiles[0].social_networks.twitter);
        setNoteData(profiles[0].social_networks.note);
        setYoutubeData(profiles[0].social_networks.youtube);
    }

    useEffect(() => {
        fetchProfileInfo();
    },[profileId])

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
                        onClick={() =>{
                            router.push('/profile/'+profileId)
                        }}
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
                        {!props.hideUserInfo && <p>{userInfo && userInfo.profile.user_profile}</p>}
                        {!props.hideUserInfo && <AlignItems scroll={true}>
                            {websiteData &&
                                <SmallButton
                                    icon={<VscLink/>}
                                    name="リンク"
                                    click={()=> window.open(`${websiteData}`, "_blank")}
                                />
                            }
                            {instagramData &&
                                <SmallButton
                                    icon={<VscDeviceCamera/>}
                                    name="Instagram"
                                    click={()=> window.open(`${instagramData}`, "_blank")}
                                />
                            }
                            {twitterData &&
                                <SmallButton
                                    icon={<VscTwitter/>}
                                    name="Twitter"
                                    click={()=> window.open(`${twitterData}`, "_blank")}
                                />
                            }
                            {noteData &&                                        
                                <SmallButton
                                    icon={<VscSymbolFile/>}
                                    name="note"
                                    click={()=> window.open(`${noteData}`, "_blank")}
                                />
                            }
                            {youtubeData &&                                        
                                <SmallButton
                                    icon={<VscVmRunning/>}
                                    name="YouTube"
                                    click={()=> window.open(`${youtubeData}`, "_blank")}
                                />
                            }
                        </AlignItems>}
                        {props.children}
                    </div>
                </AlignItems>
            </div>:
            <h3>プロフィール処理中...</h3>
            }
        </>
    )
}
