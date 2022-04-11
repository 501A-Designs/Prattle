import '../styles/globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from '../utils/supabaseClient'

import AlignItems from '../lib/style-component/AlignItems';
import prattleIcon from '../public/prattle.png'
import Image from 'next/image';
import SmallButton from '../lib/button-component/SmallButton';
import { useRouter } from 'next/router';

import {VscAdd,VscAccount,VscComment,VscRepo,VscSymbolParameter} from "react-icons/vsc";
import Button from '../lib/button-component/Button';


function MyApp({ Component, pageProps }) {
  const user = supabase.auth.user();
  const router = useRouter();

  return <>
      {user ?
        <header>
          <Image onClick={() => router.push(`/`)} src={prattleIcon} width={30} height={30}/>
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
        </header>:
        <header>
          <h5 style={{margin:0}}>Prattle をフルで体験するにはアカウントが必要となります</h5>
          <div>
            <Button
              click={()=> router.push('/signup')}
              icon={<VscAccount />}
              name="新規登録"
            />
          </div>
        </header>
      }
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Component {...pageProps} />
    </>
}

export default MyApp
