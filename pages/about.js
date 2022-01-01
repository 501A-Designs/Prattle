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
                        content="ShedLive is a cyber-esque chat app application that lets you communicate with your friends and family. Each message sent on shedlive is inserted in as a new column in the messages table. Users can input commands such as $colorname to specify the color of the message they send, and use the * to make their messages appear larger."
                    />
                    <Card
                        name="Technologies"
                        content="ShedLive is built on top of the Next.Js framework. It also uses Supabase as a backend as a service. Supabase is a PostGreSQL based database that is anticipated to become an opensource Firebase alternative. In the new future, ShedLive aims to advance the key commands for a more customized way of communicating."
                    />
                    <Card
                        name="Development"
                        content="ShedLive has been originally developed as a live streaming service. However, due to the over saturation in the market with new applications such as Clubhouse, its development goals have shifted into building a chat application that values the conversations autheticity."
                    />
                    <Card
                        name="Terms & Services"
                        content="Logging into ShedLive requires your email address. You can set your own username, however, it is important to note that any group you join on ShedLive other users will be able to view your credentials (username, email). In terms of your chat messages, ShedLive deletes your messages in a day, this is not only to keep the authenticity of the conversation (hence the name 'Live') but it is also to keep your conversations private and secure. Your messages are deleted at the database level so if you wish to have your messages stay, consider using the notes feature that can be activated in any ShedLive group."
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
                                <td></td>
                                <td>Shows a Google searched resault of the sent message.</td>
                            </tr>
                            <tr>
                                <td>:</td>
                                <td>Send ShedLive original stamps and emotes.</td>
                            </tr>
                            <tr>
                                <td>+</td>
                                <td>Have your message be be packed in a drop down. (add a space between the title and the actual message like this example '+Title lorem ipsum...')</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
