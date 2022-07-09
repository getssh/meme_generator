import {React, useState, useEffect} from 'react'
import Header from './Header';
import Footer from './Footer';
import Draggable from 'react-draggable'; 
import './App.css'

function App() {

  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    thiredText: "",
    fourthText: "",
    textColor : "#000",
    textSizeTop: "25",
    textSizeBottom: "25",
    addText: false,
    memeImage: "https://i.imgflip.com/30b1gx.jpg",
  })

  const [memeImages, setMemeImages] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(data => setMemeImages(data.data.memes))
  }, [])

  function handelChange(event) {
    const {name, value} = event.target;

    setMeme(preMemes => ({
      ...preMemes,
      [name] : value
    }))
  }

  function getMemeImage(event) {
    event.preventDefault()
    const randNumber = Math.floor(Math.random() * memeImages.length);
    const url = memeImages[randNumber].url;

    setMeme(preMeme => ({
      ...preMeme,
      memeImage: url
    }))
  }

  function moreText() {
    setMeme(oldMeme => ({
      ...oldMeme,
      addText: true,
    }))
  }

  return (
    <div className="meme">
      <Header className="meme__header" />
       <div className='meme__elements'>
       <div className='meme__render' style={{
          backgroundImage: `url(${meme.memeImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          }}>
          <Draggable>
            <div className='meme__drag top'>
              <h3 className="meme__top-text" style={{
                color: meme.textColor,
                fontSize: meme.textSizeTop + 'px'}}>
                {meme.topText}
              </h3>
            </div>
          </Draggable>
          {/* <img className="meme__image" alt="" src={meme.memeImage} /> */}
          <Draggable>
            <div className='meme__drag bottom'>
              <h3 className="meme__bottom-text" style={{
                color: meme.textColor,
                fontSize: meme.textSizeBottom + 'px'
                }}>
                {meme.bottomText}
              </h3>
            </div>
          </Draggable>
        </div>
        <form className='meme__form'>
          {/* input changed to textarea to handele newline*/}
          <textarea
            name="topText"
            value={meme.topText}
            placeholder="Meme top text"
            onChange={handelChange}
          ></textarea>
          {/* <input
            type="text"
            name="topText"
            value={meme.topText}
            placeholder="Meme Top Text"
            onChange={handelChange}
          /> <br /> */}
          {/* <input
            type="text"
            name="bottomText"
            value={meme.bottomText}
            placeholder="Meme Bottom Text"
            onChange={handelChange}
          /> */}
          <textarea
            name="bottomText"
            value={meme.bottomText}
            placeholder="Meme bottom text"
            onChange={handelChange}
          ></textarea>

          <input
            type="color"
            name="textColor"
            value={meme.textColor}
            placeholder=""
            onChange={handelChange}
          />
          
          <label htmlFor='textSize' id='textSize'>Top Text Size</label>
          <input
            type="number"
            name="textSizeTop"
            min='5'
            max='50'
            value={meme.textSizeTop}
            onChange={handelChange}
          />
          <label htmlFor='textSize' id='textSize'>Bottom Text Size</label>
          <input
            type="number"
            name="textSizeBottom"
            min='5'
            max='50'
            value={meme.textSizeBottom}
            onChange={handelChange}
          />
          {/*Handel this later adding more text areas conditionally */}
          {/* {meme.addText && 
                <textarea
                  name="thiredText"
                  value={meme.thiredText}
                  placeholder="Meme top text"
                  onChange={handelChange}
                ></textarea>
                 <button onClick={moreText}>Add Text</button>
          } */}

          <button onClick={getMemeImage}>Generate Random Meme</button>
        </form>
        
      </div>
      <Footer />
    </div>
  );
}

export default App;
