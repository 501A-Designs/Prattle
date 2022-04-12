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
