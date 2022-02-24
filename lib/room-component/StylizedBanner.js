import React,{useState,useEffect} from 'react'
import { supabase } from '../../utils/supabaseClient'

import AlignItems from '../style-component/AlignItems'
import { useRouter } from 'next/router'

export default function StylizedBanner(props) {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState('');

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
        minWidth:'200px',
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
    return (
        <div style={stylizedBanner}>
            <div style={stylizedBannerInside}>
                <div>
                    <h3 style={{margin:0}}>{props.roomName}</h3>
                    <hr/>
                    <p>{props.roomCode}</p>
                    <AlignItems>
                        <p
                            style={{cursor:'pointer'}}
                            onClick={()=> router.push('/profile/' + props.authorId)}
                        >
                            View Author Info
                        </p>
                    </AlignItems>
                </div>
            </div>
        </div>
    )
}
