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
    </div>
  )
}
