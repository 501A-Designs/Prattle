import React from 'react'
import { IconContext } from "react-icons";
import AlignItems from './style-component/AlignItems';

export default function TabComponent(props) {
    let tabContainer={
        margin:'0.7em 0'
    }
    let tabTitle ={
        color: 'black',
        fontSize: '0.7em',
        margin:'0',
        padding: '0.5em 1em',
        width: 'fit-content',
        backgroundColor: 'var(--baseColor2)',
        borderRadius: 'var(--borderRadius) var(--borderRadius) 0 0',
        boxShadow: 'var(--boxShadow)',
    }
    let tabContent ={
        padding: '0.5em 1em',
        backgroundColor: 'var(--baseColor0)',
        borderRadius: '0 var(--borderRadius) var(--borderRadius) var(--borderRadius)',
        border: 'var(--baseBorder2)',
        boxShadow: 'var(--boxShadow)',
        maxHeight: '300px',
        overflowY:'scroll',
    }
    return (
        <div style={tabContainer}>
            <div style={tabTitle}>
                <AlignItems>
                    <IconContext.Provider value={{ className: 'icons' }}>
                        {props.icon}
                    </IconContext.Provider>
                    {props.name}
                </AlignItems>
            </div>
            <div style={tabContent}>
                {props.children}
            </div>
        </div>
    )
}
