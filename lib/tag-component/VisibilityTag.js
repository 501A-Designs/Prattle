import React from 'react'
// Icons
import { IconContext } from "react-icons";
import { VscEye, VscCommentDiscussion} from "react-icons/vsc";

export default function VisibilityTag(props) {
    let visibilityTag = {
        backgroundColor : `${props.isEditable ? '#A4FFAD':'#ffb3c1'}`,
        borderRadius:'calc(var(--borderRadius1)*1)',
        height:'10px',
        width:'10px',
        userSelect:"none",
    }

    return (
        <div
            style={visibilityTag}
            onClick={props.click}
        >
            {props.size !== 'small' &&            
                <span>{props.isEditable === false ? '閲覧のみ':<>
                    {props.user ? 
                        '会話に参加可能'
                        :'アカウント作成後会話に参加'
                    }
                </>}</span>
            }
        </div>
    )
}
