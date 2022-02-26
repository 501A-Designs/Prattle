import React,{useState,useEffect} from 'react'
import { supabase } from '../../utils/supabaseClient'

import AlignItems from '../style-component/AlignItems'
import { useRouter } from 'next/router'
import SmallButton from '../SmallButton'
import { VscMenu,VscChevronUp } from "react-icons/vsc";
import ToolTip from '../ToolTip'
import Button from '../Button'

import { toast } from 'react-toastify';

export default function StylizedBanner(props) {
  const router = useRouter()
  const [roomInfo, setRoomInfo] = useState();


    let stylizedBanner ={
        borderRadius:'var(--borderRadius)',
        border:'var(--baseBorder2)',
        backgroundColor:'var(--baseColor1)',
        backgroundImage:`url(${props.backgroundImage})`,
        backgroundPosition: 'center',
        height:'10em',
        margin:'0.5em 0 1em 0',
        padding:'1em',
        objectFit: 'cover',
    }
    let stylizedBannerInside = {
        borderRadius:'var(--borderRadius)',
        border:'var(--baseBorder2)',
        boxShadow: 'var(--boxShadow)',
        backgroundColor:'var(--baseColor0)',
        width:'fit-content',
        minWidth:'250px',
        height:'100%',
        padding:'1em',
        display: 'flex',
        alignItems: 'center'
    }
    // let stylizedBannerImage = {
    //     borderRadius:'calc(var(--borderRadius)*1)',
    //     height:'25px',
    //     width:'25px',
    //     margin:'0'
    // }

    const copyRoomId = () => {
        navigator.clipboard.writeText(props.roomCode);
        toast("Copied room code")
    };

    return (
        <div style={stylizedBanner}>
            <div style={stylizedBannerInside}>
                <div style={{width:'100%',}}>
                    <AlignItems spaceBetween={true}>
                        <h3 style={{margin: 0}}>{props.roomName}</h3>
                        <SmallButton
                            icon={roomInfo === true ? <VscChevronUp/>: <VscMenu/>}
                            click={()=> {roomInfo === true ? setRoomInfo(false): setRoomInfo(true)}}
                        />
                    </AlignItems>
                    {roomInfo === true && <ToolTip>
                        <Button
                            size="medium"
                            name="Copy Room ID"
                            click={()=> copyRoomId()}
                        />
                        <Button
                            size="medium"
                            name="View Author Profile"
                            click={()=> router.push('/profile/' + props.authorId)}
                        />
                    </ToolTip>}
                    <hr/>
                    <p>{props.roomDescription}</p>
                </div>
            </div>
        </div>
    )
}
