import React,{ useState } from 'react'
import Button from '../lib/Button';
import { useRef } from 'react'
import { supabase } from '../utils/supabaseClient'
import { VscAccount } from "react-icons/vsc";
import Link from 'next/link'
import { useRouter } from "next/router";

export default function Login() {
    const router = useRouter();

    const userEmail = useRef()
    const userPassword = useRef()
    const [userName,setUserName] = useState()
    const user = supabase.auth.user();
    const [generatingAccount, setGeneratingAccount] = useState(1)
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = userEmail.current.value;
        const password = userPassword.current.value;
        console.log(email + ' : ' + password + ' : ' + username);
        await supabase.auth.signUp(
            {
                email: email,
                password: password,
            },
            {
                data: {
                    first_name: username,
                    user_image: `https://avatars.dicebear.com/api/croodles/${username}.svg`,
                    user_profile: `Hi, I'm ${username}`
                }
            }
        )
        setGeneratingAccount(3);
    }

    return (
        <>
            {user ?
                <div style={{ textAlign: 'center' }}>
                    <h1>Hey! Your already in so no worries ;)</h1>
                    <br />
                    <Link href="/">
                        <a>Jump to main page</a>
                    </Link>
                </div> :
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <div className="loginContainer">
                        {generatingAccount === 1 && <>
                            <h2>Getting Started</h2>
                            <h3>
                                Start right away with a few easy steps
                            </h3>
                            <p>
                                Thanks for trying out Prattle! For starters, Prattle is a web based platform that lets you prate your random thoughts. You can think of it as a digital jounral or scrapbook. Btw, its open source ;)
                                <ol>
                                    <li>Create an account</li>
                                    <li>Create a room</li>
                                    <li>Prate your random thoughts and ideas</li>
                                    <li>Start sharing it to your friends and family!</li>
                                </ol>
                            </p>
                            <Button
                                click={()=>setGeneratingAccount(2)}
                                icon={<VscAccount />}
                                name="Start Creating Your Account"
                            /> 
                        </>}          
                        {generatingAccount === 2 && <form className="shedForm">
                                <img className="profileImage" src={userName ? `https://avatars.dicebear.com/api/croodles/${userName}.svg`:'https://www.poynter.org/wp-content/uploads/2021/09/shutterstock_1563012205.png'}/>
                                <input placeholder="Email" type="email" ref={userEmail} />
                                <input placeholder="Password" type="password" ref={userPassword} />
                                <input
                                    placeholder="Prattle Username (no spaces)"
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                                <Button
                                    click={handleSubmit}
                                    icon={<VscAccount />}
                                    name="Sign Up"
                                /> 
                            </form>
                        }
                        {generatingAccount === 3 &&
                            <>
                                <h3>Your account has been created!</h3>
                                <p>Check your email to verify your account.</p>
                                <ul>
                                    <li onClick={()=> rounters.push('/')}>Your dashboard</li>
                                    <li onClick={()=> rounters.push('/profile')}>Your profile</li>
                                </ul>
                            </>
                        }
                        <p>
                            *Sign up for those who do not have an account.
                            <br />
                            <a href="signin">Already have an account?</a>
                        </p>
                    </div>
                </div>
            }
        </>
    )
}
