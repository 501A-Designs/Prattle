import React from 'react'
import Button from './button-component/Button';
import SmallButton from './button-component/SmallButton';
import GridItems from './style-component/GridItems'
import {VscClose} from "react-icons/vsc";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';

export default function ProfileView(props) {
    const router = useRouter();
    const toolTip ={
        position: 'absolute',
        width: '200px',
        zIndex:'10',
        backgroundColor: 'var(--baseColor0)',
        border: 'var(--baseBorder2)',
        borderRadius: 'calc(var(--borderRadius)*2)',
        padding: '0.7em',
        boxShadow: 'var(--boxShadow)',
    }
    let profileInfo = props.profileData.profile;
    const copyUserId = () => {
        navigator.clipboard.writeText(props.profileData.id);
        toast("ユーザーIDがコピーされました")
    };

    return (
        <div style={toolTip} className={'popOut'}>
            <SmallButton
                icon={<VscClose/>}
                click={props.close}
                right={true}
            />
            <GridItems gap={'0'}>
                <h5 style={{margin:'0.8em 0 0 0'}}>{profileInfo.first_name}</h5>
                <p>{profileInfo.user_profile}</p>
                <GridItems>
                    <Button size={'medium'} name={'ユーザーIDをコピー'} click={()=> copyUserId()}/>
                    <Button size={'medium'} name={'プロフィールを開く'} click={()=> router.push(`/profile/${props.profileData.id}`)}/>
                </GridItems>
            </GridItems>
        </div>
    )
}