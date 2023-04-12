import React from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Terminal from "./views/Terminal";
import Background from "./components/Background";

function App() {
  return (
    <HashRouter>
      <Routes>
          <Route path={'/'} element={<Background><Terminal /></Background>} />
        <Route path={'*'} element={<div>404</div>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
