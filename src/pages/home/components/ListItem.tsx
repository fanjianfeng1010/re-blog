import React from 'react'
import avatar from '../../../assets/img/avatar.jpg'
import { Article } from '../../../store/article/types'
import { Link } from 'react-router-dom'

interface Props {
  data: Article
}

const ListItem: React.FC<Props> = ({ data }) => {
  return (
    <div className="article-list-item">
      <div className="article-header">
        <div className="article-header-img">
          <img src={avatar} alt="" />
        </div>
        <span className="article-header-time">{data.createdAt.replace(/[TZ]/gi, '').replace(/\.\d+/, '')}</span>
      </div>
      <div className="article-content">
        <Link to={`/detail/${data._id}`}>
          <h2 className="article-content-title">{data.title}</h2>
        </Link>
        <p className="article-content-summary">{data.summary}</p>
      </div>
      <div className="article-info">
        <div className="comment">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-message-detail"></use>
          </svg>
          <div className="comment-count">{data.commentCount}</div>
        </div>
        <div className="category">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-category_find_icon"></use>
          </svg>
          <div className="category-name">{data.category.name}</div>
        </div>
      </div>
    </div>
  )
}

export default ListItem
