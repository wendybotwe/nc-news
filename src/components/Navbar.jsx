import React from "react"
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div>
    <nav className="navbar">
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/topics/coding">Coding</Link></li>
        <li><Link to="/topics/football">Football</Link></li>
        <li><Link to="/topics/cooking">Cooking</Link></li>
      </ul>
      </nav>
      <h1 className="app-title">Wendy's NC News</h1>
      </div>
  )
}

export default Navbar