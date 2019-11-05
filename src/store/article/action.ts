import { ArticleAction, FETCH_REQUEST, FETCH_SUCCESS, FETCH_ERROR } from './types'

// 发送请求,向 reducer 传递正在发送请求这一消息,把 state设置为 true 改为 true
export function fetchRequest(): ArticleAction {
  return {
    type: FETCH_REQUEST
  }
}

// 请求成功,向 reducer 传递请求成功后返回的数据
export function fetchSuccess(data:any): ArticleAction {
  return {
    type: FETCH_SUCCESS,
    payload: data
  }
}

// 请求失败向 reducer 传递失败的错误信息
export function fetchError(message:string): ArticleAction {
  return {
    type: FETCH_ERROR,
    message
  }
}
