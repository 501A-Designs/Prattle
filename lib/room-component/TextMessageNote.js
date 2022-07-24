import React from 'react'
import { useRouter } from 'next/router'
import { IconContext } from "react-icons";
import { VscComment } from "react-icons/vsc";
import GhenInterpreter from '../GhenInterpreter';
import AlignItems from '../style-component/AlignItems';
import GridItems from '../style-component/GridItems';

import moment from 'moment';
import 'moment/locale/ja'
import SmallButton from '../button-component/SmallButton';

export default function TextMessageNote(props) {
    const router = useRouter()
    let textMessageNote ={
        userSelect: 'none',
        borderRadius: 'var(--borderRadius1)',
        border: 'var(--baseBorder2)',
        minWidth: '100px',
        padding:'0.5em'
    }
    return (
        <div style={textMessageNote}>
            <AlignItems spaceBetween={true} margin={'0 0 1em 0'}>
                <AlignItems>
                    <IconContext.Provider value={{ className: 'icons' }}>
                        <VscComment />
                    </IconContext.Provider>
                    <GridItems>
                        <time>{moment(props.time).subtract(9, 'hours').fromNow()}</time>
                    </GridItems>
                </AlignItems>
                <SmallButton
                    size={'medium'}
                    name={'発言したユーザー'}
                    click={()=>router.push(`/profile/${props.whoSaid}`)}
                />
            </AlignItems>
            <GhenInterpreter inputValue={props.message}/>
        </div>
    )
}
