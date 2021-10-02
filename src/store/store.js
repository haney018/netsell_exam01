import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl: 'https://6141b2f5357db50017b3dc1a.mockapi.io/api/v1',
    countPerPage: 12,
    currentPage: 1,
    loading: false,
    searchArticle: '',
    hadSearch: false,
    articles: [],
    articleId: '',
    currentArticle: null
  },
  mutations: {
    updateState(state, { type, data }) {
        state[type] = data
    }
  },
  actions: {
    async getArticles({ state }) {
        try {
            let url = `${state.apiUrl}/Articles?page=${state.currentPage}&limit=${state.countPerPage}`
            let result = await axios.get(url)
            state.articles = result.data
            state.hadSearch = false
        } catch(error) {
            console.log('Error fetching articles')
            state.articles = []
            state.currentPage = 1
        }
    },
    async searchArticles({ state }) {
        try {
            let url = `${state.apiUrl}/Articles?search=${state.searchArticle}&page=${state.currentPage}&limit=${state.countPerPage}`
            let result = await axios.get(url)
            state.articles = result.data
            state.hadSearch = true
        } catch(error) {
            console.log('Error searching articles')
            state.articles = []
            state.currentPage = 1
        }
    },
    async getArticleByID({ state }) {
        try {
            let url = `${state.apiUrl}/Articles/${state.articleId}`
            let result = await axios.get(url)
            state.currentArticle = result.data
        } catch(error) {
            console.log('Error fetching single article')
            state.currentArticle = null
        }
    }
  }
})
