import React from "react";
import ReactDOM from "react-dom";

import Editor from "./editor/DraftailEditor.js";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Draftail Example</h1>
      <h2>All functions and data import/export</h2>
      <p>Example Image: http://lorempixel.com/400/200</p>
      <Editor />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
