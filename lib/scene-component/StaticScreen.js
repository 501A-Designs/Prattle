import React from 'react'
import GridItems from '../style-component/GridItems'
import Link from 'next/link'
import AlignItems from '../style-component/AlignItems'

export default function StaticScreen(props) {
  return (
    <div className="bodyPadding">
      <AlignItems center={true} className={'fadeIn centerAll'}>
        {props.type === 'notLoggedIn' &&
          <GridItems>
            <h1>:&apos;(</h1>
            <br />
            <h2>ログインされておりません</h2>
            <p>Prattleをフルに活用するにはアカウントを作成しログインする必要がございます。</p>
            <br />
            <Link href="/signin">
              <a>ログインページへ</a>
            </Link>
          </GridItems>
        }
        {props.type === 'loggedIn' &&
          <GridItems>
            <h1>;)</h1>
            <br />
            <h1>既ににログインされています</h1>
            <br />
            <Link href="/">
              <a>ダッシュボードへ</a>
            </Link>
          </GridItems>
        }
        {props.type === 'loading' &&
          <GridItems>
            <AlignItems>
              <img src="https://i.gifer.com/ZZ5H.gif" width="30px" height="30px"/>
              <h1>処理中...</h1>
            </AlignItems>
            <br />
            {props.children}
          </GridItems>
        }
        {props.type === 'noMobile' &&
          <GridItems>
            <h1>:(</h1>
            <br />
            <h2>{props.children}はモバイル版だと対応していません</h2>
            <h4>ページを開くにはパソコンからアクセスする必要がございます。</h4>
            <code>https://prattle.vercel.app</code>
            <p>
              また、モバイル版だと以下のページにはアクセス可能となります。
              <ul>
                <li><Link href='/browse'><a>/browse：部屋の一覧</a></Link></li>
                <li><Link href='/browse'><a>/rooms/部屋ID：部屋の閲覧</a></Link></li>
                <li><Link href='/usage'><a>/usage：Prattleの使用について</a></Link></li>
              </ul>
            </p>
          </GridItems>
        }
      </AlignItems>
    </div>
  )
}
