import React, { useEffect } from 'react'
import ShedButton from '../lib/ShedButton';
import Link from 'next/link'

import { useRouter } from "next/router";
import { useRef, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { VscSignIn } from "react-icons/vsc";


export default function Login() {
    const userEmail = useRef()
    const userPassword = useRef()
    const user = supabase.auth.user();
    const router = useRouter();
    const [inputStatus, setInputStatus] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = userEmail.current.value;
        const password = userPassword.current.value;
        await supabase.auth.signIn({
            email: email,
            password: password,
        })
        supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_IN') {
                router.push("/");
            }
        })
        setInputStatus({ borderColor: 'red' })
        console.log('bruh')
    }

    return (
        <>
            {user ?
                <div style={{ textAlign: 'center' }}>
                    <h1>Your In!</h1>
                    <br />
                    <Link href="/">
                        <a>Jump to main page</a>
                    </Link>

                </div> :
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <div className="loginContainer">
                        <h2>Sign In</h2>
                        <h3>
                            Glad your back!
                        </h3>
                        {inputStatus ?
                            <p style={{ color: 'red' }}>
                                Invalid sign in credetials
                            </p> :
                            <p>
                                Thanks for signing back into Shed Live!
                            </p>
                        }
                        <form className="shedForm">
                            <input style={inputStatus} placeholder="Email" type="email" ref={userEmail} />
                            <input style={inputStatus} placeholder="Password" type="password" ref={userPassword} />
                            <ShedButton
                                click={handleSubmit}
                                icon={<VscSignIn />}
                                name="Get Me Back In!"
                            />
                        </form>
                        <p>
                            *Sign in for those who already have an exisiting account.
                            <br />
                            <Link href="/signup">
                                <a>Don&apos;t have an account?</a>
                            </Link>
                        </p>
                    </div>
                </div>
            }
        </>
    )
}