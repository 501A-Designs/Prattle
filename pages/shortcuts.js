import React from 'react'
import Card from '../lib/Card'
import ClickableCard from '../lib/ClickableCard'


export default function shortcuts() {
    return (
        <div className="bodyPadding">
            <h1>Shortcuts</h1>
            <h2>Utilize Prattle to its fullist</h2>
            <table>
                <tr>
                    <th>Shortcut</th>
                    <th>Action</th>
                    <th>Example</th>
                </tr>
                <tr>
                    <td>*</td>
                    <td>ご指定のテキストを大きく表示</td>
                    <td>*Hello world</td>
                </tr>
                <tr>
                    <td>/</td>
                    <td>ご指定のテキストをイタリック体に</td>
                    <td>/Hello world</td>
                </tr>
                <tr>
                    <td>$</td>
                    <td>Specificies the color of the sent text. (Allows for plain CSS color names such as Hex color codes and RGB values.)</td>
                    <td>$red Hello world</td>
                </tr>
                <tr>
                    <td>&gt;</td>
                    <td>Shows a Google searched resault of the sent message.</td>
                    <td>&gt;Hello world</td>
                </tr>
                <tr>
                    <td>+</td>
                    <td>Have your message be packed in a drop down, in case your messages become too long.</td>
                    <td>+Hello world this a long text message.</td>
                </tr>
                <tr>
                    <td>!</td>
                    <td>Have your message be sealed. The other users can click a button to open the message.</td>
                    <td>!Hello world</td>
                </tr>
                <tr>
                    <td>#</td>
                    <td>Have your message tagged as either [important], [work] or [question]. This informs the urgancy of your message.</td>
                    <td>#important Hello world</td>
                </tr>
            </table>
        </div>
    )
}
