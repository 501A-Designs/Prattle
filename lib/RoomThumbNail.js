import React from 'react'
import AlignItems from '../lib/style-component/AlignItems'
import { useRouter } from "next/router";
import VisibilityTag from './VisibilityTag';

export default function RoomThumbNail(props) {
    const router = useRouter();

    let stylizedBanner ={
        borderRadius:'var(--borderRadius)',
        border:'var(--baseBorder2)',
        backgroundColor:'var(--baseColor1)',
        backgroundImage:`url(${props.backgroundImage})`,
        backgroundPosition: 'center',
        height:'9em',
        margin:'0.5em',
        padding:'2.5em 1em 0 1em',
        cursor:'pointer',
        objectFit: 'cover',
    }
    let stylizedBannerInside = {
        borderRadius:'var(--borderRadius) var(--borderRadius) 0 0',
        border:'var(--baseBorder2)',
        bottomBorder:'none',
        boxShadow: 'var(--boxShadow)',
        backgroundColor:'var(--baseColor0)',
        // width:'fit-content',
        minWidth:'200px',
        height:'100%',
        padding:'0.5em 1em',
        display: 'flex',
        alignItems: 'center'
    }
    let stylizedBannerImage = {
        borderRadius:'calc(var(--borderRadius)*10)',
        height:'25px',
        width:'25px',
        margin:'0'
    }
  return (
    <div key={props.key} style={stylizedBanner} onClick={() => router.push(`/rooms/${props.roomCode}`)}>
        <div style={stylizedBannerInside}>
            <div>
                <AlignItems>
                    <h4 style={{margin:0}}>{props.roomName}</h4>
                    {props.removeVisibilityTag !== true && <VisibilityTag
                        size="small"
                        user={props.user}
                        isEditable={props.isEditable}
                    />}
                </AlignItems>
                <hr/>
                <p>{props.description}</p>
                {props.displayUserInfo === true && <AlignItems>
                    <img style={stylizedBannerImage} src={props.src}/>
                    <p>{props.author}</p>
                </AlignItems>}
            </div>
        </div>
    </div>
  )
}
