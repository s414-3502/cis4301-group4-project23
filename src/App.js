import './App.css';

import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

//import components
import AboutPage from './about-page/about-page';
import HomePage from './home-page/home-page';
import DataPage from './data-page/data-page';
import Query1page from './queries/query1-page/query1-page';
import Query2page from './queries/query2-page/query2-page';
import Query3page from './queries/query3-page/query3-page';
import Query4page from './queries/query4-page/query4-page';
import Query5page from './queries/query5-page/query5-page';



const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="/data" element={<DataPage/>} />
          <Route exact path='/about' element={<AboutPage/>} /> 
          <Route exact path='/q1' element={<Query1page/>} />
          <Route exact path='/q2' element={<Query2page/>} />
          <Route exact path='/q3' element={<Query3page/>} />
          <Route exact path='/q4' element={<Query4page/>} />
          <Route exact path='/q5' element={<Query5page/>} />
        </Routes>  
      </Router>
    </div>

  );
}

export default App;
