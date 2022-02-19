import React from 'react'

export default function StickyBottom(props) {
    const stickyBottom = {
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'sticky',
        bottom: '1em',
        marginTop: 'auto',
        width: '100%'
    }
  return (
    <div style={stickyBottom}>
        {props.children}
    </div>
  )
}
