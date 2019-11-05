import { ArticleAction, ArticleState, FETCH_REQUEST, FETCH_SUCCESS, FETCH_ERROR } from './types'
import { Reducer } from 'redux';

// 初始状态
const initState: ArticleState = {
  data: [],
  loading: false,
  error:undefined
} 

const  articleReducer: Reducer<ArticleState, ArticleAction> = (state= initState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      // 发送请求,将 loading 状态设置为 true
      return {...state,loading:true}
    case FETCH_SUCCESS:
      // 请求成功,将 loading 状态设置为 false,同时使用从服务器中返回的数据更新 state
      const data = action.payload
      return {...state,loading:false,data}
    case FETCH_ERROR:
      // 请求失败,将 loading 状态设置为 false,同时把错误信息更新到 state 上
      return {...state,error:action.message,loading:false}
    default:
     return state
  }
}

export default articleReducer