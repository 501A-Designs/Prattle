import React from 'react'
import Button from '../lib/button-component/Button'
import Card from '../lib/Card'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from "next/router";

export default function Usage() {
    const user = supabase.auth.user();
    const router = useRouter();

    const h2Margin ={
        marginTop:'2em',
        marginBottom:'0'
    }
  return (
      <>
        <header>
            <Button
                name="Main Page"
                click={() =>router.push('/')}
            />
            <h4 style={{margin:0}}>Prattle Docs</h4>
            {user ?
                <Button
                    name="Create Room"
                    click={() =>router.push('/rooms')}
                />
                :<Button
                    name="About Up"
                    click={() =>router.push('/about')}
                />
            }
        </header>
        <div className="bodyPadding">
            <h1>Usage</h1>
            <ul>
                <li>Browsing</li>
                <li>Public Sharing</li>
                <li>Terms of Service</li>
            </ul>
            <h2 style={h2Margin}>Feature Related:</h2>
            <Card
                name={'Browsing'}
                content={'All prattle rooms are toggled to be displayed in the browse page. Creators and owners of rooms can toggle this setting on or off, however this does not prevent people from being able to view your rooms. Browsing only changes the discoverability of the prattle room.'}
            />
            <Card
                name={'Public Sharing'}
                content={'Public sharing is the state of a prattle rooms editability. When public sharing is enabled, other users beside the room owner can add their own prates on to the room. However, admin priviliges such as changing room names, descriptions, ownership and toggling public sharing settings remain to stay private to the owner of the room.'}
            />
            <h2 style={h2Margin}>User Related:</h2>
            <Card
                name="Terms of Service"
                content="Logging into Prattle requires your email address. You can set your own username, however, it is important to note that any group you join on Prattle other users will be able to view your credentials (username, email). In terms of your chat messages, Prattle deletes your messages in a day, this is not only to keep the authenticity of the conversation (hence the name 'Live') but it is also to keep your conversations private and secure. Your messages are deleted at the database level so if you wish to have your messages stay, consider using the notes feature that can be activated in any Prattle room."
            />
        </div>
      </>
  )
}
