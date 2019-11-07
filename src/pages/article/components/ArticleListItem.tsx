import React from 'react'
import { Article } from '../../../store/article/types'
import { Link } from 'react-router-dom'

interface IProps {
  data: Article
}

const ArticleListItem: React.FC<IProps> = ({ data }) => {
  return (
    <section className="articles-list-item">
      <Link to={`/detail/${data._id}`}>
        <h2 className="list-item-title">{data.title}</h2>
      </Link>
      <span className="list-item-time">{data.createdAt.replace(/[tz]/gi, ' ').replace(/\.\d+/, '')}</span>
      <p className="list-item-summary">{data.summary}</p>
      <span className="list-item-category">分类:{data.category.name}</span> <br />
      <span className="list-item-view-count">观看:{data.viewsCount}</span>
      <br />
      <span className="list-item-comment-count">评论:{data.commentCount}</span>
      <br />
    </section>
  )
}

export default ArticleListItem
