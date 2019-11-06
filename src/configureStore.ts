import { Store, createStore, applyMiddleware, compose } from 'redux'
import  createSagaMiddleware  from 'redux-saga'
// 使用 使用 router-middle-ware 把浏览器 history 挂载到 redux 容器上
import { routerMiddleware } from 'connected-react-router'
// 指明传递给 configureStore 的 history 参数为 History 类型
import { History } from 'history'
// 导入状态接口,以及经过联合后的 reducers/sagas
import { createRootReducer, rootSaga,ApplicationState } from './store'


export default function configureStore(history: History,initialState: ApplicationState): Store<ApplicationState> {
  // 创建saga 中间件
  const sagaMiddleware = createSagaMiddleware()
  // 使用 rootReducer/rootSaga,创建 store, 容器的初始状态(initialState)会在应用的入口传入
  const store = createStore(
    createRootReducer(history),
    initialState,
    compose(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  )
  sagaMiddleware.run(rootSaga)
  return store
}
