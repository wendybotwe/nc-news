import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from 'react'
import Home from './components/Home'
import ArticleCard from "./components/ArticleCard"
import TopicPage from "./components/TopicPage";
import Navbar from "./components/Navbar";
import NotFound from './components/NotFound';

function App() {
  
  const [currentUser] = useState("cooljmessy")
  
  return (
    <Router>  
      <div className="app-container">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/articles" element={<Home />}></Route>
        <Route path="/articles/:article_id" element={<ArticleCard currentUser={currentUser} />}></Route>
        <Route path="/topics/:topic_slug" element={<TopicPage />}></Route>
        <Route path="/*" element={<NotFound />} />
        </Routes>
        </Router>
      
  )
}

export default App
