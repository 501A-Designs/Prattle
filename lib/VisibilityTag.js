import React from 'react'
// Icons
import { IconContext } from "react-icons";
import { VscEye, VscCommentDiscussion} from "react-icons/vsc";

export default function VisibilityTag(props) {
    let padding = '0.6em';
    let fontSize = '0.6em';
    let backgroundColor;
    let color;
    let border;
    if (props.size === 'small'){
        padding = '0.3em';
        fontSize = '0.6em';
    }
    if (props.isEditable === true) {
        backgroundColor = "#A4FFAD";
        color = "#006109";
        border = "1px solid #A4FFAD"
    }else{
        backgroundColor = "#ffb3c1";
        color = "#610008";
        border = "1px solid #ffb3c1"
    }

    let visibilityTag = {
        backgroundColor : backgroundColor,
        color : color,
        border:border,
        borderRadius:"calc(var(--borderRadius)*1)",
        fontSize:fontSize,
        padding:`${padding} 1em`,
        height:'fit-content',
        whiteSpace:'noWrap',
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        gap:"5px",
        outline:"2px solid transparent",userSelect:"none",
    }

    return (
        <div
            style={visibilityTag}
            onClick={props.click}
        >
            <IconContext.Provider value={{ className: 'icons' }}>
                {props.isEditable === false ? <VscEye/>:<VscCommentDiscussion/>}
            </IconContext.Provider>
            {props.size !== 'small' &&            
                <span>{props.isEditable === false ? 'View Only':<>
                    {props.user ? 
                        'Pratable'
                        :'Create an account to prate in this room'
                    }
                </>}</span>
            }
        </div>
    )
}
