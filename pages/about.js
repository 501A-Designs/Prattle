import React from 'react'
import Card from '../lib/Card'
import ClickableCard from '../lib/ClickableCard'


export default function about() {
    return (
        <div className="container">
            <div className="grid">
                <div>
                    <h1>About Prattle</h1>
                    <h2>Get to know Prattle</h2>
                    <div className="grid" style={{ width: '80%' }}>
                        <ClickableCard
                            name="Get Started"
                            content="Sign up using your email account and try out ShedLive!"
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
                    <Card
                        name="Terms & Services"
                        content="Logging into Prattle requires your email address. You can set your own username, however, it is important to note that any group you join on Prattle other users will be able to view your credentials (username, email). In terms of your chat messages, Prattle deletes your messages in a day, this is not only to keep the authenticity of the conversation (hence the name 'Live') but it is also to keep your conversations private and secure. Your messages are deleted at the database level so if you wish to have your messages stay, consider using the notes feature that can be activated in any Prattle room."
                    />
                    <div>
                        <table>
                            <tr>
                                <th>Shortcut</th>
                                <th>Action</th>
                            </tr>
                            <tr>
                                <td>$</td>
                                <td>Specificies the color of the sent text. (Allows for plain CSS color names such as Hex color codes and RGB values.)</td>
                            </tr>
                            <tr>
                                <td>*</td>
                                <td>Large text, allowing you to emphasize your messages.</td>
                            </tr>
                            <tr>
                                <td>&gt;</td>
                                <td>Shows a Google searched resault of the sent message.</td>
                            </tr>
                            {/* <tr>
                                <td>:</td>
                                <td>Send ShedLive original stamps and emotes.</td>
                            </tr> */}
                            <tr>
                                <td>+</td>
                                <td>Have your message be be packed in a drop down. (add a space between the title and the actual message like this example &apos;+Title lorem ipsum...&apos;)</td>
                            </tr>
                            <tr>
                                <td>!</td>
                                <td>Have your message be be sealed. The other users can click a button to open the message.</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
