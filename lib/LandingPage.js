import Image from 'next/image'
import { isMobile } from 'react-device-detect'
import ClickableCard from './ClickableCard'
import StaticScreen from './scene-component/StaticScreen'
import GridItems from './style-component/GridItems'
import prattleIcon from '../public/prattle.png'
import AlignItems from './style-component/AlignItems'

export default function LandingPage() {
    return (
        <>
        {isMobile ? 
            <StaticScreen type="noMobile">
                Prattleのメインページ    
            </StaticScreen>
        :<>
            <main className={'main'}>
                <AlignItems gap={'1em'}>
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

                <div>                    
                    <GridItems
                        grid={'1fr 1fr'}
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
            </main>
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