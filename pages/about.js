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
                    <h2>Prattle を知ろう</h2>
                    <GridItems grid={'1fr 1fr'}>
                        <ClickableCard
                            name="Get Started"
                            content="お持ちのEmailアカウントでPrattleを始めよう！"
                            href="signup"
                        />
                        <ClickableCard
                            name="GitHub"
                            content="裏でどういった動作が行われているか知ろう"
                            href="https://github.com/501A-Designs/Prattle"
                        />
                    </GridItems>
                </div>
                <GridItems grid={'1fr'}>
                    <Card
                        name="Prattle とは"
                        content="Prattleは、友人や家族とコミュニケーションを取ったり、アイデアを共有したりできるチャットアプリ/ソーシャルメディアアプリケーションです。Prattleで送信された各メッセージ（Prate）は、PostGresのテーブルの新しいカラムとして挿入されます。ユーザーは、$colornameなどのコマンドを入力して、送信するメッセージの色を指定したり、*を使用してメッセージを大きく表示させたりすることができます。ショートカットについて詳しくはprattle.vercel.app/shortcutsをご覧ください。"
                    />
                    <Card
                        name="What is it?"
                        content="Prattle is a chat app/social media application that lets you communicate and share ideas with your friends and family. Each message (prate) sent on Prattle is inserted in as a new column in a PostGres table. Users can input commands such as $colorname to specify the color of the message they send, and use the * to make their messages appear larger. Learn more about shortcuts at prattle.vercel.app/shortcuts"
                    />
                    <Card
                        name="テクノロジー"
                        content="Prattleは、Next.Jsフレームワークの上に構築されています。Next.Jsにより、Prattleは独自の別ドメインでPrattleの部屋を表示することができます。また、バックエンドにSupabaseを使用しています。SupabaseはPostGreSQLベースのデータベースであるため、Prattleは高度なクエリーを行うことができ、ユーザーは迅速かつ安全にリレーショナル・データにアクセスすることができます。"
                    />
                    <Card
                        name="Technologies"
                        content="Prattle is built on top of the Next.Js framework. Next.Js allows Prattle to show Prattle rooms in unique seperate domains. It uses Supabase for its backend. Because Supabase is a PostGreSQL based database, it allows Prattle to make advanced querys enabling you as the user to access relational data quickly and securly."
                    />
                    <Card
                        name="開発状況"
                        content="Prattleは、当初ShedLiveという名称で、ライブストリーミングサービスとして開発されました。しかし、クラブハウスなどの新しいアプリケーションの登場により市場が飽和状態になったため、会話や情報共有を重視したチャット・ソーシャルメディアアプリケーションを開発することを目標に掲げました。"
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
