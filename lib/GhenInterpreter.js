import React,{useState,useEffect} from 'react'
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import Linkify from 'react-linkify';
import TextMessage from './room-component/TextMessage';
import MessageById from './room-component/MessageById';

export default function GhenInterpreter(props) {
  let data = props.inputValue;

  // const [keyData, setKeyData] = useState();
  let firstChar = data.split("")[0];
  // Varibles
  let
  mailCheck,
  urlCheck,
  urlImageCheck,
  urlYoutubeVideoCheck
  = undefined;

  // :test test test --> test test test 
  let keyData = data.substring(1);

  let type = 'text';

  mailCheck = data.match(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g));
  urlCheck = data.match(new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi));
  urlImageCheck = data.match(new RegExp(/(?:png|jpg|jpeg|gif|svg)/i));
  urlYoutubeVideoCheck = data.match(new RegExp(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/));

  // Shortcuts
  let setGoogleMap = firstChar.match(new RegExp(/[?]/));
  let setBold = firstChar.match(new RegExp(/[*]/));
  let setItalic = firstChar.match(new RegExp(/[/]/));
  let setColor = firstChar.match(new RegExp(/[$]/));
  let setGsearch = firstChar.match(new RegExp(/[>]/));
  let setDropdown = firstChar.match(new RegExp(/[+]/));
  let setAlert = firstChar.match(new RegExp(/[!]/));
  let setTag = firstChar.match(new RegExp(/[#]/));
  let setReprate = firstChar.match(new RegExp(/[:]/));
  
  if (urlCheck) {     
    type = 'url';
    if (urlImageCheck) {
      type = 'image'
    } if (urlYoutubeVideoCheck) {
      type = 'youtube-video'
    }
  } if (mailCheck) {
    type = 'email'
  } else{
    type = 'text'
  }

  if (setGoogleMap) {
    type = 'google-map';
  } if (setBold) {
    type = 'bold-text';      
  } if (setItalic) {
    type = 'italic-text';
  } if (setColor) {
    type = 'colored-text';      
  } if (setGsearch) {
    type = 'google-search';
  } if (setDropdown) {
    type = 'dropdown-text';
  } if (setReprate) {
    type = 're-prate'
  }
  console.log('bruh')

  let shortcutProp;
  if (keyData) {
    shortcutProp = keyData.split(' ')[0];
  }

  return (
    <div>
      {type === 'text' && <p><pre><Linkify>{data}</Linkify></pre></p>}
      {type === 're-prate' && 
        <>
          <p>{data.substr(data.indexOf(" ") + 1)}</p>
          <MessageById messageId={shortcutProp.split('-')[1]}/>
        </>
      }
      {/* RegEx content */}
      {type === 'email' && <a href={`mailto:${data}`}>{data}</a>}
      {type === 'url' &&  <LinkPreview url={data} width='260px' height='150px' fallback={true} borderColor={'var(--baseColor2)'} borderRadius={'var(--borderRadius)'} openInNewTab={true}/>}
      {type === 'image' && <img className={'standardFrame'} src={data}/>}
      {type === 'youtube-video' && <iframe src={'https://www.youtube.com/embed/' + data.split('=')[1]}/>}

      {/* Shortcuts */}
      {type === 'google-map' && <iframe src={`https://www.google.com/maps?output=embed&q=${keyData}`} width="600" height="450" loading="lazy"/>}
      {type === 'bold-text' && <b>{keyData}</b>}
      {type === 'italic-text' && <i>{keyData}</i>}
      {type === 'colored-text' && <p style={{color:shortcutProp}}>{data.substr(data.indexOf(" ") + 1)}</p>}
      {type === 'google-search' && <a href={`https://www.google.com/search?q=${keyData}`}>Google Search: {keyData}</a>}
      {type === 'dropdown-text' && 
        <details>
          <summary>{shortcutProp + ' ' + keyData.split(' ')[1] + ' ' + keyData.split(' ')[2]}...</summary>
          <p>{keyData}</p>
        </details>
      }
    </div>
  )
}
