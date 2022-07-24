import React, { useState,useEffect} from 'react'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from "next/router";
import Button from '../../lib/button-component/Button';
import SmallButton from '../../lib/button-component/SmallButton';
import IconButton from '../../lib/button-component/IconButton';

import { VscAdd,VscEdit,VscSignOut,VscHome,VscSave,VscClose,VscLink,VscDeviceCamera,VscTwitter,VscSymbolFile,VscVmRunning } from "react-icons/vsc";
import AlignItems from '../../lib/style-component/AlignItems';
import Modal from 'react-modal/lib/components/Modal';
import GridItems from '../../lib/style-component/GridItems';
import StaticScreen from '../../lib/scene-component/StaticScreen';
import Header from '../../lib/Header';
import { modalStyle } from '../../modalStyle';
import { FiFile, FiInstagram, FiLink, FiPlus, FiTwitter, FiXCircle, FiYoutube } from 'react-icons/fi';

export default function Home() {
    const user = supabase.auth.user();
    const router = useRouter();
    const [modalIsOpen, setIsOpen] = useState(false);
    function closeModal() {
      setIsOpen(false);
    }

    const [modalView, setModalView] = useState();

    const [userBio, setUserBio] = useState();
    const [userImage, setUserImage] = useState();

    const [websiteData, setWebsiteData] = useState();
    const [instagramData, setInstagramData] = useState();
    const [twitterData, setTwitterData] = useState();
    const [noteData, setNoteData] = useState();
    const [youtubeData, setYoutubeData] = useState();

    const saveUserProfile = async (e) => {
        e.preventDefault();
        setModalView('loading');
        if (userImage && userBio) {
            const { data, error } = await supabase
            .from('profiles')
            .update({
                profile:{
                    first_name: user.user_metadata.first_name,
                    user_image: userImage,
                    user_profile: userBio,
                }
            })
            .eq('id', user.id)   
            closeModal();
        }else{alert('Fill both inputs')}
    }
    const saveUserLinks = async (e) => {
        e.preventDefault();
        setModalView('loading');
        const { data, error } = await supabase
        .from('profiles')
        .update({
            social_networks:{
                website: websiteData,
                instagram: instagramData,
                twitter: twitterData,
                note: noteData,
                youtube: youtubeData
            },
        })
        .eq('id', user.id)   
        closeModal();
    }

    const signout = async () => {
        await supabase.auth.signOut()
        router.push("/signin");
    }

    const [userInfo, setUserInfo] = useState('');
    const fetchProfileInfo = async () => {
        let { data: profiles, error } = await supabase
            .from('profiles')
            .select("*")
            .eq('id', user.id);
        setUserInfo(profiles[0]);
        setUserBio(profiles[0].profile.user_profile);
        setUserImage(profiles[0].profile.user_image);
        setWebsiteData(profiles[0].social_networks.website);
        setInstagramData(profiles[0].social_networks.instagram);
        setTwitterData(profiles[0].social_networks.twitter);
        setNoteData(profiles[0].social_networks.note);
        setYoutubeData(profiles[0].social_networks.youtube);
    }
    useEffect(() => {
        fetchProfileInfo();
    },[])

    const openEditUserProfileModal =()=> {
        setModalView('addUserInfo');
        setIsOpen(true);
    }
    const openEditProfileLinksModal =() => {
        setModalView('addLinks');
        setIsOpen(true);
    }


    const copyUserId = () => {
        navigator.clipboard.writeText(`${user.id} `);
        toast('ユーザーIDがコピーされました。Prattle上で部屋のオーナーシップを移行する際に他の人に共有してください');
    }

    return (
        <>
            <Header/>
            <div className="bodyPadding">
                {user ?
                    <>
                        <Modal
                            isOpen={modalIsOpen}
                            style={modalStyle}
                        >
                            {modalView !== 'loading' &&
                            
                                <AlignItems spaceBetween>
                                    <h3>
                                        {modalView === 'addLinks' && 'Connect SNS'}
                                        {modalView === 'addUserInfo' && 'Edit profile'}
                                    </h3>
                                    <IconButton
                                        onClick={() => closeModal()}
                                        noOutline
                                    >
                                        <FiXCircle/>
                                    </IconButton>
                                </AlignItems>
                            }
                            {modalView === 'addLinks' &&
                                <>
                                    <GridItems grid={'1fr'}>
                                        <form className="shedForm" onSubmit={saveUserLinks}>
                                            <input
                                                placeholder="Webサイト・リンク"
                                                type="text"
                                                value={websiteData}
                                                onChange={(e)=>{
                                                    e.preventDefault();
                                                    setWebsiteData(e.target.value);
                                                }}
                                            />
                                            <input
                                                placeholder="Instagram"
                                                type="text"
                                                value={instagramData}
                                                onChange={(e)=>{
                                                    e.preventDefault();
                                                    setInstagramData(e.target.value);
                                                }}
                                            />
                                            <input
                                                placeholder="Twitter"
                                                type="text"
                                                value={twitterData}
                                                onChange={(e)=>{
                                                    e.preventDefault();
                                                    setTwitterData(e.target.value);
                                                }}
                                            />
                                            <input
                                                placeholder="note"
                                                type="text"
                                                value={noteData}
                                                onChange={(e)=>{
                                                    e.preventDefault();
                                                    setNoteData(e.target.value);
                                                }}
                                            />
                                            <input
                                                placeholder="YouTube"
                                                type="text"
                                                value={youtubeData}
                                                onChange={(e)=>{
                                                    e.preventDefault();
                                                    setYoutubeData(e.target.value);
                                                }}
                                            />
                                            <Button
                                                onClick={saveUserLinks}
                                                type="submit"
                                            >
                                                保存
                                            </Button>
                                        </form>
                                    </GridItems>
                                </>
                            }
                            {modalView === 'addUserInfo' &&
                                <>
                                    <GridItems grid={'1fr'}>
                                        <form className="shedForm" onSubmit={saveUserProfile}>
                                            <input
                                                placeholder="プロフィール"
                                                type="text"
                                                value={userBio}
                                                onChange={(e)=>{
                                                    e.preventDefault();
                                                    setUserBio(e.target.value);
                                                }}
                                            />
                                            <input
                                                placeholder="プロフィール画像（画像URLのみ）"
                                                type="text"
                                                value={userImage}
                                                onChange={(e)=>{
                                                    e.preventDefault();
                                                    setUserImage(e.target.value);
                                                }}
                                            />
                                            <Button
                                                onClick={saveUserProfile}
                                                disabled={!userBio}
                                                type="submit"
                                            >
                                                保存
                                            </Button>
                                        </form>
                                    </GridItems>
                                </>
                            }
                            {modalView === 'loading' &&
                                <>
                                    <h4>情報を更新中...</h4>
                                </>
                            }
                        </Modal>
                        {userInfo ? 
                        <AlignItems center={true} flexDirection="column">
                            {/* <GridItems center={true}> */}
                                <img style={{
                                    marginTop: '2em',
                                    borderRadius:'var(--borderRadius2)',
                                    width:'7em',
                                    height:'7em',
                                    border:'var(--baseBorder2)',
                                    // boxShadow:'var(--boxShadow)',
                                }} src={userInfo && userInfo.profile.user_image}/>
                                <h2>{userInfo && userInfo.profile.first_name}</h2>
                                <AlignItems>
                                    {websiteData &&
                                        <IconButton
                                            onClick={()=> window.open(`${websiteData}`, "_blank")}
                                            noOutline
                                        >
                                            <FiLink/>
                                        </IconButton>
                                    }
                                    {instagramData &&
                                        <IconButton
                                            onClick={()=> window.open(`${instagramData}`, "_blank")}
                                            noOutline
                                        >
                                            <FiInstagram/>
                                        </IconButton>
                                    }
                                    {twitterData &&
                                        <IconButton
                                            onClick={()=> window.open(`${twitterData}`, "_blank")}
                                            noOutline
                                        >
                                            <FiTwitter/>
                                        </IconButton>
                                    }
                                    {noteData &&                                        
                                        <IconButton
                                            onClick={()=> window.open(`${noteData}`, "_blank")}
                                            noOutline
                                        >
                                            <FiFile/>
                                        </IconButton>
                                    }
                                    {youtubeData &&
                                        <IconButton
                                            onClick={()=> window.open(`${youtubeData}`, "_blank")}
                                            noOutline
                                        >
                                            <FiYoutube/>
                                        </IconButton>
                                    }
                                    <IconButton
                                        onClick={()=>{openEditProfileLinksModal();}}
                                    >
                                        <FiPlus />
                                    </IconButton>
                                </AlignItems>
                                <p style={{textAlign:'center'}}>{userBio}</p>
                            <AlignItems center={true}>
                                <SmallButton
                                    onClick={()=>{openEditUserProfileModal();}}
                                >
                                    プロフィールを編集
                                </SmallButton>
                                <SmallButton
                                    onClick={()=>{copyUserId();}}
                                >
                                    IDをコピー
                                </SmallButton>
                                <SmallButton
                                    onClick={signout}
                                    solid
                                >
                                    ログアウト
                                </SmallButton>
                            </AlignItems>
                        </AlignItems>:<StaticScreen type='loading'/>
                        }
                    </> :
                    <StaticScreen type={'notLoggedIn'}/>
                }
            </div>
        </>
    )
}
