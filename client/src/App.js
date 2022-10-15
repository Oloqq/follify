import logo from './logo.svg';
import './App.css';
import { Component } from "react"
import { ReactSession } from 'react-client-session';

ReactSession.setStoreType("sessionStorage");
ReactSession.set("userid", "Bob");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      logged: "",
      button: "initial"};

    // This binding is necessary to make `this` work in the callback
    this.dynamicAPI = this.dynamicAPI.bind(this);
  }

  callAPI() {
    fetch("http://localhost:5000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  dynamicAPI() {
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
        </header>
      </div>
    );
  }
}

export default App;
