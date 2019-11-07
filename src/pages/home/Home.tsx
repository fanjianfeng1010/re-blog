// 第三方库
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'

// 内部组件
import ListItem from './components/ListItem'
import GitItem from './components/GitItem'

// 内部常量或方法
import { ApplicationState } from '../../store/index'
import { Article, FETCH_REQUEST } from '../../store/article/types'
import { fetchRequest } from '../../store/article/action'

// 样式文件
import './index.scss'

type PropFromMap = {
  data: Article[]
  loading: boolean
}

type PropFromDispatch = {
  fetchRequest: typeof fetchRequest
}

type IState = {
  loading: boolean
}
type ComponentProps = PropFromDispatch & RouteComponentProps & PropFromMap
class Home extends Component<ComponentProps, IState> {
  constructor(props: ComponentProps) {
    super(props)
    this.state = {
      loading: this.props.loading
    }
  }

  async componentDidMount() {
    if (this.props.data.length > 0) return
    await this.props.fetchRequest({
      type: FETCH_REQUEST,
      payload: {
        page: 1
      }
    })
  }

  render() {
    if (!this.state.loading && this.props.data.length !== 0) {
      return (
        <div className="home-wrapper">
          <section className="introduction">
            <div className="introduction-wrapper">
              <p className="title">HI,WELCOME TO MY BLOG</p>
              <p>
                MY,NAME IS <span className="name">范剑峰</span>
              </p>
              <p>I'AM A beginner OF FRONT-END Developing</p>
            </div>
          </section>
          <div className="article-list">
            {this.props.data
              .reverse()
              .slice(0, 4)
              .map(item => (
                <ListItem data={item} key={item._id} />
              ))}
          </div>
          <div className="git-list">
            <GitItem />
            <div className="say">
              <div>STAY HUNGRY, STAY FOOLISH</div>
            </div>
          </div>
        </div>
      )
    } else {
      return ''
    }
  }
}

const mapState = ({ article }: ApplicationState) => {
  return {
    data: article.data,
    loading: article.loading
  }
}

const mapDispatch = {
  fetchRequest
}

export default connect(
  mapState,
  mapDispatch
)(Home)
