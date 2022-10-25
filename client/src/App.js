import logo from './spoti.png';
import './App.css';
import { Component } from "react"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // This binding is necessary to make `this` work in the callback
    this.login = this.login.bind(this);
    this.playlistnow = this.playlistnow.bind(this);
  }

  login() {
    // NOTE calls to our backend look like this. {credentials: "include", mode: "cors"} is mandatory
    // fetch("http://localhost:5000/login", { method: "GET", credentials: "include", mode: "cors"})
    //   .then(res => res.text())
  }

  playlistnow() {
    fetch("http://localhost:5000/playlistnow", { method: "POST", credentials: "include", mode: "cors"})
      .then(res => res.text())
  }

  componentWillMount() {
  }

  render() {
    const mystyle = {
      display: "block",
      position: "relative",
      margin: "0.5em 0",
      padding: ".8em 2.2em",
      cursor: "pointer",

      background: "#FFFFFF",
      border: "none",
      borderRadius: ".4em",

      textTransform: "uppercase",
      fontSize: "1.4em",
      fontFamily: "Work Sans, sans-serif",
      fontWeight: "500",
      letterSpacing: "0.04em",

      mixBlendMode: "color-dodge",
      perspective: "500px",
      transformStyle: "preserve-3d",
    };

    const nodec = {
      textDecoration: "none"
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a style={nodec} href="http://localhost:5000/login"><button style={mystyle} onClick={this.login}> Connect to spotify {this.state.button} </button></a>
          <button style={mystyle} onClick={this.playlistnow}> Make a playlist {this.state.button} </button>
        </header>
      </div>
    );
  }
}

export default App;
