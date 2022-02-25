import '../styles/globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from '../utils/supabaseClient'
import Button from '../lib/Button';
import { VscAccount } from "react-icons/vsc";
import { useRouter } from "next/router";

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
    {!user && <header>
    <h5 style={{margin:0}}>Create an account to have the full experience.</h5>
    <Button
      click={()=> router.push('/signup')}
      icon={<VscAccount />}
      name="Sign Up"
    />  
    </header>
    }
    <Component {...pageProps} />
  </>
}

export default MyApp
