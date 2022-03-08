import '../styles/globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from '../utils/supabaseClient'
import { useRouter } from "next/router";
import { isMobile } from 'react-device-detect';

function MyApp({ Component, pageProps }) {
  // const user = supabase.auth.user();
  // const router = useRouter();

  return <>
    {/* {!isMobile ?  */}
    <>
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
    {/* :<h1>Prattle is not supported on mobile yet.<br/><br/>Sorry :(</h1>} */}
  </>
}

export default MyApp
