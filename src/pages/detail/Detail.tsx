import React, { Component } from 'react'
import Avatar from '../../assets/img/avatar.jpg'
import './index.scss'
import { Article } from '../../store/article/types'
import { connect } from 'react-redux'
import { fetchArticle } from '../../api/article'
import { RouteComponentProps } from 'react-router-dom'

interface IProps {}

interface IState {
  data?: Article
  loading: boolean
}

type ComponentProps = IProps & RouteComponentProps

class Detail extends Component<ComponentProps, IState> {
  constructor(props: ComponentProps) {
    super(props)
    this.state = {
      data: undefined,
      loading: true
    }
  }

  async componentDidMount() {
    // 从浏览器地址获取当前文章的 ID,根据 ID 向服务器请求对应的数据
    let id = this.props.history.location.pathname.split('detail/')[1]
    let res = await fetchArticle(id)
    if (res.data.data !== null) {
      this.setState({
        loading: false,
        data: res.data.data
      })
    } else {
      this.setState({ loading: false })
      this.props.history.push('/')
    }
  }

  render() {
    if (this.state.data) {
      return (
        <div className="detail-wrapper">
          <aside className="detail-author-info">
            <div className="avatar-wrapper">
              <img src={Avatar} alt="" />
            </div>
            <h3> about me</h3>
            <article>我是一个自学者,也是一个初学者,目标是成为一个专业的前端工程师</article>
          </aside>
          <section className="detail-content">
            <p className="detail-content-time">{this.state.data.createdAt}</p>
            <p className="category">
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-category_find_icon"></use>
              </svg>
              <span className="category-name">{this.state.data.category.name}</span>
            </p>
            <h2 className="detail-content-title">{this.state.data.title}</h2>
            <hr />
            <div className="markdown-body" dangerouslySetInnerHTML={{ __html: this.state.data.content }}></div>
          </section>
        </div>
      )
    } else {
      return ''
    }
  }
}

export default Detail
