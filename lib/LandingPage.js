import ClickableCard from './ClickableCard'
import Image from 'next/image'
import shedliveLogo from '../public/shedlivelogo.png'

export default function LandingPage() {
    return (
        <>
            <main className={'main'}>
                <Image
                    src={shedliveLogo}
                    width={100}
                    height={100}
                />
                <br />
                <br />
                <h1 className={'title gradientText'}>
                    Welcome
                    <br />to Prattle
                </h1>
                <p style={{ textAlign: 'center' }}>
                    Prate in rooms. (Open source Twitter alternative?)
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
                        content='Get to learn what Prattle is built on top of.'
                    />
                    <ClickableCard
                        href='https://github.com/501A-Designs/ShedLive'
                        name='Visit GitHub'
                        content='Get to know whats going on under the hood.'
                    />
                    <ClickableCard
                        href='https://501a.netlify.app/'
                        name='View Developer'
                        content='View other creations by 501A.'
                    />
                </div>
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