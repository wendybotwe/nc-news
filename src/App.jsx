import { useState, useEffect } from 'react'
import './App.css'
import { getArticles } from "./api"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/Home'
import ArticleCard from "./components/ArticleCard"

function App() {
  const [articles, setArticles] = useState([])
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true)
  const [currentUser] = useState("cooljmessy")

  useEffect(() => {
    setLoading(true)
    getArticles().then((articles) => {
      setArticles(articles);
      setLoading(false)
    })
      .catch((err) => {
        console.log(err)
        setError(true)
        setLoading(false)
    })
  }, [])

  if (loading) return <p>Loading some amazing articles for you!</p>
  if (error) return <p>Oh dear, we have a slight problem.</p>

  return (
    <Router>  
      <div className="app-container">
        <p>This is going to be Wendy's NC News NavBar</p>
      </div>
      <Routes>
        <Route path="/" element={<Home articles={articles} />}></Route>
        <Route path="/articles/:article_id" element={<ArticleCard currentUser={currentUser} />}></Route>
        </Routes>
        </Router>
      
  )
}

export default App
