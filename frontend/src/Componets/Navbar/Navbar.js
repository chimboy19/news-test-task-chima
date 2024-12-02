import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
const Navbar = () => {
  return (
    <div>
      <div className="nav-container">
        <div className="logo">
          <p style={{fontFamily:'',fontSize:'24px'}}>Coiner News</p>
        </div>
        <ul className='navlinks'>
          <Link style={{textDecoration:'none', color:'white'}} to={"/"}>News list</Link>
          <Link style={{textDecoration:'none',color:'white'}}to={"/latest-news"}>Latest News</Link>
          <Link style={{textDecoration:'none',color:'white'}} to={"/politics-news"}>Politics News</Link>
          <Link style={{textDecoration:'none',color:'white'}} to={"/bussines-news"}>Business News</Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar
