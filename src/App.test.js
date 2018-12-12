import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  const toRender = <BrowserRouter><App /></BrowserRouter>
  
  ReactDOM.render(toRender, div);
  ReactDOM.unmountComponentAtNode(div);

  //the app works. 
});
