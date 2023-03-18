import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

//import components
import AboutPage from './components/about-page/about-page';
import HomePage from './components/home-page/home-page';
import DataPage from './components/data-page/data-page';
import Query1page from './components/queries/query1-page/query1-page';
import Query2page from './components/queries/query2-page/query2-page';
import Query3page from './components/queries/query3-page/query3-page';
import Query4page from './components/queries/query4-page/query4-page';
import Query5page from './components/queries/query5-page/query5-page';


const App = () => {
  return (
    <div className="App">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
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
