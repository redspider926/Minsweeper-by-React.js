import React, { Component } from "react";
import Header from "../widget/Header";
import Footer from "../widget/Footer";
import Board from "../widget/Board";
import "../style/main.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mines_sample: [],
      mines_player: [],
    };
  }

  render() {
    return (
      <div className="page">
        <Header />
        <Board />
        <Footer />
      </div>
    );
  }
}

export default Home;
