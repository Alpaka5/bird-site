export default function AudioPlayer({src, id}: { src: string, id: string}) {
    return(
        <div id={id}>
            <audio src={src} id={id + "audio"}/>
            <button id="play-icon"></button>
            <span id="current-time" className="time">0:00</span>
            <input type="range" id="seek-slider" max="100" value="0"/>
            <span id="duration" className="time">0:00</span>
            <output id="volume-output">100</output>
            <input type="range" id="volume-slider" max="100" value="100"/>
            <button id="mute-icon"></button>
        </div>
    )
}