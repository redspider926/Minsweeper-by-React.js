import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/page/Home";

import "./asset/css/bootstrap.min.css";
import "./asset/scss/now-ui-kit.scss";
import "./asset/demo/demo.css";
import "./asset/demo/nucleo-icons-page-styles.css";
import "./asset/css/NavBar.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <Router>
            <Route exact path="/" component={Home} />
          </Router>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
