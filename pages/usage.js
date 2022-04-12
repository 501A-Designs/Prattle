import React from 'react'
import Button from '../lib/button-component/Button'
import Card from '../lib/Card'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from "next/router";
import Header from '../lib/Header';

export default function Usage() {
    const user = supabase.auth.user();
    const router = useRouter();

    const h2Margin ={
        marginTop:'2em',
        marginBottom:'0'
    }
  return (
      <>
        <Header/>
        <div className="bodyPadding">
            <h1>Usage</h1>
            <ul>
                <li>Browsing</li>
                <li>Public Sharing</li>
                <li>Terms of Service</li>
                <li>What is it</li>
                <li>Technologies</li>
                <li>Development</li>
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
            <h2 style={h2Margin}>About - ENG:</h2>
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
            <h2 style={h2Margin}>About - JPN:</h2>
            <Card
                name="Prattle とは"
                content="Prattleは、友人や家族とコミュニケーションを取ったり、アイデアを共有したりできるチャットアプリ/ソーシャルメディアアプリケーションです。Prattleで送信された各メッセージ（Prate）は、PostGresのテーブルの新しいカラムとして挿入されます。ユーザーは、$colornameなどのコマンドを入力して、送信するメッセージの色を指定したり、*を使用してメッセージを大きく表示させたりすることができます。ショートカットについて詳しくはprattle.vercel.app/shortcutsをご覧ください。"
            />
            <Card
                name="テクノロジー"
                content="Prattleは、Next.Jsフレームワークの上に構築されています。Next.Jsにより、Prattleは独自の別ドメインでPrattleの部屋を表示することができます。また、バックエンドにSupabaseを使用しています。SupabaseはPostGreSQLベースのデータベースであるため、Prattleは高度なクエリーを行うことができ、ユーザーは迅速かつ安全にリレーショナル・データにアクセスすることができます。"
            />
            <Card
                name="開発状況"
                content="Prattleは、当初ShedLiveという名称で、ライブストリーミングサービスとして開発されました。しかし、クラブハウスなどの新しいアプリケーションの登場により市場が飽和状態になったため、会話や情報共有を重視したチャット・ソーシャルメディアアプリケーションを開発することを目標に掲げました。"
            />
        </div>
      </>
  )
}
