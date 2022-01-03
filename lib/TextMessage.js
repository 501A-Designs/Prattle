import ShedButton from "./ShedButton";
import { VscGift } from "react-icons/vsc";
import { supabase } from '../utils/supabaseClient'

export default function TextMessage(props) {
    const user = supabase.auth.user();

    let name = props.name;
    let content = props.content;
    let time = props.time;
    let room = props.currentRoom;

    // Sent message
    let foundUrl = null;
    let regex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

    if (content.match(regex)) {
        foundUrl = content;
    }
    let firstChar = content.split("")[0];
    let setBold = firstChar.match(new RegExp(/[*]/));
    let setColor = firstChar.match(new RegExp(/[$]/));
    let setGsearch = firstChar.match(new RegExp(/[>]/));
    let setDropdown = firstChar.match(new RegExp(/[+]/));
    let setAlert = firstChar.match(new RegExp(/[!]/))
    let imgClassification = content.match(new RegExp(/(https?:\/\/.*\.(?:png|jpg|gif))/i));
    let ytvidClassification = content.match(new RegExp(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/));
    let embededVid = 'https://www.youtube.com/embed/' + content.split('=')[1];
    let gSearch = 'https://www.google.com/search?q=' + content;


    const handleSaveNote = async () => {
        if (window.confirm(`Add [${content}] to notes?`)) {
            const { data, error } = await supabase
                .from('notes')
                .insert([{
                    created_at: time,
                    message: content,
                    set_by: user.user_metadata.first_name,
                    who_said: name,
                    room_id: room
                },])
            console.log('created')
        }
    }

    return (
        <div
            className="shedLiveTextMessage"
            key={props.key}
        >
            <div>
                <h4 title="View Profile">{name}</h4>
                {!foundUrl && !setBold && !setColor && !setGsearch && !setDropdown && !setAlert &&
                    <span
                        title="Save to notes"
                        onClick={() => handleSaveNote()}>
                        {content}
                    </span>
                }
                {setColor &&
                    <span
                        style={{ color: content.split(' ')[0].substring(1) }}
                        title="Cannot add to notes"
                    >
                        {content.substr(content.indexOf(" ") + 1)}
                    </span>
                }
                {setBold &&
                    <h3
                        title="Save bold text message to notes"
                        onClick={handleSaveNote}
                    >
                        {content.substring(1)}
                    </h3>
                }
                {setGsearch &&
                    <div>
                        Google search:
                        <a href={gSearch}>{content.substring(1)}</a>
                    </div>
                }
                {setDropdown &&
                    <details>
                        <summary>{content.split(' ')[0].substring(1) + ' ' + content.split(' ')[1] + ' ' + content.split(' ')[2]}...</summary>
                        <p>{content.substring(1)}</p>
                    </details>
                }
                {setAlert &&
                    <ShedButton
                        click={() => { alert('Message says: ' + content.substring(1)) }}
                        icon={<VscGift />}
                        name={'Open sealed message'}
                    />
                }
                {foundUrl &&
                    <section className="urlContent">
                        <a href={content}>{imgClassification ? 'JPG/PNG Image' : content}</a>
                        {imgClassification &&
                            <img src={content} alt="Img url on ShedLive" />
                        }
                        {ytvidClassification &&
                            <iframe src={embededVid} />
                        }
                    </section>
                }
            </div>
            <time>{time.split('T')[1]}</time>
        </div>
    )
}