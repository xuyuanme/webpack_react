import 'array.prototype.findindex';
import './main.css';

import 'browsernizr/test/touchevents';

import Modernizr from 'browsernizr';

import React from 'react';
import ReactDOM from 'react-dom';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';

import App from './components/App.jsx';
import alt from './libs/alt';
import storage from './libs/storage';
import persist from './libs/persist';

main();

function main() {
  persist(alt, storage, 'app');
  const app = document.createElement('div');

  document.body.appendChild(app);

  ReactDOM.render(
    React.createElement(DragDropContext(
      Modernizr.touchevents ? TouchBackend : HTML5Backend)(App)
    ),
    app
  );
}
