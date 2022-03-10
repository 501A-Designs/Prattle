import React from 'react'
import { BrowserView, MobileView } from 'react-device-detect'

export default function GridItems(props) {
    const alignStyle = {
        display: 'grid',
        gridTemplateColumns: `${props.grid}`,
        gap: `${props.gap ? props.gap : '0.5em'}`,
        width: '100%',
    }
    const mobileAlignStyle = {
        display: 'none',
        gridTemplateColumns: '1fr',
        gap: `${props.gap ? props.gap : '0.5em'}`,
        width: '100%',
    }
    return (
        <>
            <BrowserView>
                <div style={alignStyle} className={props.className}>
                    {props.children}
                </div>
            </BrowserView>
            <MobileView>
                <div style={mobileAlignStyle} className={props.className}>
                    {props.children}
                </div>
            </MobileView>
        </>
    )
}
