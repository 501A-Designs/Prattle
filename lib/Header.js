import React from 'react'

import { supabase } from '../utils/supabaseClient'

import AlignItems from '../lib/style-component/AlignItems';
import prattleIcon from '../public/prattle.png'
import Image from 'next/image';
import IconButton from '../lib/button-component/IconButton';
import { useRouter } from 'next/router';

import Button from '../lib/button-component/Button';
import { FiPlus, FiSearch, FiUser } from 'react-icons/fi';

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
    justifyContent: 'space-between',
    gap: '1em',
    borderBottom: 'var(--baseBorder2)',
    backgroundColor: 'var(--baseColor0)',
    opacity: '95%'
  }

  return (
    <header style={header}>
      {user ?
        <>
          <AlignItems
            style={{
              cursor:'pointer',
              userSelect: 'none'
            }}
          >
            <Image
              onClick={() => router.push(`/`)}
              src={prattleIcon}
              width={30}
              height={30}
            />
            <h3 style={{margin:0}}>Prattle</h3>
          </AlignItems>
          <AlignItems>
            <IconButton
              onClick={() => router.push(`/rooms`)}
            >
              {/* 新規部屋作成 */}
              <FiPlus />
            </IconButton>
            <IconButton
              onClick={() => router.push(`/browse`)}
            >
              {/* 他の部屋を見る */}
              <FiSearch />
            </IconButton>
            <IconButton
              onClick={() => router.push(`/profile`)}
              solid
            >
              {/* アカウント */}
              <FiUser />
            </IconButton>
            {/* <IconButton
              onClick={() => router.push(`/usage`)}
            >
              使用上
              <VscRepo />
            </IconButton>
            <IconButton
              onClick={() => router.push("/shortcuts")}
            >
              ショートカット
              <VscSymbolParameter />
            </IconButton> */}
          </AlignItems>
        </>:
        <>
          <h5 style={{margin:0}}>
            Prattle をフルで体験するにはアカウントが必要となります
          </h5>
          <Button
            onClick={()=> router.push('/signup')}
            solid
            // icon={<VscAccount />}
          >
            新規登録
          </Button>
        </>
      }
    </header>
  )
}

