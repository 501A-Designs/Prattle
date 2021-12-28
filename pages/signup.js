import React from 'react'
import ShedButton from './lib/ShedButton';
import { useRef } from 'react'
import { supabase } from '../utils/supabaseClient'
import { VscAccount } from "react-icons/vsc";


export default function Login() {
    const userEmail = useRef()
    const userPassword = useRef()
    const userName = useRef()
    const user = supabase.auth.user();

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
                    first_name: username
                }
            }
        )
        alert(`Hey ${username}! Check your email inbox for a link to active your ShedLive account! (make sure to close this tab since you wont be using it.)`)
    }

    return (
        <>
            {user ?
                <div>
                    <h1>Hey! Your already in so no worries ;)</h1>
                    <br />
                    <a href="/">Jump to main page</a>
                </div> :
                <div className={'centerContainer'}>
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
                        <form className="shedForm">
                            <input placeholder="Email" type="email" ref={userEmail} />
                            <input placeholder="Password" type="password" ref={userPassword} />
                            <input placeholder="ShedLive Username (no spaces)" type="text" ref={userName} />
                            <ShedButton
                                click={handleSubmit}
                                icon={<VscAccount />}
                                name="Sign Up"
                            />
                        </form>
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
