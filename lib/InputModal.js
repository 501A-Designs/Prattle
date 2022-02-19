import React from 'react'
import EmojiButton from '../../lib/EmojiButton';


export default function InputModal() {
  return (
    <div className="sendMessageForm">
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5em', height: '2em' }}>
      {message ?
        <section className="emojiButtonContainer">
          <EmojiButton emoji={'👋'} click={(e) => { e.preventDefault(); setMessage(message + '👋') }} />
          <EmojiButton emoji={'👌'} click={(e) => { e.preventDefault(); setMessage(message + '👌') }} />
          <EmojiButton emoji={'👍'} click={(e) => { e.preventDefault(); setMessage(message + '👍') }} />
          <EmojiButton emoji={'👎'} click={(e) => { e.preventDefault(); setMessage(message + '👎') }} />
          <EmojiButton emoji={'👏'} click={(e) => { e.preventDefault(); setMessage(message + '👏') }} />
          <EmojiButton emoji={'🤘'} click={(e) => { e.preventDefault(); setMessage(message + '🤘') }} />
          <EmojiButton emoji={'😂'} click={(e) => { e.preventDefault(); setMessage(message + '😂') }} />
          <EmojiButton emoji={'😍'} click={(e) => { e.preventDefault(); setMessage(message + '😍') }} />
          <EmojiButton emoji={'😝'} click={(e) => { e.preventDefault(); setMessage(message + '😝') }} />
          <EmojiButton emoji={'😠'} click={(e) => { e.preventDefault(); setMessage(message + '😠') }} />
          <EmojiButton emoji={'😢'} click={(e) => { e.preventDefault(); setMessage(message + '😢') }} />
          <EmojiButton emoji={'🤧'} click={(e) => { e.preventDefault(); setMessage(message + '🤧') }} />
          <EmojiButton emoji={'🤯'} click={(e) => { e.preventDefault(); setMessage(message + '🤯') }} />
          <EmojiButton emoji={'🤭'} click={(e) => { e.preventDefault(); setMessage(message + '🤭') }} />
          <EmojiButton emoji={'🤨'} click={(e) => { e.preventDefault(); setMessage(message + '🤨') }} />
        </section>
        : <p style={{ margin: 'auto' }}>Get your conversation going!</p>}
      <p style={{ margin: 'auto' }}>{messageByte} Bytes</p>
      <p style={{ margin: 'auto' }}>{messageWordCount} Words</p>
    </div>
    <form
      style={{ marginTop: '0.5em' }}
      className="shedAlignedForm"
      onSubmit={handleMessageSubmit}
    >
      <input
        placeholder="Your message"
        onChange={handleMessageChange}
        value={message}
      />
      <ShedButton
        disabled={!message}
        type="submit"
        click={handleMessageSubmit}
        icon={<VscMail />}
        name="Send"
      />
    </form>
  </div>
  )
}
