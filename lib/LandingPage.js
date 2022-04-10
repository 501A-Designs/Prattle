import React,{ useState } from 'react';
import Image from 'next/image'
import { isMobile } from 'react-device-detect'
import ClickableCard from './ClickableCard'
import GridItems from './style-component/GridItems'
import prattleIcon from '../public/prattle.png'

import AlignItems from './style-component/AlignItems'
import TabComponent from './TabComponent'
import { VscDebugStart,VscCommentDiscussion } from "react-icons/vsc";
import GhenInterpreter from './GhenInterpreter';
import { useRouter } from "next/router";
import Button from './button-component/Button';
import Card from './Card';
import Shortcuts from './Shortcuts';

import { NextSeo } from 'next-seo';


export default function LandingPage() {
    const router = useRouter();
    const [exampleGhen, setExampleGhen] = useState('$red こんにちわ！');

    return (
        <>
            <NextSeo
                title="Prattle"
                description="誰もが簡単に作成できるブログ・掲示板。先ずは、お部屋でおしゃべり。"
                canonical="https://www.canonical.ie/"
                openGraph={{
                url: 'https://www.url.ie/a',
                title: 'Open Graph Title',
                description: 'Open Graph Description',
                images: [
                    {
                    url: 'https://raw.githubusercontent.com/501A-Designs/Prattle/main/public/prattlebanner.png',
                    width: 800,
                    height: 600,
                    alt: 'Og Image Alt',
                    type: 'image/jpeg',
                    },
                ],
                site_name: 'Prattle',
                }}
                twitter={{
                handle: '@handle',
                site: '@site',
                cardType: 'summary_large_image',
                }}
            />
            <AlignItems center={true} className="fade fullHeight">
                <div>
                    <AlignItems gap={'1em'} center={true}>
                        <Image src={prattleIcon} width={isMobile ? 40:60} height={isMobile ? 40:60}/>
                        <h1 className={'title gradientText'}>
                            Prattle
                        </h1>
                    </AlignItems>
                    <p style={{ textAlign: 'center', marginTop: '1.5em'}}>
                        誰もが簡単に作成できるブログ・掲示板。
                        <br />
                        先ずは、お部屋でおしゃべり。
                    </p>
                    <br />
                    <AlignItems center={true}>
                        <Button icon={<VscDebugStart/>} name="今すぐ始める" click={()=>router.push('/signup')}/>
                        <Button icon={<VscCommentDiscussion/>} name="既に存在する部屋を見る" click={()=>router.push('/browse')}/>
                    </AlignItems>
                </div>
            </AlignItems>
            <AlignItems center={true} className="fade centerAll">
                <div>
                    <h1>Prattleの立場</h1>
                    <h4>Twitterの速さとブログの一貫性の両方を持ったウェブプラットフォーム</h4>
                    <div className="grid duoGrid">
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
                            <GridItems grid={'1fr 7fr'}>
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
                        <Card borderRadius={isMobile ? '1em':'1em 0 0 1em'} name="Prattleは違う">
                            <p>
                                PrattleはNoteやTwitter等のプラットフォームの良さを兼ね備えたウェブアプリです。
                                <br/>
                                ブログ型とショートフォームコンテンツを掛け合わせ、Prattleにユニークな機能を加えることで生まれる良さもあります。
                            </p>
                        </Card>
                        <Card borderRadius={isMobile ? '1em' : '0 1em 1em 0'} name="新たな良さ">
                            <ul>
                                <li>内容に一貫性がある</li>
                                <li>内容が常に更新されている</li>
                                <li>気軽に呟く事ができる</li>
                                <li>誰が言ったのかが何を言ったのかより重視する</li>
                            </ul>
                        </Card>
                    </div>
                </div>
            </AlignItems>
            <AlignItems center={true} className="fade centerAll">
                <div>
                    <div>
                        <h1 style={{textAlign: 'right'}}>効率的な入力</h1>
                        <h4 style={{textAlign: 'right'}}>Prattleには多くのショートカットが含まれています</h4>
                    </div>
                        <h2>ショートカットを通した素早いインプット</h2>
                        <Card name="お試しください">
                            <input className={"fullInput"} placeholder={'ショートカットを入力してみよう'} onChange={(e)=>{e.preventDefault();setExampleGhen(e.target.value)}} value={exampleGhen}/>
                            <p>コマンドを上のインプットに入力するとこの下に表示されます</p>
                            <TabComponent icon={<VscDebugStart/>} name={'Prattle'}>
                                {exampleGhen ? <GhenInterpreter inputValue={exampleGhen}/>: <div>
                                    <h3>他のショートカット</h3>
                                    <p>他のショートカットも入力してみよう！</p>
                                    <ul>
                                        <li>$red こんにちわ</li>
                                        <li>?大阪</li>
                                        <li>/こんにちわ</li>
                                        <li>*こんにちわ</li>
                                        <li>+こんにちわ！ショートカットをお試ししてくださりいかがでしょうか？</li>
                                    </ul>
                                </div>}
                            </TabComponent>
                        </Card>
                </div>
            </AlignItems>
            <AlignItems center={true} className="fade centerAll">
                <div>
                    <h2>Prattleについてもっと知ろう</h2>
                    <div className="grid duoGrid">
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
                    </div>
                </div>
            </AlignItems>
            <a
                href="https://501a.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
            >
                <p style={{ textAlign: 'center' }}>Designed & Developed By 501A</p>
            </a>
        </>
    )
}