import { ArticleAction, ArticleState, FETCH_REQUEST, FETCH_SUCCESS, FETCH_ERROR, SAVE_ARTICLE } from './types'
import { Reducer } from 'redux'

// 初始状态
const initState: ArticleState = {
  data: [],
  page: 1,
  totalPage: 0,
  loading: false,
  error: undefined,
  savedData: []
}

const articleReducer: Reducer<ArticleState, ArticleAction> = (state = initState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      // 发送请求,将 loading 状态设置为 true
      return { ...state, loading: true }
    case FETCH_SUCCESS:
      // 请求成功,将 loading 状态设置为 false,同时使用从服务器中返回的数据更新 state
      return {
        ...state,
        loading: false,
        data: state.data.concat(action.payload.data),
        totalPage: action.payload.totalPage,
        page: action.payload.page
      }
    case FETCH_ERROR:
      // 请求失败,将 loading 状态设置为 false,同时把错误信息更新到 state 上
      return { ...state, error: action.message, loading: false }
    case SAVE_ARTICLE:
      let data = state.savedData!.concat(action.payload)
      return { ...state, savedData: data }
    default:
      return state
  }
}

export default articleReducer
