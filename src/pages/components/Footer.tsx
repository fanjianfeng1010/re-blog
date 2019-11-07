import React from 'react'
import { NavLink } from 'react-router-dom'

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <div className="footer-wrapper">
      <ul className="footer-nav">
        <li className="footer-nav-item">
          <NavLink to="/home">
            <svg className="icon home" aria-hidden="true">
              <use xlinkHref="#icon-shouye"></use>
            </svg>

            <span>home</span>
          </NavLink>
        </li>
        <li className="footer-nav-item">
          <NavLink to="article">
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-book"></use>
            </svg>

            <span>article</span>
          </NavLink>
        </li>
        <li className="footer-nav-item">
          <NavLink to="/about">
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-infopersonal"></use>
            </svg>

            <span>about me</span>
          </NavLink>
        </li>
      </ul>
      <div className="icp-info">
        <a href="http://www.beian.miit.gov.cn/">
          <span>© 2019 眼前有条河 </span>{' '}
          <span>
            <i></i> 粤ICP备19139935号
          </span>
        </a>
      </div>
    </div>
  )
}

export default Footer
