import React, {useState} from 'react'
import AlignItems from '../lib/style-component/AlignItems'
import { useRouter } from "next/router";
import VisibilityTag from './tag-component/VisibilityTag';

export default function RoomThumbNail(props) {
    const router = useRouter();
    const [hover, setHover] = useState(false);

    let stylizedBanner ={
        borderRadius:'var(--borderRadius1)',
        border:'var(--baseBorder2)',
        backgroundColor:'var(--baseColor1)',
        backgroundImage:`url(${props.backgroundImage})`,
        backgroundPosition: 'center',
        height: 'fit-content',
        // padding:'2em 0.5em 0 0.5em',
        cursor:'pointer',
        objectFit: 'cover',
        transition: '0.5s',
        transform: `${hover ? 'translateY(-5px)':'none'}`
    }
    let stylizedBannerInside = {
        borderRadius:'calc(var(--borderRadius0)*1.2)',
        background: 'linear-gradient(to right,var(--prattleColor1) 0%,rgba(0,0,0,0.4) 100%)',
        width: '100%',
        height:'100%',
        bottom: '0px',
        padding:'1em',
        display: 'flex',
        alignItems: 'center',
        transition: '0.5s',
        boxShadow: `${hover ? 'var(--boxShadow)':'none'}`,
    }
    let stylizedBannerImage = {
        borderRadius:'calc(var(--borderRadius)*10)',
        height:'25px',
        width:'25px',
        margin:'0'
    }
  return (
    <div
        key={props.key}
        onClick={() => router.push(`/rooms/${props.roomCode}`)}
        style={stylizedBanner}
        onMouseOver={()=>setHover(true)}
        onMouseLeave={()=>setHover(false)}
    >
        <div style={stylizedBannerInside}>
            <div>
                <AlignItems>
                    <h4
                        style={{
                            margin: 0,
                            color: 'var(--baseColor0)',
                        }}
                    >
                        {props.roomName}
                    </h4>
                    {props.removeVisibilityTag !== true && <VisibilityTag
                        size="small"
                        user={props.user}
                        isEditable={props.isEditable}
                    />}
                </AlignItems>
                {props.description && 
                    <p
                        style={{
                            fontSize:'0.8em',
                            color: 'var(--baseColor2)',
                            width:'70%',
                        }}
                    >
                        {props.description}
                    </p>
                }
                {props.displayUserInfo === true && <AlignItems>
                    <img style={stylizedBannerImage} src={props.src}/>
                    <p>{props.author}</p>
                </AlignItems>}
            </div>
        </div>
    </div>
  )
}
