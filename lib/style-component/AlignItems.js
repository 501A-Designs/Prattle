import React from 'react'

export default function AlignItems(props) {
    let gap = '0.5em';
    if (props.gap) {
        gap = props.gap;
    }
    let alignStyle = {
        display: 'flex',
        flexDirection: 'row',
        gap: gap,
        alignItems: 'center',
    };
    if (props.scroll === true){
        alignStyle = {
            display: 'none',
            flexDirection: 'row',
            gap: gap,
            height: 'min-content',
            overflowX:'auto',
            padding: '0 0.3em 0.3em 0.3em',
            margin: '0 0 1em 0',
            borderRadius: 'calc(var(--borderRadius))'
        }
    } if (props.spaceBetween === true){
        alignStyle = {
            display: 'flex',
            flexDirection: 'row',
            gap: gap,
            alignItems: 'center',
            justifyContent: 'space-between',
        }         
    } if (props.flexEnd === true){
        alignStyle = {
            display: 'flex',
            flexDirection: 'row',
            gap: gap,
            alignItems: 'center',
            justifyContent: 'flex-end',
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
