import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { ApplicationState } from '../../store/index';
import ArticleListItem from './components/ArticleListItem'
import { ArticleState } from '../../store/article/types'
import {fetchRequest} from '../../store/article/action';
import  './index.scss';


type PropFromMap = {
  article:ArticleState
}
type PropFromDispatch = {
  fetchRequest:typeof fetchRequest
}
type ComponentProps = PropFromDispatch & RouteComponentProps & PropFromMap
class Article extends Component<ComponentProps> {
  constructor(props: ComponentProps) {
    super(props)
    this.state = {
      loading:this.props.article.loading
    }
  }
  async componentDidMount() {
    
  }

  render() {
    return <section className='articles-wrapper'>
      <ArticleListItem />
      <ArticleListItem />
      <ArticleListItem />
      <ArticleListItem />
    </section>
  }
}

const mapState = ({article}:ApplicationState) => {
  return {
    article
  }
}

const mapDispatch = {
  fetchRequest
}

export default connect( mapState, mapDispatch )(Article)