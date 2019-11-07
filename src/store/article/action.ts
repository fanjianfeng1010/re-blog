import { ArticleAction, FETCH_SUCCESS, FETCH_ERROR, SAVE_ARTICLE, Article, fetchRequestAction } from './types'

// 发送请求,向 reducer 传递正在发送请求这一消息,把 state设置为 true 改为 true
export function fetchRequest(action: fetchRequestAction): ArticleAction {
  const { type, payload } = action
  return {
    type,
    payload
  }
}

// 请求成功,向 reducer 传递请求成功后返回的数据
export function fetchSuccess(data: any): ArticleAction {
  return {
    type: FETCH_SUCCESS,
    payload: data
  }
}

// 请求失败向 reducer 传递失败的错误信息
export function fetchError(message: string): ArticleAction {
  return {
    type: FETCH_ERROR,
    message
  }
}

// 每次请求对应的文章,把请求的结果存储到 redux 中,使下次查看同一篇文章时不需要再次获取数据
export function saveArticle(data: Article): ArticleAction {
  return {
    type: SAVE_ARTICLE,
    payload: data
  }
}
