import * as React from 'react';
import * as ReactDOM from "react-dom";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import ErrorBoundary from './ErrorBoundary';
import "./styles.scss";

var mountNode = document.getElementById("app");
ReactDOM.render(<ErrorBoundary><App /></ErrorBoundary>, mountNode);
