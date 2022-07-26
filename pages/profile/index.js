import React, { useState,useEffect} from 'react'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from "next/router";
import Button from '../../lib/button-component/Button';
import SmallButton from '../../lib/button-component/SmallButton';
import IconButton from '../../lib/button-component/IconButton';

import AlignItems from '../../lib/style-component/AlignItems';
import Modal from 'react-modal/lib/components/Modal';
import GridItems from '../../lib/style-component/GridItems';
import StaticScreen from '../../lib/scene-component/StaticScreen';
import Header from '../../lib/Header';
import { modalStyle } from '../../modalStyle';
import { FiEdit2, FiFile, FiInstagram, FiLink, FiPlus, FiTwitter, FiXCircle, FiYoutube } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function Home() {
  const user = supabase.auth.user();
  const router = useRouter();

  // MODAL STATE
  const [modalIsOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const [modalView, setModalView] = useState();

  const [userBio, setUserBio] = useState();
  const [websiteData, setWebsiteData] = useState();
  const [instagramData, setInstagramData] = useState();
  const [twitterData, setTwitterData] = useState();
  const [noteData, setNoteData] = useState();
  const [youtubeData, setYoutubeData] = useState();

  const saveUserLinks = async (e) => {
    e.preventDefault();
    setModalView('loading');
    const { data, error } = await supabase
      .from('profiles')
      .update({
        additional_info:{
          user_profile: userBio,
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
    router.push("/signup");
  }

  const [userInfo, setUserInfo] = useState('');
  const fetchProfileInfo = async () => {
    let { data: profiles, error } = await supabase
      .from('profiles')
      .select("*")
      .eq('id', user.id);
    setUserInfo(profiles[0]);

    if (profiles[0].additional_info !== null) {
      setUserBio(profiles[0].additional_info.user_profile);
      setWebsiteData(profiles[0].additional_info.website);
      setInstagramData(profiles[0].additional_info.instagram);
      setTwitterData(profiles[0].additional_info.twitter);
      setNoteData(profiles[0].additional_info.note);
      setYoutubeData(profiles[0].additional_info.youtube);
    }
  }
  useEffect(() => {
    fetchProfileInfo();
  },[])
  
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
              {modalView === 'additionalInfo' &&
                <>
                  <GridItems grid={'1fr'}>
                    <form className="shedForm" onSubmit={saveUserLinks}>
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
              {modalView === 'loading' && <h4>情報を更新中...</h4>}
            </Modal>
            {userInfo ? 
              <AlignItems center={true} flexDirection="column">
                <img
                  style={{
                    marginTop: '2em',
                    borderRadius:'var(--borderRadius2)',
                    width:'5em',
                    height:'5em',
                    border:'var(--baseBorder2)',
                    boxShadow:'var(--boxShadow)',
                  }}
                  src={userInfo.profile.picture}
                />
                <h2
                  style={{
                    marginBottom:0,
                    width:'fit-content'
                  }}
                >
                  {userInfo.profile.name}
                </h2>
                <p style={{textAlign:'center'}}>{userBio}</p>
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
                </AlignItems>
                <AlignItems center={true}>
                  <SmallButton
                    onClick={()=>{
                      setModalView('additionalInfo');
                      setIsOpen(true);
                    }}
                  >
                    {/* <FiEdit2 /> */}
                    編集
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
          </>:
          <StaticScreen type={'notLoggedIn'}/>
        }
      </div>
    </>
  )
}
