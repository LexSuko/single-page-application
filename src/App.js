import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './page';

function App() {
  return (
    <Router >
      <Routes basename={'/single-page-application'}>
        <Route path="/" element={<Home/>} exact/>
      </Routes>
    </Router>
  );
}

export default App;
