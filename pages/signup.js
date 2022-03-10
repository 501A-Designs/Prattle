import React,{ useState } from 'react'
import Button from '../lib/button-component/Button';
import { useRef } from 'react'
import { supabase } from '../utils/supabaseClient'
import { VscAccount } from "react-icons/vsc";
import Link from 'next/link'
import { useRouter } from "next/router";
import StaticScreen from '../lib/scene-component/StaticScreen';
import { isMobile } from 'react-device-detect';

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
            {isMobile ? 
                <StaticScreen type="noMobile">
                    新規登録    
                </StaticScreen>:
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
                                    簡単に始める
                                </h3>
                                <p>
                                    Prattle（プラトル）をお試しいただき、ありがとうございます。プラトルは、あなたのランダムな考えを書き留めることができるウェブベースのプラットフォームです。デジタル日記やスクラップブックのようなものと考えてください。ちなみに、オープンソースです！
                                    <ol>
                                        <li>アカウントを作成</li>
                                        <li>ルーム（部屋）を作成</li>
                                        <li>思いついたことやアイデアを書き留める</li>
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
                                        <input placeholder="Eメール" type="email" ref={userEmail} />
                                        <input placeholder="パスワード" type="password" ref={userPassword} />
                                        <input
                                            placeholder="ユーザー名"
                                            type="text"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            />
                                        <Button
                                            click={handleSubmit}
                                            icon={<VscAccount />}
                                            name="アカウント作成"
                                        />
                                </form>
                            }
                            {generatingAccount === 3 &&
                                <>
                                    <h3>アカウントが作成されました！</h3>
                                    <p>View your account or check out other rooms</p>
                                    <ul>
                                        <li onClick={()=> router.push('/')}>ダッシュボード</li>
                                        <li onClick={()=> router.push('/browse')}>他の部屋を見る</li>
                                    </ul>
                                </>
                            }
                            <p>
                                *アカウント無い方用
                                <br />
                                <a href="signin">アカウントは既にお持ちですか?</a>
                            </p>
                        </div>
                    </div>
                }
            </>
            }
        </>
    )
}
