import React from 'react'
import { FiCornerDownRight } from 'react-icons/fi';

export default function AlignItems(props) {
    let gap = '0.5em';
    let margin = '0 0 1em 0';
    let overridingStyle;
    if (props.margin) {
        margin = props.margin;
    }
    if (props.gap) {
        gap = props.gap;
    }
    let alignStyle = {
        display: 'flex',
        flexDirection: `${props.flexDirection ? props.flexDirection : 'row'}`,
        gap: gap,
        alignItems: 'center',
        margin:`${props.margin ? props.margin : 0}`
    };


    // Overriding the alignStyle property
    if (props.scroll){
        overridingStyle = {
            alignItems: 'none',
            height: 'min-content',
            overflowX:'auto',
            padding: '0.3em 0',
            margin: margin,
            borderRadius: 'calc(var(--borderRadius))'
        }
    }
    if (props.spaceBetween)overridingStyle = {justifyContent: 'space-between'}
    if (props.flexEnd) overridingStyle = {justifyContent: 'flex-end'}
    if (props.center) overridingStyle = {justifyContent: 'center'}
    if (props.arrow) overridingStyle = { color: 'var(--baseColor5)'}

    return (
        <div
            style={
                Object.assign(
                    alignStyle,
                    overridingStyle,
                    props.style
                )
            }
            className={props.className}
        >
            {props.arrow && <FiCornerDownRight/>}
            {props.children}
        </div>
    )
}
