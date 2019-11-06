import React from 'react'
import { NavLink } from 'react-router-dom'
import article from '../../assets/svg/articles.svg'
import books from '../../assets/svg/books.svg'
import membership from '../../assets/svg/membership.svg'

// import './index.scss'
import './index.scss'

interface IProps {
  text?: string
}

const Header: React.FC<IProps> = props => {
  return (
    <div className="header-wrapper">
      <h1 className="logo">Feng`s Blog</h1>
      <div className="header-content">
        <div className="header-content-nav">
          <ul className="header-content-nav-link">
            <li className="home">
              <NavLink to="/home">
                <div className="img">
                  <img src={books} alt="" />
                </div>

                <div className="title">HOME</div>

                <div className="desc"> all the news showing </div>
              </NavLink>
            </li>
            <li className="article">
              <NavLink to="/article">
                <div className="img">
                  <img src={article} alt="" />
                </div>
                <div className="title"> ARTICLE</div>
                <div className="desc">Development & some thought</div>
              </NavLink>
            </li>
            <li className="about">
              <NavLink to="/about">
                <div className="img">
                  <img src={membership} alt="" />
                </div>
                <div className="title">ABOUT</div>
                <div className="desc">knowing more about me</div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
