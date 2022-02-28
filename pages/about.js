import React from 'react'
import Card from '../lib/Card'
import ClickableCard from '../lib/ClickableCard'
import GridItems from '../lib/style-component/GridItems'


export default function about() {
    return (
        <div className="bodyPadding">
            <GridItems grid={'1fr 1fr'}>
                <div>
                    <h1>About Prattle</h1>
                    <h2>Get to know Prattle</h2>
                    <GridItems grid={'1fr 1fr'}>
                        <ClickableCard
                            name="Get Started"
                            content="Sign up using your email account and try out ShedLive!"
                            href="signup"
                        />
                        <ClickableCard
                            name="Visit GitHub"
                            content="View our source code to see how ShedLive functions under the hood."
                        />
                    </GridItems>
                </div>
                <GridItems grid={'1fr'}>
                    <Card
                        name="What is it?"
                        content="Prattle is a chat app/social media application that lets you communicate and share ideas with your friends and family. Each message (prate) sent on Prattle is inserted in as a new column in a PostGres table. Users can input commands such as $colorname to specify the color of the message they send, and use the * to make their messages appear larger. Learn more about shortcuts at prattle.vercel.app/shortcuts"
                    />
                    <Card
                        name="Technologies"
                        content="Prattle is built on top of the Next.Js framework. Next.Js allows Prattle to show Prattle rooms in unique seperate domains. It uses Supabase for its backend. Because Supabase is a PostGreSQL based database, it allows Prattle to make advanced querys enabling you as the user to access relational data quickly and securly."
                    />
                    <Card
                        name="Development"
                        content="Prattle originally known as ShedLive, has been initially developed as a live streaming service. However, due to the over saturation in the market with new applications such as Clubhouse, its development goals have shifted into building a chat/social media application that values the conversations, and the effective sharing of information."
                    />
                </GridItems>
            </GridItems>
        </div>
    )
}
