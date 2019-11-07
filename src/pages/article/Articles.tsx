import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'

import { ApplicationState } from '../../store/index'
import ArticleListItem from './components/ArticleListItem'
import { Article, FETCH_REQUEST } from '../../store/article/types'
import { fetchRequest } from '../../store/article/action'
import './index.scss'

type PropFromMap = {
  data: Article[]
  loading: boolean
  totalPage: number
  page: number
}

type IState = {
  showMore: boolean
}

type PropFromDispatch = {
  fetchRequest: typeof fetchRequest
}
type ComponentProps = PropFromDispatch & RouteComponentProps & PropFromMap

class ArticlePage extends Component<ComponentProps, IState> {
  constructor(props: ComponentProps) {
    super(props)
    // 设置点击加载更多数据使用到状态
    this.state = {
      showMore: true
    }
  }

  // 当用户进入页面,组件加载完毕后,派发获取信息行为
  async componentDidMount() {
    if (this.props.data.length > 0) return
    await this.props.fetchRequest({
      type: FETCH_REQUEST
    })
  }
  render() {
    const { data, loading } = this.props
    const { showMore } = this.state
    if (data && data.length !== 0) {
      return (
        <section className="articles-wrapper">
          <QueueAnim delay={1000} className="queue-simple">
            {data.map(item => (
              <ArticleListItem data={item} key={item._id} />
            ))}
          </QueueAnim>

          {showMore ? (
            <div className="loading" onClick={this.handleClick}>
              {loading ? (
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-loading"></use>
                </svg>
              ) : (
                '加载更多'
              )}
            </div>
          ) : (
            ''
          )}
        </section>
      )
    }
    return ''
  }

  handleClick = async () => {
    const { totalPage, page, fetchRequest } = this.props
    await fetchRequest({
      type: FETCH_REQUEST,
      payload: {
        page: page + 1
      }
    })
    // 如果当前数据所在页数大于等于服务器上的总数,说明服务器上已经没有数据,此时不需要显示加载更多按钮
    if (totalPage <= page) {
      this.setState({
        showMore: false
      })
    }
  }
}

const mapState = ({ article }: ApplicationState) => {
  return {
    data: article.data,
    loading: article.loading,
    totalPage: article.totalPage,
    page: article.page
  }
}

const mapDispatch = {
  fetchRequest
}

export default connect(
  mapState,
  mapDispatch
)(ArticlePage)
