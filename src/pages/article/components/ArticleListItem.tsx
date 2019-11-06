import React from 'react'
import { NavLink } from 'react-router-dom'

interface Props {
  
}

 const ArticleListItem: React.FC<Props> = () => {
  return (
    <section className='articles-list-item'>
      <h2>asdjfkahsdjkfhajksdhsfjkas</h2>
      <span>2010-10-10 10:22:22</span>
      <p>aklsfjklajsdklfjakldsjfklasjdsklfa
        askdsfhasdfhjkashdjkfahsdjkfhasjkfakljsfklasdf
      </p>
      <span>分类:JavaScript</span> <br />
      <span>点赞:22</span><br/>
      <span>阅读:33</span><br/>
      <NavLink to="/home">阅读更多</NavLink>
    </section>
  )
}

export default ArticleListItem