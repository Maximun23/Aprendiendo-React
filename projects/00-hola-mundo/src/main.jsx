import React from "react";
import ReactDom from "react-dom";
import { App } from "./App";
import '../src/styles.css'
import '../src/App.css'

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <App />
);

