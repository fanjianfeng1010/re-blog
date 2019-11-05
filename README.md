## 博客项目数据操作框架搭建框架搭建
- 项目使用的库
  - 数据管理  `redux`
    - 异步方案 `redux-saga`
    - `redux`流程: 组件派发`action`,`reducer`接收 `action`改变`state`,`state`改变视图更新
    - `redux`组成
      - `store`:存储应用中所有的状态,在 `react`中,通常使用`react-redux`提供的提供的`Provider`组件用作跟组件,提供应用所需要的`store`
        - 创建:使用 `redux`提供的 `createStore`方法创建 `store`
        - `createStore`方法接收三个参数
          - `reducer`:必选,由于应用中可能存在多个 `reducer`管理不同的信息,通常情况下,`createStore`方法中的 `reducer`都是由`combineReducer`方法创建返回的.
        - `preloadedState`:可选,应用中最初的的状态,可以预先定义一些不需要通过数据请求就可以展示使用的信息.
        - `enhancer`:可选,顾名思义,用于增强 `redux`的能力,使用 `redux`提供的`compose`方法生成,``compose`方法内使用`applyMiddleware`把使用到的中间件用作增强子.
      - `action`:把数据从应用传到 store的载体,`store`数据的唯一来源,`action`本质是一个 `JavaScript`对象,必须包含`type`属性,其余可以根据实际情况需要增加,大部分情况下,其余属性都命名为 `payload`.由`dispatch`派发,格式`dispatch({type:any,payload?})`
      - `reducer`:接收`dispatch`派发过来的 `action`,根据`action.type`的不同确定如何使用`action.payload`来到更新 `state`
   -  `redux-saga`:用于在派发 `action`前,从有副作用(`effect`)的方法生成纯净的 `action`=> 即一个`type`和`payload`的内容都是确定对象`{type:xxx,payload:xxx}`,所有异步中间件的作用都是如此.
      -  `redux-saga`流程:
         1. 创建一个异步发送异步请求的生成器函数 `function* getAsync`
             -  在函数内部使用 `call/fork`方法调用已经编写好的异步请求函数,也可以不使用`call/fork`方法,但是异步获取数据的业务逻辑就需要写在`getAsync`内部.
               -  异步请求成功,使用`put`方法派发成功的 `action`,并把获得的数据放在`action.payload`上
               -  异步请求失败,使用`put`方法派发请求失败的 `action`
         2. 创建一个生成器函数`watchFetchRequest`,内部使用`takeEvery`函数,`takeEvery`函数的作用是用于接收 `action`,在不使用`redux-saga`时,能接收 `action`的只有 `reducer`
              - `takeEvery`函数接收两个参数
                - `type`:行为标识=>标明`action`的类型
              - 执行函数:通过第一个参数的标明的`type`,只要传入的`type`是相应类型的,就执行该对应方法
         3. 可选:`saga.js`文件存在多个不同的异步请求,创建一个生成器函数`xxxSaga`,内部使用`all`方法,同时执行多个执行异步请求的生成器函数,由于`call`方法会阻塞浏览器进程,为了让异步请求不阻塞,`all`方法内被执行的`watchFetchRequest`一类的方法使用`fork`方法调用,使其不会阻塞浏览器进程
       - 最后,导出由使用`takeEvery / all `生成的 `xxSaga`函数,传递给 `sagaMiddleWare`
  - 流程都梳理好了,那就开始创建文件,书写代码
    1. 创建行为标识以及数据类型`src/store/article/types.ts`
       1.定义数据的类型 
       ``` typescript 
        import { Action } from 'redux'
        // 根据从服务器返回的 article 信息定义 Article 类型
        export interface Article {
          readonly _id: string
          readonly content: string
          readonly summary: string
          readonly category: Category
          readonly viewCount: number
          readonly createdAt: string
          readonly updatedAt: string
        }
        // 根据从服务器返回 category 的信息定义 Category
        export interface Category {
          readonly _id: string
          readonly name: string
          readonly articleCount: number
          readonly createdAt: string
          readonly updatedAt: string
        }
        
        // 定义 store 中存储的 Article 中状态信息
        export interface ArticleState {
          data: Article[]
          loading: boolean
          error?: any
        }

        // 定义行为标识
        export const FETCH_REQUEST = 'FETCH_REQUEST'
        export type FETCH_REQUEST = typeof FETCH_REQUEST

        export const FETCH_SUCCESS = 'FETCH_SUCCESS'
        export type FETCH_SUCCESS = typeof FETCH_SUCCESS

        export const FETCH_ERROR = 'FETCH_ERROR'
        export type FETCH_ERROR = typeof FETCH_ERROR
        
        // 定义行为
        export interface fetchRequestAction extends Action {
          type: FETCH_REQUEST
        }

        export interface fetchSuccessAction extends Action {
          type: FETCH_SUCCESS
          payload: Article[]
        }

        export interface fetchErrorAction extends Action {
          type: FETCH_ERROR
          message: string
        }
        
        // 把上面所有的行为统一使用创建联合类型 ArticleAction
        export type ArticleAction = fetchRequestAction | fetchSuccessAction | fetchErrorAction
        ```
    2. `src/store/article/action.ts`
       1. 定义 `actionCreator`  
        ```typescript
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
        ```  
    3. `src/store/article/saga.ts`
       1. 创建 `saga`  
       ```typescript
        import { call, all, fork, put, takeEvery } from 'redux-saga/effects'
        import { FETCH_REQUEST } from './types'
        import { fetchArticles } from '../../api/article'
        import { fetchError, fetchSuccess } from './action'

        // 创建异步逻辑处理函数 getArticles
        function* getArticles() {
          try {
            // 使用 call 方法调用从 api 中传递过来的 fetchArticle,根据返回结果使用put 方法派发不同的 action
            const res = yield call(fetchArticles)
            res.error ? yield put(fetchError(res.error)) : yield put(fetchSuccess(res.data))
          } catch (e) {
            let errorResult = e instanceof Error && e.stack ? e.stack : '不知名错误'
            yield put(fetchError(errorResult))
          }
        }

        // 使用 takeEvery 方法捕获从应用派发的action.type,调用相对应的方法 getArticles 
        function* watchFetchRequest() {
          yield takeEvery(FETCH_REQUEST, getArticles)
        }
        
        // 为了方便以后应用的扩展,使用 all方法整合当前文件由 takeEvery 捕获的所有所有 dispatch 作为 当前类型的 saga
        export default function* saga() {
          yield all([fork(watchFetchRequest)])
        }
       ```  
    4. `src/store/article/reducer.ts`
       1. 定义 `store` 的初始状态及编写 `reducer` 函数  
       ```typescript
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
       ```  
    5. `src/store/index.ts`
        ```typescript
        import { connectRouter, RouterState } from 'connected-react-router'
        import { combineReducers } from 'redux'
        import { History } from 'history'
        import {all,fork} from 'redux-saga/effects'

        // 导入各个文件的 reducer saga,状态类型
        import articleSaga from './article/saga'
        import articleReducer from './article/reducer'
        import { ArticleState } from './article/types'

        // 定义应用的 store 中的 多个 reducers 的类型
        export interface ApplicationState {
          article: ArticleState
          router: RouterState
        }

        // 使用 combineReducers  创建 rootReducer
        export const createRootReducer = (history: History) =>
          combineReducers({
            article: articleReducer,
            router: connectRouter(history)
          })

        // 使用 all 方法创建 rootSaga
        export function* rootSaga() {
          yield all([fork(articleSaga)])
        }

        ```  
    6. ```/src/configureStore.ts`
       1. 对`redux`进行最后配置
       ```typescript
        import { Store, createStore, applyMiddleware, compose } from 'redux'
        import  createSagaMiddleware  from 'redux-saga'
        // 使用 使用 router-middle-ware 把浏览器 history 挂载到 redux 容器上
        import { routerMiddleware } from 'connected-react-router'
        // 指明传递给 configureStore 的 history 参数为 History 类型
        import { History } from 'history'
        // 导入状态接口,以及经过联合后的 reducers/sagas
        import { ApplicationState, createRootReducer, rootSaga } from './store'


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
       ```
    7. `src/Main.tsx`
       ```typescript
          import React from 'react';
          import {Store} from 'redux';
          import { ApplicationState } from './store';
          import { Provider } from 'react-redux';
          import { ConnectedRouter } from 'connected-react-router';
          import {History} from 'history'

          // Main 组件需要传入的属性分别为由 redux 创建的 store,由浏览器历史 history
          interface MainProps {
            store: Store<ApplicationState>
            history:History
          }

          // Main组件: 提供应所需用 store,和 router 的容器
          const Main: React.FC<MainProps> = ({ store, history }) => {
            return (
              <Provider store={store}>
                <ConnectedRouter history={history}>
                </ConnectedRouter>
            </Provider>
            );
          }

          export default Main;
       ```  
    8. `src/index.tsx`
       1. 应用程序主入口
       ```typescript
        import React from 'react'
        import ReactDOM from 'react-dom'
        import { createBrowserHistory } from 'history'
        import * as serviceWorker from './serviceWorker'
        import configureStore from './configureStore'
        import Main from './Main'
        import { History } from 'history'
        const initialState = window.INITIAL_REDUX_STATE

        const history: History = createBrowserHistory({
          basename: '/'
        })
        const store = configureStore(history, initialState)

        ReactDOM.render(<Main store={store} history={history} />, document.getElementById('root'))
        serviceWorker.unregister()
       ``` 

以上就是就是博客基础状态共享的框架搭建和代码.依据以上的框架,当需要添加新的状态时,可以很轻易的添加到对应的文件中,如果有新的 `reducer` 需要创建,只需要在对应的步骤中加入新的`reducer/saga`即可