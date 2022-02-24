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
    const userName = useRef()
    const user = supabase.auth.user();
    const [generatingAccount, setGeneratingAccount] = useState('false')
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = userEmail.current.value;
        const password = userPassword.current.value;
        const username = userName.current.value;
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
        setGeneratingAccount('true');
        // let myPromise = new Promise((loadedAuthUserInfo, haventLoadedAuthUserInfo) => {
        //     if (user.id) {
        //         loadedAuthUserInfo("OK");
        //     } else {
        //         haventLoadedAuthUserInfo("Error");
        //     }
        //   });
        // myPromise.then(
        //     function(value) {
        //         alert(value + user.id);
        //     },
        //     function(error) {
        //         alert(error);
        //     }
        // );
        // insertUserInfo();
    }

    // const insertUserInfo = async () => {
    //         const { data, error } = await supabase
    //         .from('users')
    //         .insert([{
    //             user_id: user.id,
    //             user_name: user.user_metadata.first_name,
    //             user_mail: user.email,
    //             user_profile: `Hi! I'm ${user.user_metadata.first_name}`,
    //             user_image: `https://avatars.dicebear.com/api/croodles/${user.user_metadata.first_name}.svg`
    //         },])
    //         alert('bruh');
    //         setGeneratingAccount('done');
    //     }

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
                        <h2>Getting Started</h2>
                        <h3>
                            Start right away with a few easy steps
                        </h3>
                        <p>
                            Thanks for trying out Shed Live! For starters, Shed Live is a web based chat platform that lets you communicate with your friends and family.
                            <br />
                            Think of it like Twitch x Clubhouse.
                            <ol>
                                <li>Input credetials to create an account</li>
                                <li>Copy your user ID</li>
                                <li>Invite your friends and family and share each others user ID&apos;s so that you can add each other.</li>
                                <li>Start chatting in the shed!</li>
                            </ol>
                        </p>                                
                        {generatingAccount === 'true' ?
                            <>
                                <p>Finalizing your account...</p>
                            </>
                            :<form className="shedForm">
                                <input placeholder="Email" type="email" ref={userEmail} />
                                <input placeholder="Password" type="password" ref={userPassword} />
                                <input placeholder="Prattle Username (no spaces)" type="text" ref={userName} />
                                <Button
                                    click={handleSubmit}
                                    icon={<VscAccount />}
                                    name="Sign Up"
                                /> 
                            </form>
                        }
                        {generatingAccount === 'done' &&
                            <>
                                <h3>Your account has been created!</h3>
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
