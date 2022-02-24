import React from 'react'

export default function AlignItems(props) {
    let alignStyle;
    let gap = '0.5em';
    if (props.gap) {
        gap = props.gap;
    }
    if (props.scroll === true){
        alignStyle = {
            display: 'flex',
            flexDirection: 'row',
            gap: gap,
            height: 'min-content',
            overflowX:'scroll',
            padding: '0 0.3em 0.3em 0.3em',
            margin: '0 0 1em 0',
            borderRadius: 'calc(var(--borderRadius))'
        }
    } else{
        alignStyle = {
            display: 'flex',
            flexDirection: 'row',
            gap: gap,
            alignItems: 'center',
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
