import { call, all, fork, put, takeEvery } from 'redux-saga/effects'
import { FETCH_REQUEST, fetchRequestAction } from './types'
import { fetchArticles } from '../../api/article'
import { fetchError, fetchSuccess } from './action'


function* getArticles(action:fetchRequestAction) {
  try {
    const { payload: { page, limit } } = action
    const res = yield call(fetchArticles, { page, limit })
    
    res.error ? yield put(fetchError(res.error)) : yield put(fetchSuccess(res.data.data.items))
  } catch (e) {
    
    let errorResult = e instanceof Error && e.stack ? e.stack : '不知名错误'
    yield put(fetchError(errorResult))
  }
}

function* watchFetchRequest() {
  yield takeEvery(FETCH_REQUEST, getArticles)
}

export default function* saga() {
  yield all([fork(watchFetchRequest)])
}
