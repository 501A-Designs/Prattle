import React from 'react'
import Card from './lib/Card'
import ClickableCard from './lib/ClickableCard'


export default function about() {
    return (
        <div className="container">
            <div className="grid">
                <div>
                    <h1>About ShedLive</h1>
                    <h2>Get to know ShedLive</h2>
                    <div class="grid" style={{width: '80%'}}>
                        <ClickableCard
                            name="Get Started"
                            content="Sign up using your Google account and try out ShedLive!"
                            href="signup"
                        />
                        <ClickableCard
                            name="Visit GitHub"
                            content="View our source code to see how ShedLive functions under the hood."
                        />
                    </div>
                </div>
                <div>
                    <Card
                        name="What is it?"
                        content="ShedLive is a next generation chat application that lets you communicate with your friends and family. Each message sent on shedlive can have a thread generated below it. Using the powerful OpenAI API's text messages can be optionally classified with different colors determining the writers emotion."
                    />
                    <Card
                        name="Technologies"
                        content="ShedLive is built on top of the Next.Js framework. It also uses Supabase as a backend as a service. Because Supabase is a PostGresSQL based database, it is highly scalable and suitable for a chat app. Unlike regular chat applications, ShedLive aims to help its users with tools that would otherwise be out of reach. By using OpenAI's public API that gives us access to the powerful GPT-3, ShedLive is able to classify emotions in a text message as well as summerize long texts to reduce redundancy."
                    />
                    <Card
                        name="Development"
                        content="ShedLive has been originally developed as a live streaming service. However, due to the over saturation in the market with new applications such as Clubhouse, its development goals have shifted into building a chat application that values the conversations autheticity."
                    />
                    <Card
                        name="Terms & Services"
                        content="ShedLive uses Google as its primary authentication tool. Therfore, information such as your Google username, profile photo URl can be accessed by ShedLive. In terms of your chat messages, ShedLive deletes your messages in a day, this is not only to keep the authenticity of the conversation (hence the name 'Live') but it is also to keep your conversations private and secure. Your messages are deleted at the database level so if you wish to have your messages stay, ShedLive may not be the platform for you."
                    />
                </div>
            </div>
        </div>
    )
}
