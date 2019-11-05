import Axios from '../utils/axios';

// 获取所有文章
export const fetchArticles = () => Axios.get('/api/articles')