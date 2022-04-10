import React from 'react'

export default function AlignItems(props) {
    let gap = '0.5em';
    let margin = '0 0 1em 0';
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
    if (props.scroll === true){
        alignStyle = {
            display: 'flex',
            flexDirection: `${props.flexDirection ? props.flexDirection : 'row'}`,
            gap: gap,
            height: 'min-content',
            overflowX:'auto',
            padding: '0.3em 0',
            margin: margin,
            borderRadius: 'calc(var(--borderRadius))'
        }
    } if (props.spaceBetween === true){
        alignStyle = {
            display: 'flex',
            flexDirection: `${props.flexDirection ? props.flexDirection : 'row'}`,
            gap: gap,
            alignItems: 'center',
            justifyContent: 'space-between',
            margin:`${props.margin ? props.margin : 0}`
        }         
    } if (props.flexEnd === true){
        alignStyle = {
            display: 'flex',
            flexDirection: `${props.flexDirection ? props.flexDirection : 'row'}`,
            gap: gap,
            alignItems: 'center',
            justifyContent: 'flex-end',
        }         
    } if (props.center === true){
        alignStyle = {
            display: 'flex',
            flexDirection: `${props.flexDirection ? props.flexDirection : 'row'}`,
            gap: gap,
            alignItems: 'center',
            justifyContent: 'center',
        }         
    }

    return (
        <div style={alignStyle} className={props.className}>
            {props.arrow === true &&
                <div className={'arrow'}/>
            }
            {props.children}
        </div>
    )
}
