import { Action } from 'redux'

export interface Article {
  readonly _id: string
  readonly content: string
  readonly summary: string
  readonly category: Category
  readonly viewCount: number
  readonly createdAt: string
  readonly updatedAt: string
}

export interface Category {
  readonly _id: string
  readonly name: string
  readonly articleCount: number
  readonly createdAt: string
  readonly updatedAt: string
}

export interface ArticleState {
  data: Article[]
  loading: boolean
  error?: any
}

export const FETCH_REQUEST = 'FETCH_REQUEST'
export type FETCH_REQUEST = typeof FETCH_REQUEST

export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export type FETCH_SUCCESS = typeof FETCH_SUCCESS

export const FETCH_ERROR = 'FETCH_ERROR'
export type FETCH_ERROR = typeof FETCH_ERROR

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

export type ArticleAction = fetchRequestAction | fetchSuccessAction | fetchErrorAction

export interface fetchArticleParams {
  page: number
  limit: number
  category?: string
}
