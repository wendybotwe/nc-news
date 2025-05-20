import { useState, useEffect } from 'react'
import './App.css'
import { getArticles } from "./api"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/Home'

function App() {
  const [articles, setArticles] = useState([])
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getArticles().then((articles) => {
      setArticles(articles);
      setLoading(false)
    })
      .catch((err) => {
        console.log(err, "is the error in useEffect")
        setError(true)
        setLoading(false)
    })
  }, [])

  if (loading) return <p>Loading some amazing articles for you!</p>
  if (error) return <p>Oh dear, we have a slight problem.</p>

  return (
    <Router>  
      <div className="app-container">
        <p>placeholder text for Wendy's NC News App</p>
      </div>
      <Routes>
        <Route path="/" element={<Home articles={articles} />}></Route>

        </Routes>
        </Router>
      
  )
}

export default App
