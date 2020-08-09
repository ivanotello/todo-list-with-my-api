import React from "react";
import ReactDOM from "react-dom";

import "bootstrap";
import "../styles/index.scss";

import TodoList from "./component/TodoList.js";

//render your react application
ReactDOM.render(<TodoList />, document.querySelector("#app"));
