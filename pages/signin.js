import React, { useEffect } from 'react'
import Button from '../lib/button-component/Button';
import Link from 'next/link'

import { useRouter } from "next/router";
import { useRef, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { VscSignIn } from "react-icons/vsc";
import StaticScreen from '../lib/scene-component/StaticScreen';
import { isMobile } from 'react-device-detect';

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
            {isMobile ? 
            <StaticScreen type="noMobile">
                ログイン
            </StaticScreen>:
            <>
                {user ?
                    <StaticScreen
                        type="loggedIn"
                    />:
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <div className="loginContainer">
                            <h2>Sign In</h2>
                            <h3>
                                おかえりなさい
                            </h3>
                            {inputStatus ?
                                <p style={{ color: 'red' }}>
                                    入力された情報をもう一度確認してください
                                </p> :
                                <p>
                                    Thanks for signing back into Prattle!
                                </p>
                            }
                            <form className="shedForm">
                                <input style={inputStatus} placeholder="Email" type="email" ref={userEmail} />
                                <input style={inputStatus} placeholder="Password" type="password" ref={userPassword} />
                                <Button
                                    click={handleSubmit}
                                    icon={<VscSignIn />}
                                    name="Get Me Back In!"
                                />
                            </form>
                            <p>
                                *アカウントを既にお持ちである方
                                <br />
                                <Link href="/signup">
                                    <a>アカウントはまだお持ちでないですか？</a>
                                </Link>
                            </p>
                        </div>
                    </div>
                }
            </>
            }
        </>
    )
}