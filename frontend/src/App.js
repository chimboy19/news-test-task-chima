// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Newslist from './Componets/Newslist/Newslist';
import Newsdetails from './Componets/Newslist/Newsdetails/Newsdetails';
import LatestNews from './Componets/LatestNews/LatestNews';
import BusinessNews from './Componets/Business/BusinessNews';
import PoliticsNews from './Componets/Politics/PoliticsNews';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Newslist />} />
          <Route path="/news/:id" element={<Newsdetails />} />
          <Route path="/latest-news" element={<LatestNews />} />
          <Route path="/bussines-news" element={<BusinessNews />} />
          <Route path="/politics-news" element={<PoliticsNews />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
