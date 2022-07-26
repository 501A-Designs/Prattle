import React from 'react'

export default function Button(props) {
  let button = {
    backgroundColor:`${props.solid ? 'var(--prattleColor1)':'var(--baseColor1)'}`,
    border:`${props.solid ? '1.5px solid var(--prattleColor0)':'var(--baseBorder2)'}`,
    borderRadius:'var(--borderRadius1)',
    color:`${props.solid ? 'white':'black'}`,
    padding:'0.6em 1.5em',
    height:'fit-content',
    // width:'fit-content',
    whiteSpace:'noWrap',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    gap:'5px',
    cursor:'pointer',
    outline:'2px solid transparent',
    userSelect:'none',
    transition:'0.3s',
    boxShadow: `0 0 0 1px ${props.solid ? 'var(--prattleColor1)':'var(--baseColor1)'}`
  }
  return (
    <button
      style={button}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
