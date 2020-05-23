import React from 'react';
import configureStore from './Store/Index';
import Home from "./Views/Home/Index";
import { Provider } from 'react-redux';

const store = configureStore()

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
    
  );
}

