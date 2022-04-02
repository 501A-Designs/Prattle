import React,{ useState, useEffect} from 'react';
import Image from 'next/image'
import { isMobile } from 'react-device-detect'
import ClickableCard from './ClickableCard'
import StaticScreen from './scene-component/StaticScreen'
import GridItems from './style-component/GridItems'
import prattleIcon from '../public/prattle.png'

import AlignItems from './style-component/AlignItems'
import CenterAll from './style-component/CenterAll'
import TabComponent from './TabComponent'
import { VscDebugStart } from "react-icons/vsc";
import { GhenInterpreter } from 'ghen';
import { useRouter } from "next/router";
import Button from './button-component/Button';
import Card from './Card';

export default function LandingPage() {
    const router = useRouter();
    const [exampleGhen, setExampleGhen] = useState('$red こんにちわ！');

    return (
        <>
        {isMobile ? 
            <StaticScreen type="noMobile">
                Prattleのメインページ    
            </StaticScreen>
        :<>
            <CenterAll>
                <div>
                    <AlignItems gap={'1em'} center={true}>
                        <Image src={prattleIcon} width={60} height={60}/>
                        <h1 className={'title gradientText'}>
                            Prattle
                        </h1>
                    </AlignItems>
                    <p style={{ textAlign: 'center', marginTop: '1.5em'}}>
                        誰もが簡単に作成できるブログ・掲示板プラットフォーム。
                        <br />
                        先ずは、お部屋でおしゃべり。
                    </p>
                    <br />
                    <AlignItems center={true}>
                        <Button icon={<VscDebugStart/>} name="今すぐ始める" click={()=>router.push('/signup')}/>
                    </AlignItems>
                </div>
            </CenterAll>
            <CenterAll>
                <div>
                    <h2>Twitterの速さとブログの一貫性の両方を持ったウェブプラットフォーム</h2>
                    <GridItems grid={'1fr 1fr'}>
                        <Card name="ブログ型コンテンツ">
                            <GridItems grid={'1fr 6fr'}>
                                <h4>短所</h4>
                                <ul>
                                    <li>内容がすぐ古い情報となりがち</li>
                                    <li>誰が言ったのかが何を言ったのかより重視されがち</li>
                                </ul>
                                <h4>長所</h4>
                                <ul>
                                    <li>内容に一貫性がある</li>
                                    <li>内容が常に更新されている</li>
                                </ul>
                            </GridItems>
                        </Card>
                        <Card name={'ショートフォームコンテンツ'}>
                            <GridItems grid={'1fr 6fr'}>
                                <h4>短所</h4>
                                <ul>
                                    <li>内容に一貫性が無い</li>
                                    <li>誰が言ったのかが何を言ったのかより重視されがち</li>
                                </ul>
                                <h4>長所</h4>
                                <ul>
                                    <li>気軽に呟く事ができる</li>
                                    <li>内容が常に更新されている</li>
                                </ul>
                            </GridItems>
                        </Card>
                    </GridItems>

                    <AlignItems center={true}>
                        <div>
                        <h3>Prattleは違う</h3>
                            <p>
                                NoteとTwitterの良さを兼ね備えたウェブプラットフォーム
                                <br/>
                                ブログ型とショートフォームコンテンツを掛け合わせPrattleにユニークな機能を加えることで生まれる良さ：
                            </p>
                            <ul>
                                <li>内容に一貫性がある</li>
                                <li>内容が常に更新されている</li>
                                <li>気軽に呟く事ができる</li>
                                <li>誰が言ったのかが何を言ったのかより重視する</li>
                            </ul>
                        </div>
                    </AlignItems>
                </div>
            </CenterAll>
            <CenterAll>
                <div>
                    <h2>ショートカットを通した素早いインプット</h2>
                    <h4>PrattleはGhenテキスト認証を使用している</h4>
                    <p>コマンドを上のインプットに入力するとこの下に表示されます</p>
                    <input className={"fullInput"} placeholder={'ショートカットを入力してみよう'} onChange={(e)=>{e.preventDefault();setExampleGhen(e.target.value)}} value={exampleGhen}/>
                    <TabComponent icon={<VscDebugStart/>} name={'Prattle'}>
                        {exampleGhen ? <GhenInterpreter inputValue={exampleGhen}/>: '他のショートカットも入力してみよう！'}
                    </TabComponent>
                </div>
            </CenterAll>
            <CenterAll>
                <div>
                    <h2>Prattleについてもっと知ろう</h2>
                    <GridItems
                        grid={'1fr 1fr 1fr 1fr'}
                        className={'autoGrid'}
                        >
                        <ClickableCard
                            href='signup'
                            name='Login / Sign Up'
                            content='アカウントを作成してお喋りを始めよう。'
                            />
                        <ClickableCard
                            href='usage'
                            name='Prattle Docs'
                            content='Prattleについてのページです'
                            />
                        <ClickableCard
                            href='https://github.com/501A-Designs/ShedLive'
                            name='GitHub'
                            content='裏でどういった動作が行われているか知ろう'
                            />
                        <ClickableCard
                            href='https://501a.netlify.app/'
                            name='About Developer'
                            content='501Aによる他のプロジェクトを見よう'
                            />
                    </GridItems>
                </div>
            </CenterAll>
            <a
                href="https://501a.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
            >
                <p style={{ textAlign: 'center' }}>Designed & Developed By 501A</p>
            </a>
        </>
        }
        </>
    )
}