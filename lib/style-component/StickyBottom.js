import React from 'react'

export default function StickyBottom(props) {
  const stickyBottom = {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'sticky',
    bottom: '0',
    marginTop: 'auto',
    paddingBottom: '1em',
    width: '100%',
    gap:'1em',
    background: 'linear-gradient(to top,var(--baseColor0) 0%,rgba(255,255,255,0) 100%)',
  }

  return (
    <div style={stickyBottom}>
      {props.children}
    </div>
  )
}
