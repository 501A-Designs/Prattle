import React from 'react'

export default function SmallButton(props) {
  let smallButton = {
    backgroundColor:`${props.solid ? 'var(--prattleColor1)':'var(--baseColor1)'}`,
    border:`${props.solid ? '1px solid var(--prattleColor0)':'var(--baseBorder1)'}`,
    borderRadius:'var(--borderRadius2)',
    color:`${props.solid ? 'white':'black'}`,
    fontSize:'0.7em',
    padding:'0.5em 1.1em',
    height:'fit-content',
    width:'fit-content',
    whiteSpace:'noWrap',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    gap:'5px',
    cursor:'pointer',
    outline:'2px solid transparent',
    userSelect:'none',
    transition:'0.3s',
  }

  return (
    <button
      key={props.key}
      style={Object.assign(smallButton, props.style)}
      className="iconSmallButton"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}
