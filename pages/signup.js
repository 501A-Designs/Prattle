import React,{ useState } from 'react'
import Button from '../lib/button-component/Button';
import { useRef } from 'react'
import { supabase } from '../utils/supabaseClient'
import { VscAccount } from "react-icons/vsc";
import Link from 'next/link'
import { useRouter } from "next/router";
import StaticScreen from '../lib/scene-component/StaticScreen';

export default function Login() {
    const router = useRouter();

    const userEmail = useRef()
    const userPassword = useRef()
    const [userName,setUserName] = useState()
    const user = supabase.auth.user();
    const [generatingAccount, setGeneratingAccount] = useState(1)
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setGeneratingAccount(4);
        const email = userEmail.current.value;
        const password = userPassword.current.value;
        console.log(email + ' : ' + password + ' : ' + userName);
        await supabase.auth.signUp(
            {
                email: email,
                password: password,
            },
            {
                data: {
                    first_name: userName,
                    user_image: `https://avatars.dicebear.com/api/croodles/${userName}.svg`,
                    user_profile: `Hi, I'm ${userName}`
                }
            }
        )
        setGeneratingAccount(3);
    }

    return (
        <>
            {user ?
                <StaticScreen
                    type="loggedIn"
                />:
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
                                    <li>アカウントを作成</li>
                                    <li>ルーム（部屋）を作成</li>
                                    <li>Prate your random thoughts and ideas</li>
                                    <li>家族や友達に共有しよう！</li>
                                </ol>
                            </p>
                            <Button
                                click={()=>setGeneratingAccount(2)}
                                icon={<VscAccount />}
                                name="新規登録"
                            /> 
                        </>}          
                        {generatingAccount === 4 && <h4>Loading...</h4>}
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
                                <p>View your account or check out other rooms</p>
                                <ul>
                                    <li onClick={()=> router.push('/')}>Your dashboard</li>
                                    <li onClick={()=> router.push('/browse')}>Browse rooms</li>
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
