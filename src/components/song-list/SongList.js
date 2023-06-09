import './SongList.css'
import { useState } from 'react';

import { songs } from './songsData';

import { AddToPlaylistOpts } from './AddToPlaylistOpts';
import { SongOptions } from './SongOptions';

export function SongList() {

    const [Song, setSong] = useState({
        id: null,
        songname: null,
        artist: null,
        src: null
    })

    return (
        <>
            <div className='song-list'>
                {/* <AddToPlaylistOpts /> */}
                <SongOptions />
                <div className='songlist-search'>
                    <input type='text' placeholder='search song' />
                    <button>
                        <img src="./nav icons/search.png" alt="" />
                    </button>
                </div>
                {
                    songs.map((song) => {
                        {
                            return (
                                <div key={song.id}>
                                    <SongItem songIcon='./saved-playlist-icon-2.png' song={song} />
                                    <div className='song-item-breaker'></div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </>
    );



    function SongItem(props) {
        const [isPlaying, setIsPlaying] = useState(false);

        return (
            <>
                <div className='song-item'>
                    <div className='song-item-left' onClick={() => { songClickHandler(props.song, setIsPlaying) }}>
                        <div className='song-item-icon-container'>
                            <img className='song-item-icon' src={props.songIcon} alt='song-item-icon'></img>
                        </div>
                        <div className='song-item-name'>
                            <div className='song-songname' style={isPlaying ? ({ 'color': '#c300c3' }) : ({})}>{props.song.songname}</div>
                            <div className='song-singer' style={isPlaying ? ({ 'color': '#396de3' }) : ({})}>{props.song.artist}</div>
                        </div>
                    </div>
                    <div className='song-item-right'>
                        <img className='fav-btn' src='./favorites-icon.png' onClick={(e) => {
                            // console.log(e.target.parentElement.parentElement.children[0].children[1].children[0].innerText)
                            if (e.target.getAttribute('src') == './favorites-icon.png') {
                                e.target.setAttribute('src', './favorites-icon-2.png');
                            }
                            else {
                                e.target.setAttribute('src', './favorites-icon.png');
                            }
                        }} />
                        <button onClick={() => {
                            let song_options = document.getElementById('song-options');
                            if (song_options.style.display == 'none' || song_options.style.display == '') {
                                song_options.style.display = 'flex';
                            }
                            else {
                                song_options.style.display = 'none';
                            }
                        }}>
                            ...
                        </button>
                    </div>
                </div>
            </>
        );

        function songClickHandler(song, setisplaying) {
            console.log('------------------------------------------------------------------');

            // pause the song which was playing previously
            document.getElementById('song').pause();

            setSong(song);
            setisplaying(!isPlaying);

            document.getElementsByClassName('play-pause-btn')[0].src = './player icons/pause.png';
            document.getElementById('song').setAttribute('src', song.src);
            document.getElementsByClassName('player-controller-range')[0].value = 0;
            document.getElementsByClassName('player-song-info-songname')[0].innerText = song.songname
            document.getElementsByClassName('player-song-info-artist')[0].innerText = song.artist

            document.getElementById('song').play().then(() => {
                // setting the max value of seek bar
                document.getElementsByClassName('player-controller-range')[0].setAttribute('max', document.getElementById('song').duration * 10);
            });
        }
    }
}