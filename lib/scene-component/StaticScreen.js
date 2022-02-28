import React from 'react'
import GridItems from '../style-component/GridItems'
import Link from 'next/link'

export default function StaticScreen(props) {
  return (
    <div className="bodyPadding">
        {props.type === 'notLoggedIn' &&
          <GridItems>
            <h1>Sorry, you are not logged in :(</h1>
            <br />
            <Link href="/signin">
              Jump sign in page
            </Link>
          </GridItems>
        }
        {props.type === 'loggedIn' &&
          <GridItems>
            <h1>Hey! Your already in so no worries ;)</h1>
            <br />
            <Link href="/">
              Jump to main page
            </Link>
          </GridItems>
        }
        {props.type === 'loading' &&
          <GridItems>
            <h1>Loading...</h1>
            <br />
            {props.children}
          </GridItems>
        }
    </div>
  )
}
