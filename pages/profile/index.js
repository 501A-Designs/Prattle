import React, { useState} from 'react'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from "next/router";
import Button from '../../lib/button-component/Button';
import SmallButton from '../../lib/button-component/SmallButton';
import { VscHome,VscSave,VscClose } from "react-icons/vsc";
import AlignItems from '../../lib/style-component/AlignItems';
import Modal from 'react-modal/lib/components/Modal';

export default function Home() {
    const user = supabase.auth.user();
    const router = useRouter();

    const [editType, setEditType] = useState('');
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
          marginRight: '-50%',
          width: '500px',
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

    console.log(user);
    const saveUserInfo = async () => {
        // const { data, error } = await supabase
        // .from('users')
        // .insert([{
        //     user_id: user.id,
        //     user_name: user.user_metadata.first_name,
        //     user_mail: user.email,
        //     user_profile: `Hi! I'm ${user.user_metadata.first_name}`,
        //     user_image: `https://avatars.dicebear.com/api/croodles/${user.user_metadata.first_name}.svg`
        // },])
    }

    return (
        <div className="bodyPadding">
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
                        {editType === 'bio' ?
                            <>
                                <h3>Edit your profile</h3>
                                <form
                                    className="shedForm"
                                >
                                    <input
                                        placeholder="Add your bio"
                                        type="text"
                                        value={userBio}
                                        onChange={(e)=>{
                                            e.preventDefault();
                                            setUserBio(e.target.value);
                                        }}
                                    />
                                    <Button
                                        click={(e) => {
                                            e.preventDefault();
                                            saveUserInfo();
                                        }}
                                        disabled={!userBio}
                                        type="submit"
                                        icon={<VscSave />}
                                        name="Save New Info"
                                    />
                                </form>
                            </>:
                            <>
                                <h3>Edit profile image</h3>
                                <form
                                    className="shedForm"
                                >
                                    <input
                                        placeholder="Add an image to your profile"
                                        type="text"
                                        value={userImage}
                                        onChange={(e)=>{
                                            e.preventDefault();
                                            setUserImage(e.target.value);
                                        }}
                                    />
                                    <Button
                                        click={(e) => {
                                            e.preventDefault();
                                            saveUserInfo();
                                        }}
                                        disabled={!userImage}
                                        type="submit"
                                        icon={<VscSave />}
                                        name="Save"
                                    />
                                </form>
                            </>
                        }
                    </Modal>
                    <AlignItems>
                        <Button
                            click={(e) => { e.preventDefault(); router.push(`/${user.id}`); }}
                            icon={<VscHome />}
                            name="Main Page"
                        />
                        <Button name="他の人にどう見られているかを閲覧"/>
                    </AlignItems>
                    <br></br>
                    <h1>Your Profile</h1>
                    <h2>Info</h2>
                    <table>
                        <tr>
                            <th>Property</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>Email Address</td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td>Username</td>
                            <td>
                                {user.user_metadata.first_name}
                            </td>
                        </tr>
                        <tr>
                            <td>User ID</td>
                            <td>
                                {user.id}
                            </td>
                        </tr>
                        <tr>
                            <td>Image URL</td>
                            <td>
                                <AlignItems>
                                    <Button
                                        click={()=>{
                                            openModal();
                                            setEditType('img');
                                        }}
                                        size="medium"
                                        name="画像URLを編集"
                                    />
                                    {user.user_metadata.user_image}
                                </AlignItems>
                            </td>
                        </tr>
                        <tr>
                            <td>Biography / Description</td>
                            <td>
                                <AlignItems>
                                    <Button
                                        click={()=>{
                                            openModal();
                                            setEditType('bio');
                                        }}
                                        size="medium"
                                        name="編集"
                                    />
                                    {user.user_metadata.user_profile}
                                </AlignItems>
                            </td>
                        </tr>
                    </table>
                </> :
                <h1>You are logged out</h1>
            }
        </div>
    )
}
