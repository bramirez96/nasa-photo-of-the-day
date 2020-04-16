import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import "./App.css";

import dates from "./assets/dateData";

const _API_KEY = "5vw5cIs9ndBnZScVo0cjhNgkgnQWc8M6EWbKuAsz";
const _API_URL = `https://api.nasa.gov/planetary/apod?api_key=${_API_KEY}&date=`;

function App(props) {
  const [images, setImages] = useState([
    {
      copyright: "ScottAspinall",
      date: "2020-04-15",
      explanation:
        "It was an astronomical triple play. Setting on the left, just after sunset near the end of last month, was our Moon -- showing a bright crescent phase.  Setting on the right was Venus, the brightest planet in the evening sky last month -- and this month, too.  With a small telescope, you could tell that Venus' phase was half, meaning that only half of the planet, as visible from Earth, was exposed to direct sunlight and brightly lit. High above and much further in the distance was the Pleiades star cluster.  Although the Moon and Venus move with respect to the background stars, the Pleiades do not -- because they are background stars. In the beginning of this month, Venus appeared to move right in front of the Pleiades, a rare event that happens only once every eight years.  The featured image captured this cosmic triangle with a series of exposures taken from the same camera over 70 minutes near Avonlea, Saskatchewan, Canada. The positions of the celestial objects was predicted. The only thing unpredicted was the existence of the foreground tree -- and the astrophotographer is still unsure what type of tree that is.",
      hdurl: "https://apod.nasa.gov/apod/image/2004/MVP_Aspinall_2048.jpg",
      media_type: "image",
      service_version: "v1",
      title: "A Cosmic Triangle",
      url: "https://apod.nasa.gov/apod/image/2004/MVP_Aspinall_960.jpg",
    },
    {
      date: "2020-04-14",
      explanation:
        "NGC 253 is one of the brightest spiral galaxies visible, but also one of the dustiest.  Dubbed the Silver Coin for its appearance in smalltelescopes, it is more formally known as the Sculptor Galaxy for its location within the boundaries of the southern constellation Sculptor.  Discovered in 1783 by mathematician and astronomer Caroline Herschel, the dusty island universe lies a mere 10 million light-years away. About 70 thousand light-years across, NGC 253, pictured, is the largest member of the Sculptor Group of Galaxies, the nearest to our own Local Group of galaxies.  In addition to its spiral dust lanes, tendrils of dust seem to be rising from a galactic disk laced with young star clusters and star forming regions in this sharp color image. The high dust content accompanies frantic star formation, earning NGC 253 the designation of a starburst galaxy. NGC 253 is also known to be a strong source of high-energy x-rays and gamma rays, likely due to massive black holes near the galaxy's center. Take a trip through extragalactic space in this short video flyby of NGC 253.   Astrophysicists: Browse 2,100+ codes in the Astrophysics Source Code Library",
      hdurl:
        "https://apod.nasa.gov/apod/image/2004/NGC253_HstSubaruEsoNew_3500.jpg",
      media_type: "image",
      service_version: "v1",
      title: "NGC 253: The Silver Coin Galaxy",
      url:
        "https://apod.nasa.gov/apod/image/2004/NGC253_HstSubaruEsoNew_960.jpg",
    },
    {
      date: "2020-04-13",
      explanation:
        "How did this big rock end up on this strange terrain? One of the more unusual places here on Earth occurs inside Death Valley, California, USA.  There a dried lakebed named Racetrack Playa exists that is almost perfectly flat, with the odd exception of some very large stones, one of which is pictured here in April of 2019 beneath a dark, Milky-Way filled sky.  Now the flatness and texture of large playa like Racetrack are fascinating but not scientifically puzzling -- they are caused by mud flowing, drying, and cracking after a heavy rain.  Only recently, however, has a viable scientific hypothesis been given to explain how heavy  sailing stones end up near the middle of such a large flat surface.  Unfortunately, as frequently happens in science, a seemingly surreal problem ends up having a relatively mundane solution.  It turns out that in winter thin floating ice sheets form in a rare ephemeral lake, and light winds push ice sections that then push even heavy rocks across the temporarily flooded playa when sunlight begins to melt the ice.",
      hdurl:
        "https://apod.nasa.gov/apod/image/2004/SailingStone_Burke_1366.jpg",
      media_type: "image",
      service_version: "v1",
      title: "A Sailing Stone across Death Valley",
      url: "https://apod.nasa.gov/apod/image/2004/SailingStone_Burke_960.jpg",
    },
    {
      date: "2020-04-12",
      explanation:
        "While drifting through the cosmos, a magnificent interstellar dust cloud became sculpted by stellar winds and radiation to assume a recognizable shape.  Fittingly named the Horsehead Nebula, it is embedded in the vast and complex Orion Nebula (M42).  A potentially rewarding but difficult object to view personally with a small telescope, the above gorgeously detailed image was taken in 2013 in infrared light by the orbiting Hubble Space Telescope in honor of the 23rd anniversary of Hubble's launch. The dark molecular cloud, roughly 1,500 light years distant, is cataloged as Barnard 33 and is seen above primarily because it is backlit by the nearby massive star Sigma Orionis. The Horsehead Nebula will slowly shift its apparent shape over the next few million years and will eventually be destroyed by the high energy starlight.   April:  (AWB's) Global Astronomy Month",
      hdurl:
        "https://apod.nasa.gov/apod/image/2004/horseheadir_hubble_1225.jpg",
      media_type: "image",
      service_version: "v1",
      title: "The Horsehead Nebula in Infrared from Hubble",
      url: "https://apod.nasa.gov/apod/image/2004/horseheadir_hubble_960.jpg",
    },
  ]);

  const [toolbarShow, setToolbarShow] = useState(true);

  const toggleToolbar = () => {
    return setToolbarShow(!toolbarShow);
  };

  /*useEffect(() => {
    // dates.forEach((date) => {
    axios
      .get(`${_API_URL + dates[1]}`)
      .then((res) => {
        images.push(res.data);
      })
      .catch((err) => {
        alert(`Error ${err.status}: Try Again`);
      });
    // });
  }, [images]);*/

  return (
    <div className="App">
      <Carousel images={images} show={toolbarShow} toggle={toggleToolbar} />
    </div>
  );
}

function Carousel(props) {
  const { images, show, toggle } = props;
  let count = 0;

  return (
    <div className="Carousel">
      {images.map((x) => {
        {
          count++;
        }
        return (
          <GalleryImage
            url={x.hdurl}
            key={count}
            className={count === 1 ? "show" : "hide"}
          />
        );
      })}
      <Toolbar />
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
  return (
    <div className="Toolbar">
      <Controls>
        <div className="arrow-button">&#x293A;</div>
        <div className="content">
          lorem ispainfsdads asdfjibhnaf asodiuabsfd asdfjlsf asdf sdf sd fgsadf
          asdf gs sfd g zxcvs sdeflki asdf asfd lasfkidhjasflkjasfd asfgdlksjfd
          sdkjlh ssdflkhj dslk fs lof bslgf aljv laf lajvg lajv aljvf a
        </div>
        <div className="arrow-button">&#x293B;</div>
      </Controls>
    </div>
  );
}

const Controls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 15vh;
  background-color: rgba(20, 20, 20, 0.9);
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: opacity 1s ease-in-out;

  &.true {
    opacity: 1;
  }
  &.false {
    opacity: 0;
  }

  .content {
    flex-grow: 2;
  }
  .arrow-button {
    font-size: 3rem;
    padding: 20px;
    cursor: pointer;
  }
`;

export default App;
