import React from "react";
import memeImage from './memeImage.png'

import './Header.css'

export default function Header(props) {
    return (
        <div className="meme__header">
            <div className='meme__header--nav'>
                <div><img src={memeImage} alt="meme-icon" /></div>
                <div className="meme__header--nav__list">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}