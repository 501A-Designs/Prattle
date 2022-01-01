import ClickableCard from './ClickableCard'

export default function LandingPage() {
    return (
        <div className={'centerContainer'}>
            <main className={'main'}>
                <h1 className={'title'}>
                    Welcome
                    <br />
                    to ShedLive
                </h1>
                <p style={{ textAlign: 'center' }}>
                    More than just a chat app.
                </p>
                <br />

                <div className={'grid'}>
                    <ClickableCard
                        href='signup'
                        name='Visit App'
                        content='Get Started by creating an account.'
                    />
                    <ClickableCard
                        href='about'
                        name='View Development'
                        content='Get to learn what ShedLive is built on top of.'
                    />
                </div>
            </main>

            <footer className={'footer'}>
                <a
                    href="https://501a.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <p style={{ textAlign: 'center' }}>Designed & Developed By 501A</p>
                </a>
            </footer>
        </div>
    )
}