import React from 'react'
import AlignItems from '../style-component/AlignItems'

export default function StylizedBanner(props) {
    let stylizedBanner ={
        borderRadius:'var(--borderRadius)',
        border:'var(--baseBorder2)',
        backgroundColor:'var(--baseColor1)',
        backgroundImage:`url(${props.backgroundImage})`,
        backgroundPosition: 'center',
        // height:'10em',
        // margin:'0.5em 0 1em 0',
        padding:'0.5em',
        objectFit: 'cover',
        marginBottom:'1em'
    }
    let stylizedBannerInside = {
        borderRadius:'var(--borderRadius)',
        border:'var(--baseBorder2)',
        // boxShadow: 'var(--boxShadow)',
        backgroundColor:'var(--baseColor0)',
        width:'fit-content',
        // minWidth:'250px',
        height:'100%',
        padding:'1em',
        display: 'flex',
        alignItems: 'center'
    }

    return (
        <div style={stylizedBanner}>
            <div style={stylizedBannerInside}>
                <div style={{width:'100%',}}>
                    <AlignItems spaceBetween={true}>
                        <h3 style={{margin: 0}}>{props.roomName}</h3>
                    </AlignItems>
                    <hr/>
                    <p>{props.roomDescription}</p>
                </div>
            </div>
        </div>
    )
}
