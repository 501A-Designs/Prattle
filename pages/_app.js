import '../styles/globals.css'
import React, { useEffect } from 'react'
import { supabase } from '../utils/supabaseClient';
import { useRouter } from "next/router";


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const user = supabase.auth.user();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          handleAuthSession(event, session);
          supabase
            .from("user")
            .upsert({ user_name: user.user_metadata.first_name, user_id: user.id })
            .then((_data, error) => {
              if (!error) {
                router.push("/");
              }
            });
        }
        if (event === "SIGNED_OUT") {
          router.push("/signin");
        }
      }
    );
    return () => {
      authListener.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    if (user) {
      if (router.pathname === "/signin") {
        router.push("/");
      }
    }
  }, [router.pathname, user, router]);

  const handleAuthSession = async (event, session) => {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  };

  return <Component {...pageProps} />
}

export default MyApp
