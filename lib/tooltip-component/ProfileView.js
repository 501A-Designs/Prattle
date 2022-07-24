import React from 'react'
import Button from '../button-component/Button';
import IconButton from '../button-component/IconButton';
import GridItems from '../style-component/GridItems'
import {VscClose} from "react-icons/vsc";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import AlignItems from '../style-component/AlignItems';
import { FiXCircle } from 'react-icons/fi';
import SmallButton from '../button-component/SmallButton';

export default function ProfileView(props) {
    const router = useRouter();
    const toolTip ={
        position: 'absolute',
        // width: '200px',
        zIndex:'10',
        backgroundColor: 'var(--baseColor0)',
        border: 'var(--baseBorder2)',
        borderRadius: 'var(--borderRadius2)',
        padding: '1.5em 1em 1em 1em',
        boxShadow: 'var(--boxShadow)',
    }
    let profileInfo = props.profileData.profile;
    const copyUserId = () => {
        navigator.clipboard.writeText(props.profileData.id);
        toast("ユーザーIDがコピーされました")
    };

    return (
        <div style={toolTip} className={'popOut'}>
            <GridItems>
                <AlignItems spaceBetween>
                    <AlignItems>
                        <img
                            style={{borderRadius: 'calc(var(--borderRadius)*5)'}}
                            width="35px"
                            height="35px"
                            src={profileInfo.user_image}
                        />
                        <h5 style={{margin:'0'}}>{profileInfo.first_name}</h5>
                    </AlignItems>
                    <IconButton
                        onClick={props.close}
                        noOutline
                    >
                        <FiXCircle/>
                    </IconButton>
                </AlignItems>
                <p style={{color:'var(--baseColor5)'}}>{profileInfo.user_profile}</p>
                <GridItems grid={'1fr 1fr'}>
                    <SmallButton
                        onClick={()=> copyUserId()}
                    >
                        ユーザーIDをコピー
                    </SmallButton>
                    <SmallButton
                        onClick={() => 
                            router.push(`/profile/${props.profileData.id}`)
                        }
                    >
                        プロフィールを開く
                    </SmallButton>
                </GridItems>
            </GridItems>
        </div>
    )
}