import React from "react";
import axios from "axios";
import Toolbar from "./components/Toolbar/Toolbar";
import "./App.css";
import "./components/Carousel/Carousel.css"
import dates from "./assets/dateData";

const _API_KEY = "5vw5cIs9ndBnZScVo0cjhNgkgnQWc8M6EWbKuAsz";
const _API_URL = "https://api.nasa.gov/planetary/apod";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: {
        hdurl:
          "https://images.unsplash.com/photo-1573935146153-f6322e84d1e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
      },
    };
  }

  changeImage = () => {
    this.setState({
      image: {
        hdurl:
          "https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340",
      },
    });
    this.forceUpdate();
    alert("BOOM");
  };

  render() {
    return (
      <div className="App">
        <Carousel image={this.state.image} />
        <div className="Toolbar" onClick={this.changeImage} />
      </div>
    );
  }
}

class Carousel extends App {
  constructor(props) {
    super(props);
    this.state = {
      hdurl: props.image.hdurl,
    };
  }

  render() {
    return (
      <div className="Carousel">
        <img src={this.state.hdurl} />
      </div>
    )
  }
}

export default App;
