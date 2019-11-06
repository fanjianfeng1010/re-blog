import { connectRouter,RouterState } from 'connected-react-router'
import { combineReducers } from 'redux'
import { History } from 'history'
import {all,fork} from 'redux-saga/effects'
// 导入各个文件的 reducer saga,状态类型
import articleReducer from './article/reducer';
import articleSaga from './article/saga';
import {ArticleState} from './article/types'
export interface ApplicationState {
  article: ArticleState
  router: RouterState
}

// rootReducer 创建函数
export const createRootReducer = (history: History) =>
  combineReducers({
    article: articleReducer,
    router: connectRouter(history)
  })

// 创建 rootSaga
export function* rootSaga() {
  yield all([fork(articleSaga)])
}
