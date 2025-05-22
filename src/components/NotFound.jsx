import React from "react";
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
  <div>
    <h2>404 - Page Not Found</h2>
    <p>Sorry, the page you are looking for simply does not exist!</p>
    <Link to="/">Go back home</Link>
    </div>
  )
}
export default NotFound;