import React, { useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'

export default function ChatApp() {
    const user = supabase.auth.user();

    // useEffect(async () => {
    //     const { data, error } = await supabase
    //         .from('user')
    //         .insert([
    //             { name: user.user_metadata.first_name, user_id: user.id }
    //         ])
    // }, [])

    return (
        <div className={'centerContainer'}>
            <h1>Hi, {user.user_metadata.first_name}</h1>
            <div>
                <p>
                    Welcome to ShedLive, you are authenticated.
                    <br />
                    Now that you are in you can go ahead and <a href="chat">chat now!</a>
                    <br />
                    Below is some of the info we have about you.
                </p>
                <ul>
                    <li>Username: {user.user_metadata.first_name}</li>
                    <li>User ID: {user.id}</li>
                    <li>Email Address: {user.email}</li>
                </ul>

            </div>
        </div>
    )
}
