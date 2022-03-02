import ClickableCard from './ClickableCard'
import GridItems from './style-component/GridItems'

export default function LandingPage() {
    return (
        <>
            <main className={'main'}>
                <h1 className={'title gradientText'}>
                    Prattle
                </h1>
                <p style={{ textAlign: 'center' }}>
                    誰もが簡単に作成できるブログ・掲示板プラットフォーム。
                    <br />
                    先ずは、お部屋でおしゃべり。
                </p>
                <br />

                <GridItems grid={'1fr 1fr'}>
                    <ClickableCard
                        href='signup'
                        name='Login / Sign Up'
                        content='アカウントを作成してお喋りを始めよう。'
                    />
                    <ClickableCard
                        href='about'
                        name='Development'
                        content='Prattleが何で作成されているか知ろう'
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
            </main>

            {/* <footer className={'footer'}> */}
            <a
                href="https://501a.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
            >
                <p style={{ textAlign: 'center' }}>Designed & Developed By 501A</p>
            </a>
            {/* </footer> */}
        </>
    )
}