import Axios from '../utils/axios'

export interface queryDataType {
  page?: number
  limit?: number
}

// 获取所有文章 page:当前请求数据在服务器中的页数 limit:每次发送请求一共请求多少数据
export const fetchArticles = ({ page, limit }: queryDataType) => {
  return Axios.get('/api/articles', {
    params: {
      page,
      limit
    }
  })
}

export const fetchArticle = (id: string, md = true) =>
  Axios.get(`/api/article/${id}`, {
    params: {
      md
    }
  })
