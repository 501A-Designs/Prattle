import React, { useState} from 'react'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from "next/router";
import Button from '../../lib/button-component/Button';
import SmallButton from '../../lib/button-component/SmallButton';
import { VscSignOut,VscHome,VscSave,VscClose } from "react-icons/vsc";
import AlignItems from '../../lib/style-component/AlignItems';
import Modal from 'react-modal/lib/components/Modal';
import GridItems from '../../lib/style-component/GridItems';
import ProfileInfo from '../../lib/ProfileInfo';
import StaticScreen from '../../lib/scene-component/StaticScreen';

export default function Home() {
    const user = supabase.auth.user();
    const router = useRouter();
    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal =()=> {
      setIsOpen(true);
    }
    function closeModal() {
      setIsOpen(false);
    }
    let modalStyle = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        maxWidth: '500px',
        width: '100%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'var(--baseColor0)',
        border: 'var(--baseBorder2)',
        borderRadius: 'calc(var(--borderRadius)*2)',
        boxShadow: 'var(--boxShadow)',
        padding: '1em',
      },
    }

    const [userBio, setUserBio] = useState();
    const [userImage, setUserImage] = useState();

    const saveUserProfile = async (e) => {
        e.preventDefault();
        if (userImage && userBio) {
            const { data, error } = await supabase
            .from('profiles')
            .update({profile:{
                first_name: user.user_metadata.first_name,
                user_image: userImage,
                user_profile: userBio,
            }})
            .eq('id', user.id)   
        }else{
            alert('Fill both inputs')
        }
    }
    const signout = async () => {
        await supabase.auth.signOut()
        router.push("/signin");
    }

    return (
        <>
            <header>
                <Button
                    click={(e) => { e.preventDefault(); router.push(`/`); }}
                    icon={<VscHome />}
                    name="ダッシュボードに戻る"
                />
            </header>
            <div className="bodyPadding">
                <h1>Profile</h1>
                {user ?
                    <>
                        <Modal
                            isOpen={modalIsOpen}
                            style={modalStyle}
                        >
                            <SmallButton
                                click={() => closeModal()}
                                icon={<VscClose />}
                                right={true}
                            />
                            <h3>Edit profile</h3>
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
                                        click={saveUserProfile}
                                        disabled={!userBio}
                                        type="submit"
                                        icon={<VscSave />}
                                        name="保存"
                                    />
                                </form>
                            </GridItems>
                        </Modal>
                        <ProfileInfo profileId={user.id}>
                            <AlignItems>
                                <Button
                                    click={()=>{openModal();}}
                                    size="medium"
                                    name="プロフィールを編集"
                                />
                                <Button
                                    click={signout}
                                    size="medium"
                                    icon={<VscSignOut />}
                                    name="ログアウト"
                                />
                            </AlignItems>
                        </ProfileInfo>
                    </> :
                    <StaticScreen type={'notLoggedIn'}/>
                }
            </div>
        </>
    )
}
