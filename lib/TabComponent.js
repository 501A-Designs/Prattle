import React from 'react'
import { IconContext } from "react-icons";
import AlignItems from './style-component/AlignItems';

export default function TabComponent(props) {
    let tabContainer={
        margin:'0.7em 0'
    }
    let tabTitle ={
        color: 'white',
        fontSize: '0.7em',
        margin:'0',
        padding: '0.5em 1em',
        width: 'fit-content',
        backgroundColor: 'var(--prattleColor1)',
        borderRadius: 'var(--borderRadius1) var(--borderRadius1) 0 0',
        // boxShadow: 'var(--boxShadow)',
    }
    let tabContent ={
        padding: '0.5em 1em',
        backgroundColor: 'var(--baseColor0)',
        borderRadius: '0 var(--borderRadius1) var(--borderRadius1) var(--borderRadius1)',
        border: 'var(--baseBorder2)',
        // boxShadow: 'var(--boxShadow)',
        maxHeight: '300px',
        overflowY:'scroll',
    }
    return (
        <div style={tabContainer}>
            <div style={tabTitle}>
                <AlignItems>
                    {props.icon}
                    <span>{props.name}</span>
                </AlignItems>
            </div>
            <div style={tabContent}>
                {props.children}
            </div>
        </div>
    )
}
