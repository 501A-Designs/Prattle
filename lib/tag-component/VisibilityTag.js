import React from 'react'
import AlignItems from '../style-component/AlignItems'

export default function VisibilityTag(props) {
    let visibilityTag = {
        backgroundColor : `${props.isEditable ? '#6ed478':'#ffb3c1'}`,
        borderRadius:'var(--borderRadius1)',
        height:'10px',
        width:'10px',
        userSelect:"none",
    }

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap:'0.5em'
            }}
            onClick={props.onClick}
        >
            <div
                style={visibilityTag}
            >
            </div>
            {props.largeVisibility &&
                <span
                    style={{fontSize: '0.8em'}}
                >
                    {props.isEditable ? 
                        <>
                            {props.user ? 
                                '会話に参加可能'
                                :'アカウント作成必要'
                            }
                        </>:
                        '閲覧のみ'
                    }
                </span>
            }
        </div>
    )
}
