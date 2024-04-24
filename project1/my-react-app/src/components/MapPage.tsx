import React from "react";
import { render } from "react-dom";
import MindMap from "react-mindmap";

import map from "./map";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <MindMap nodes={map.nodes} connections={map.connections} />
    <h2>Start editing to see some magic happen {"\u2728"}</h2>
  </div>
);

render(<App />, document.getElementById("root"));