import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './page';

function App() {
  return (
    <Router basename={'/single-page-application'}>
      <Routes>
        <Route path="/" element={<Home/>} exact/>
      </Routes>
    </Router>
  );
}

export default App;
