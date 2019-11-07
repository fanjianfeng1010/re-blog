import { call, all, fork, put, takeEvery } from 'redux-saga/effects'
import { FETCH_REQUEST, fetchRequestAction } from './types'
import { fetchArticles } from '../../api/article'
import { fetchError, fetchSuccess } from './action'

function* getArticles(action: fetchRequestAction) {
  try {
    // 如果派发 action 时没有传入 payload,则使用默认数据,否则使用传入的数据
    const { page } = action.payload ? action.payload : { page: 1 }
    const limit = 10
    // 使用从 action 中结构出来的page,limit,调用 fetchArticles 方法向服务器发送请求
    const res = yield call(fetchArticles, { page, limit })
    let { items, totalCount } = res.data.data
    const totalPage = Math.ceil(totalCount / limit)
    res.error ? yield put(fetchError(res.error)) : yield put(fetchSuccess({ data: items, totalPage, page }))
  } catch (e) {
    let errorResult = e instanceof Error && e.stack ? e.stack : '不知名错误'
    yield put(fetchError(errorResult))
  }
}

// takeEvery方法监听从界面 带有FETCH_REQUEST的 action,从中调用 getArticles 方法
function* watchFetchRequest() {
  yield takeEvery(FETCH_REQUEST, getArticles)
}

export default function* saga() {
  yield all([fork(watchFetchRequest)])
}
