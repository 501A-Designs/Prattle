import React,{useState} from 'react'
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import TextMessage from './room-component/TextMessage';
import MessageById from './room-component/MessageById';
import * as linkify from 'linkifyjs';
import AlignItems from './style-component/AlignItems';
import Linkify from 'react-linkify';
import VisibilityTag from './tag-component/VisibilityTag';
import { VscLocation } from "react-icons/vsc";
import Tag from './tag-component/Tag';

export default function GhenInterpreter(props) {
  let data = props.inputValue;
  let firstChar = data.split("")[0];

  // Varibles
  let urlCheck = linkify.find(data);
  let urlImageCheck, urlYoutubeVideoCheck = undefined;

  // :test test test --> test test test 
  let keyData = data.substring(1);

  let type = 'text';
  let standardUrl,imageUrl,youtubeUrl = false;

  urlImageCheck = data.match(new RegExp(/(?:png|jpg|jpeg|gif|svg)/i));
  urlYoutubeVideoCheck = data.match(new RegExp(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))/i));

  // Shortcuts
  let setGoogleMap = firstChar.match(new RegExp(/[?]/));
  let setBold = firstChar.match(new RegExp(/[*]/));
  let setItalic = firstChar.match(new RegExp(/[/]/));
  let setColor = firstChar.match(new RegExp(/[$]/));
  let setDropdown = firstChar.match(new RegExp(/[+]/));
  let setAlert = firstChar.match(new RegExp(/[!]/));
  let setTag = firstChar.match(new RegExp(/[#]/));
  let setReprate = firstChar.match(new RegExp(/[:]/));
  

  // const [imgUrlArray, setImgUrlArray] = useState([]);
  let imgUrlArray = [];
  let ytVidUrlArray = [];

  if (urlCheck.length !== 0) {
    standardUrl = true;
    if (urlImageCheck) {
      imageUrl = true;
      standardUrl = false;
      urlCheck.map(prop => {
        if (prop.href.match(new RegExp(/(?:png|jpg|jpeg|gif|svg)/i))) {
          imgUrlArray.push(prop.href.match(new RegExp(/(?:png|jpg|jpeg|gif|svg)/i)));
        }
      })
    } if (urlYoutubeVideoCheck) {
      youtubeUrl = true;
      standardUrl = false;
      urlCheck.map(prop => {
        if (prop.href.match(new RegExp(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))/i))) {
          ytVidUrlArray.push(prop.href.match(new RegExp(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))/i)));
        }
      })
    }
  }
  // setImgUrlArray(imgUrlArrayPrev);
  console.log(imgUrlArray);
  console.log(ytVidUrlArray);

  if (setGoogleMap) {
    type = 'google-map';
  } if (setBold) {
    type = 'bold-text';      
  } if (setItalic) {
    type = 'italic-text';
  } if (setColor) {
    type = 'colored-text';      
  } if (setDropdown) {
    type = 'dropdown-text';
  } if (setReprate) {
    type = 're-prate'
  }
  
  let shortcutProp;
  if (keyData) {
    shortcutProp = keyData.split(' ')[0];
  }

  let elseStandardUrl = false;
  if (imageUrl && youtubeUrl) {
    elseStandardUrl = true    
  }

  return (
    <div>
      <Linkify>
      {type === 're-prate' && 
        <div>
          <p><pre>{data.substr(data.indexOf(" ") + 1)}</pre></p>
          <MessageById messageId={shortcutProp && shortcutProp.split('-')[1]}/>
        </div>
      }
      {type === 'bold-text' && 
        <b><pre>{keyData}</pre></b>
      }
      {type === 'italic-text' && 
        <p><i><pre>{keyData}</pre></i></p>
      }
      {type === 'colored-text' && 
        <p style={{color:shortcutProp}}><pre>{data.substr(data.indexOf(" ") + 1)}</pre></p>
      }
      {type === 'dropdown-text' && 
        <details>
          <summary>
            {
              keyData ? 
                `
                ${keyData.split('')[0]}${keyData.split('')[1] ? keyData.split('')[1]:'_'}${keyData.split('')[2] ? keyData.split('')[2]:'_'}${keyData.split('')[3] ? keyData.split('')[3]:'_'}${keyData.split('')[4] ? keyData.split('')[4]:'_'}${keyData.split('')[5] ? keyData.split('')[5]:'_'}${keyData.split('')[5] ? '. . .':'_'}`:'入力を始める'}
            </summary>
          <p><pre>{keyData}</pre></p>
        </details>
      }
      {
      type !== 're-prate' &&
      type !== 'bold-text' &&
      type !== 'italic-text' &&
      type !== 'colored-text' &&
      type !== 'dropdown-text' &&
      type !== 'google-map' &&
        <p><pre>{data}</pre></p>
      }
      </Linkify>
      {type === 'google-map' && 
        <>
          <Tag color="blue" icon={<VscLocation/>}>{shortcutProp}</Tag>
          <p><pre>{data.substr(data.indexOf(" ") + 1)}</pre></p>
          <iframe
            src={`https://www.google.com/maps?output=embed&q=${shortcutProp}`}
            width="600"
            height="450"
            loading="lazy"
          />
        </>
      }
      {urlCheck && 
        <AlignItems scroll={true} margin={'0'}>
          {imageUrl && imgUrlArray.length !== 0  &&
            <>
              {imgUrlArray.map(props => {
                return <img key={props.input} className={'standardFrame'} src={props && props.input}/>
              })}
            </>
          }
          {youtubeUrl && ytVidUrlArray.length !== 0 &&
            <>
              {ytVidUrlArray.map(props => {
                return <iframe key={props.input} src={`https://www.youtube.com/embed/${props.input && props.input.split('=')[1]}`}/>
              })}
            </>
          }
          {standardUrl && urlCheck.map(props => {
                return <LinkPreview
                  // fallbackImageSrc={'https://github.com/501A-Designs/Prattle/raw/main/public/prattlebanner.png'}
                  key={props.key}
                  url={props.href}
                  padding={'0'}
                  margin={'0'}
                  width='100%'
                  height='200px'
                  fallback={true}
                  borderColor={'var(--baseColor2)'} borderRadius={'var(--borderRadius)'} openInNewTab={true}
                  descriptionLength={20}
                />
              })
          }
        </AlignItems>
      }
    </div>
  )
}
