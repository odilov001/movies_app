import { createStore } from 'vuex'
import axios from 'axios'
import { message } from 'ant-design-vue'

export const ESTORE_URL = 'https://estore.finpard.io/api/v1/'
export const AUTH_URL = 'https://online.finpard.io/'

const store = createStore({
  state() {
    return {
      user: null,
      token: null,
      phoneNumber: '',
      firstName: '',
      products: [],
      collapse: JSON.parse(localStorage.getItem('collapse') || '[]')
    }
  },
  mutations: {
    updateUser(state, user) {
      state.user = user
    },
    updateToken(state, token) {
      state.token = token
    },
    updatePhoneNumber(state, phoneNumber) {
      state.phoneNumber = phoneNumber
    },
    updateFirstName(state, firstName) {
      state.firstName = firstName
    },
    saveProduct(state, product) {
      const existingProduct = state.products.find((item) => item.slug === product.slug)
      if (existingProduct) {
        existingProduct.quantity++
        existingProduct.price += product.price
      } else {
        state.products.push({ ...product, quantity: 1 })
      }
    },
    removeProduct(state, slug) {
      const index = state.products.findIndex((item) => item.slug === slug)
      if (index !== -1) {
        state.products.splice(index, 1)
      }
    },
    clearProducts(state) {
      state.products = []
    },
    setCollapse(state, collapseData) {
      localStorage.setItem('collapse', JSON.stringify(collapseData))
    }
  },
  actions: {
    loginUser({ commit }, credentials) {
      return axios
        .post(`${AUTH_URL}store/login/`, credentials)
        .then((response) => {
          const { data } = response
          if (data.token) {
            commit('updateToken', data.token)
            commit('updateUser', data.user)
            message.success('You are now logged in.')
          } else {
            message.error(data.message || 'Login failed.')
          }
        })
        .catch((error) => {
          message.error(error.message || 'An error occurred during login.')
        })
    },
    saveSelectedProductInfo({ commit }, productInfo) {
      commit('saveProduct', productInfo)
    },
    updateCollapse({ commit }, data) {
      commit('setCollapse', data)
    }
  },
  getters: {
    allDetails: (state) => state.products,
    totalQuantity: (state) =>
      state.products.reduce((total, product) => total + product.quantity, 0),
    totalPrice: (state) =>
      state.products.reduce((total, product) => total + product.quantity * product.price, 0)
  }
})

export default store
