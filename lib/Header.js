import React from 'react'

import { supabase } from '../utils/supabaseClient'

import AlignItems from '../lib/style-component/AlignItems';
import prattleIcon from '../public/prattle.png'
import Image from 'next/image';
import SmallButton from '../lib/button-component/SmallButton';
import { useRouter } from 'next/router';

import {VscAdd,VscAccount,VscComment,VscRepo,VscSymbolParameter} from "react-icons/vsc";
import Button from '../lib/button-component/Button';

export default function Header() {
    const user = supabase.auth.user();
    const router = useRouter();

    let header = {
        position: 'sticky',
        top: '0',
        width: '100%',
        zIndex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'spaceBetween',
        gap: '1em',
        borderBottom: 'var(--baseBorder2)',
        backgroundColor: 'var(--baseColor0)',
        opacity: '95%'
    }

    return (
        <header style={header}>
            {user ?
                <>
                    <AlignItems>
                        <Image onClick={() => router.push(`/`)} src={prattleIcon} width={30} height={30}/>
                        <h3 style={{margin:0}}>Prattle</h3>
                    </AlignItems>
                    <AlignItems>
                        <SmallButton
                            click={() => router.push(`/rooms`)}
                            icon={<VscAdd />}
                            name={'新規部屋作成'}
                        />
                        <SmallButton
                            click={() => router.push(`/profile`)}
                            icon={<VscAccount />}
                            name={'アカウント'}
                        />
                        <SmallButton
                            click={() => router.push(`/browse`)}
                            icon={<VscComment />}
                            name={'他の部屋を見る'}
                        />
                        <SmallButton
                            click={() => router.push(`/usage`)}
                            icon={<VscRepo />}
                            name={'使用上'}
                        />
                        <SmallButton
                            click={() => router.push("/shortcuts")}
                            icon={<VscSymbolParameter />}
                            name="ショートカット"
                        />
                    </AlignItems>
                </>:
                <>
                    <div>
                        <Button
                        click={()=> router.push('/signup')}
                        icon={<VscAccount />}
                        name="新規登録"
                        />
                    </div>
                    <h5 style={{margin:0}}>Prattle をフルで体験するにはアカウントが必要となります</h5>
                </>
            }
        </header>
    )
}
