import React from 'react'
import { IconContext } from "react-icons";

export default function IconButton(props) {
  let button = {
    backgroundColor:`
      ${
        props.solid ? 'var(--prattleColor1)':
          props.noOutline ? 'transparent':'var(--baseColor0)'
      }
    `,
    border:`
      ${
        props.solid ? '1.5px solid var(--prattleColor0)':
          props.noOutline ? 'none':'var(--baseBorder2)'
      }
    `,
    borderRadius:'var(--borderRadius1)',
    color:`${props.solid ? 'white':'black'}`,
    padding:'0.5em',
    fontSize:'1em',
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
      style={button}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
