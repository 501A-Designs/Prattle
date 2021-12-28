import React, { useEffect } from 'react'
import ShedButton from './lib/ShedButton';
import { useRouter } from "next/router";
import { useRef, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { VscSignIn } from "react-icons/vsc";


export default function login() {
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
                <div className={'centerContainer'}>
                    <h1>Your In!</h1>
                    <br />
                    <a href="http://localhost:3000/" style={{ textAlign: 'center' }}>Jump to main page</a>
                </div> :
                <div className={'centerContainer'}>
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
                            <a href="signup">Don't have an account?</a>
                        </p>
                    </div>
                </div>
            }
        </>
    )
}