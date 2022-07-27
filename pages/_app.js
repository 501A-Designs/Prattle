import '../styles/globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router';
import { Provider } from 'react-supabase';

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={supabase}>
      <ToastContainer
        toastStyle={{
          backgroundColor: 'var(--baseColor0)',
          color: 'var(--prattleColor0)',
          borderRadius:'var(--borderRadius1)',
          boxShadow:'var(--boxShadow)',
          padding: '1em',
          border:'var(--baseBorder2)'
        }}
        position="top-center"
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
    </Provider>
  )
}

export default MyApp
