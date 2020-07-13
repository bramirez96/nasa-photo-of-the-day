import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import "./App.css";

import dates from "./assets/dateData";
import dummyImages from "./assets/dummyImages";

// const _API_KEY = "5vw5cIs9ndBnZScVo0cjhNgkgnQWc8M6EWbKuAsz";
const _API_KEY = "NZTi5mupndXtMPERNah8DajY21FsTXmc5dmUguqI";
const _API_URL = `https://api.nasa.gov/planetary/apod?api_key=${_API_KEY}&date=`;

function App(props) {
  // Need to replace this with API pull
  const [images, setImages] = useState(dummyImages);

  const requests = dates.map((date) => {
    return axios.get(`${_API_URL + date}`);
  });

  const newData = [];

  useEffect(() => {
    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          responses.forEach((res) => {
            newData.push(res.data);
          });
          setImages(newData);
        })
      )
      .catch((err) => {
        alert(
          `ERROR ${err.response.status}: ${err.response.statusText} \n Sample images loading...`
        );
      });
  }, []);

  // State Controllers for Toolbar Display
  const [toolbarShow, setToolbarShow] = useState(false);

  // State Controllers for current picture
  const [currentIndex, setCurrentIndex] = useState(0);
  /**
   *
   * @param {string} direction contains "left" or "right"
   */
  const changeImage = (direction) => {
    if (direction === "left") {
      // Increments array
      setCurrentIndex(
        currentIndex + 1 === images.length ? 0 : currentIndex + 1
      );
    } else if (direction === "right") {
      // Decrements array
      setCurrentIndex(
        currentIndex === 0 ? images.length - 1 : currentIndex - 1
      );
    } else {
      // Error?
    }
  };

  const keyPressHandler = (event) => {
    if (event.key === "ArrowRight") changeImage("right");
    if (event.key === "ArrowLeft") changeImage("left");
    console.log(event.key);
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPressHandler);
    return () => {
      document.removeEventListener("keydown", keyPressHandler);
    };
  });

  return (
    <div className="App">
      <Carousel
        images={images}
        show={toolbarShow}
        tbShow={setToolbarShow}
        index={currentIndex}
        changeImage={changeImage}
      />
    </div>
  );
}

function Carousel(props) {
  const { images, show, tbShow, index, changeImage } = props;

  const toggle = (event) => {
    tbShow(!show);
  };

  return (
    <div className="Carousel">
      {images.map((x, i) => {
        if (x.media_type === "video") {
          images[i] = {
            copyright: "Saeid Parchini",
            date: x.date,
            explanation:
              "What divides the north from the south? It all has to do with the spin of the Earth. On Earth's surface, the equator is the dividing line, but on Earth's sky, the dividing line is the Celestial Equator -- the equator's projection onto the sky.  You likely can't see the Earth's equator around you, but anyone with a clear night sky can find the Celestial Equator by watching stars move.  Just locate the dividing line between stars that arc north and stars that arc south.  Were you on Earth's equator, the Celestial Equator would go straight up and down.  In general, the angle between the Celestial Equator and the vertical is your latitude.  The featured image combines 325 photos taken every 30 seconds over 162 minutes. Taken soon after sunset earlier this month, moonlight illuminates a snowy and desolate scene in northwest Iran. The bright streak behind the lone tree is the planet Venus setting.  Almost Hyperspace: Random APOD Generator",
            hdurl:
              "https://apod.nasa.gov/apod/image/2002/StarTrailsTree_Parchini_4000.jpg",
            media_type: "image",
            title: "Star Trails of the North and South",
          };
        }
        return (
          <GalleryImage
            url={x.hdurl}
            key={i}
            className={i === index ? "show" : "hide"}
          />
        );
      })}
      <Toolbar
        show={show}
        toggle={toggle}
        changeImage={changeImage}
        title={images[index].title}
        text={images[index].explanation}
        date={images[index].date}
      />
    </div>
  );
}

const GalleryImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("${(props) => props.url}") no-repeat center center;
  background-size: contain;
  -moz-background-size: contain;
  -o-background-size: contain;
  -webkit-background-size: contain;
  transition: opacity 1s ease-in-out;
  &.show {
    opacity: 1;
  }
  &.hide {
    opacity: 0;
  }
`;

function Toolbar(props) {
  const { show, toggle, changeImage, title, text, date } = props;
  return (
    <div className="Toolbar" onMouseEnter={toggle} onMouseLeave={toggle}>
      <Controls className={show ? "show" : "hide"}>
        <div className="arrow-button" onClick={() => changeImage("left")}>
          &#x293A;
        </div>
        <div className="content">
          <Spread>
            <h1>{title}</h1>
            <h2>{date}</h2>
          </Spread>
          <p>{text}</p>
        </div>
        <div className="arrow-button" onClick={() => changeImage("right")}>
          &#x293B;
        </div>
      </Controls>
    </div>
  );
}

const Spread = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 15px;

  h1,
  h2 {
    font-size: 2rem;
  }
`;

const Controls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 30vh;
  background-color: rgba(20, 20, 20, 0.5);
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: opacity 1s ease-in-out;
  padding: 20px;

  &.show {
    opacity: 1;
  }
  &.hide {
    opacity: 0;
  }

  .content {
    flex-grow: 2;
    padding: 0 20px;
  }
  .arrow-button {
    font-size: 3rem;
    cursor: pointer;
    height: 30vh;
    display: flex;
    align-items: center;
  }
  p {
    font-size: 1.4rem;
    line-height: 1.7rem;
  }
`;

export default App;
