
export default function TextMessage(props) {
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
    let setBold = content.match(new RegExp(/[*]/));
    let setColor = content.match(new RegExp(/[$]/));
    let setGsearch = content.match(new RegExp(/[>]/));
    let imgClassification = content.match(new RegExp(/(https?:\/\/.*\.(?:png|jpg))/i));
    let ytvidClassification = content.match(new RegExp(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/));
    let embededVid = 'https://www.youtube.com/embed/' + content.split('=')[1];
    let gSearch = 'https://www.google.com/search?q=' + content;


    const handleSaveNote = async () => {
        if (window.confirm(`Add [${message}] to notes?`)) {
            const { data, error } = await supabase
                .from('notes')
                .insert([{
                    created_at: time,
                    message: message,
                    set_by: user.user_metadata.first_name,
                    who_said: name,
                    room_id: currentRoom
                },])
        }
    }

    return (
        <div
            className="shedLiveTextMessage"
            key={props.key}
        >
            <h4 title="View Profile" onClick={props.inspectUserData}>{name}</h4>
            {!foundUrl && !setBold && !setColor && !setGsearch &&
                <span
                    title="Save to notes"
                    onClick={handleSaveNote}>
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
            {foundUrl &&
                <div>
                    <a href={content}>{imgClassification ? 'JPG/PNG Image' : content}</a>
                    {imgClassification &&
                        <img src={content} alt="Img url on ShedLive" />
                    }
                    {ytvidClassification &&
                        <iframe src={embededVid} />
                    }
                </div>
            }
            <time>{time.split('T')[1]}</time>
        </div>
    )
}