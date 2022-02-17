import React from 'react'
import Card from '../lib/Card'
import ClickableCard from '../lib/ClickableCard'


export default function settings() {
    return (
        <div>
            <h1>Settings</h1>
            <h3>Prattle profile</h3>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Data</th>
                </tr>
                <tr>
                    <td>Username / Display Name</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Show the contents of image and video URLS within Prattle</td>
                    <td>On</td>
                </tr>
            </table>
            <p>Some data is not displayed to you on purpose. This is because it contains confidential information that if you present to others, have the potential to have your data to be leaked. Viewing this information yourself is safe, but exporsure to other indivisuals will not be suggested. Prattle will not take any responsibility for any information that has leaked through the sharing of the following information.</p>
            <details>
                <summary>View confidential user information</summary>
                <table>
                    <tr>
                        <td>Query ID</td>
                        <td></td>
                        <td>Your query ID is what differentiates you from other users.</td>
                    </tr>
                </table>
            </details>
            <h3>Customization</h3>
            <table>
                <tr>
                    <th>Setting</th>
                    <th>What it is</th>
                    <th>State</th>
                </tr>
                <tr>
                    <td>Prattle Color</td>
                    <td>Change the highlight color for you Prattle app</td>
                    <td>Prattle Purple</td>
                </tr>
                <tr>
                    <td>Image & Video Preview</td>
                    <td>Show the contents of image and video URLS within Prattle</td>
                    <td>On</td>
                </tr>
            </table>
            <p>More settings coming soon.</p>
        </div>
    )
}
