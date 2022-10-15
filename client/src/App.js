import logo from './logo.svg';
import './App.css';
import { Component } from "react"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      logged: "",
      button: "initial"};

    // This binding is necessary to make `this` work in the callback
    this.dynamicAPI = this.dynamicAPI.bind(this);
    this.inc = this.inc.bind(this);
    this.dec = this.dec.bind(this);
  }

  callAPI() {
    fetch("http://localhost:5000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  inc() {
    // NOTE calls to our backend look like this. {credentials: "include", mode: "cors"} is mandatory
    fetch("http://localhost:5000/inc", { method: "GET", credentials: "include", mode: "cors"})
      .then(res => res.text())
      .then(res => this.setState({ button: "num: " + res }));
  }

  dec() {
    fetch("http://localhost:5000/dec", { method: "GET", credentials: "include", mode: "cors"})
      .then(res => res.text())
      .then(res => this.setState({ button: "num: " + res }));
  }

  dynamicAPI() {
    // calls like this do not send session data, so can be used only to get public resources
    fetch("http://localhost:5000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ button: "received: " + res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="App-intro">status: {this.state.apiResponse}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>

          <button onClick={this.dynamicAPI}> button: {this.state.button} </button>

          <a
            href="http://localhost:5000/login"
            target="_blank"
            rel="noopener noreferrer"
            >
            <button>Login</button>
          </a>

          <a
            href="http://localhost:5000/playlistnow"
            target="_blank"
            rel="noopener noreferrer"
            >
            <button>Playlist now</button>
          </a>

          <button onClick={this.inc}> inc </button>
          <button onClick={this.dec}> dec </button>
        </header>
      </div>
    );
  }
}

export default App;
