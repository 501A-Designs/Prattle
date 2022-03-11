import React from 'react'
import GridItems from '../style-component/GridItems'
import Link from 'next/link'

export default function StaticScreen(props) {
  return (
    <div className="bodyPadding">
        {props.type === 'notLoggedIn' &&
          <GridItems>
            <h1>ログインされておりません :(</h1>
            <br />
            <Link href="/signin">
              ログインページへ
            </Link>
          </GridItems>
        }
        {props.type === 'loggedIn' &&
          <GridItems>
            <h1>既ににログインされています ;)</h1>
            <br />
            <Link href="/">
              ダッシュボードへ
            </Link>
          </GridItems>
        }
        {props.type === 'loading' &&
          <GridItems>
            <h1>処理中...</h1>
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
                <li><Link to='/browse'>/browse：部屋の一覧</Link></li>
                <li><Link to='/browse'>/rooms/部屋ID：部屋の閲覧</Link></li>
                <li><Link to='/usage'>/usage：Prattleの使用について</Link></li>
              </ul>
            </p>
          </GridItems>
        }
    </div>
  )
}
