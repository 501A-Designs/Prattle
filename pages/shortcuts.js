import React from 'react'

export default function shortcuts() {
    return (
        <div className="bodyPadding">
            <h1>Shortcuts</h1>
            <h2>Prattle をフルに活用</h2>
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
                    <td>送信するテキストの色を指定します。(HexカラーコードやRGB値など、CSSのプレーンな色名を入力すること)</td>
                    <td>$red Hello world</td>
                </tr>
                <tr>
                    <td>&gt;</td>
                    <td>送信されたメッセージのGoogle検索結果を表示します。</td>
                    <td>&gt;Hello world</td>
                </tr>
                <tr>
                    <td>+</td>
                    <td>メッセージが長くなっても大丈夫なように、メッセージをドロップダウンでまとめる。</td>
                    <td>+Hello world this a long text message.</td>
                </tr>
                <tr>
                    <td>?</td>
                    <td>場所をグーグルマップのフレームにピン留め。</td>
                    <td>?Osaka</td>
                </tr>
            </table>
        </div>
    )
}
