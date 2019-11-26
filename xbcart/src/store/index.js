import Vue from 'vue'
import Vuex from 'vuex'
import { getData, getNames, getUSDRUBRate } from '@/api/api'

Vue.use(Vuex)

function groupData (data) {
  const result = {}
  data.forEach(item => {
    if (!result[item.G]) {
      result[item.G] = {
        title: item.title,
        goods: []
      }
    }
    result[item.G].goods.push(item)
  })
  return result
}

function groupCart (state) {
  return state.goodIdsInCart.map(({ id, quantity, totalUsdPrice }) => {
    const product = state.goods.find(item => item.id === id)
    return {
      quantity,
      totalUsdPrice,
      ...product
    }
  })
}

function totalCountItem (state, id, justCreated = false) {
  const { C } = state.goods.find(item => item.id === id)
  if (justCreated) {
    return Number(C)
  }
  const { quantity } = state.goodIdsInCart.find(item => item.id === id)
  return Number(quantity * C)
}

function totalCount (state) {
  let price = state.goodIdsInCart.reduce((sum, { id }) => sum + totalCountItem(state, id), 0)
  return Number(price)
}

function combineData (data, names) {
  let goods = data && data.Value && data.Value.Goods

  const combined = goods.map(v => {
    let group = names[v.G]
    v.name = group.B[v.T].N
    v.title = group.G
    v.id = v.T
    return v
  })
  return combined
}

export default new Vuex.Store({
  state: {
    goods: [], // Array of objects
    goodIdsInCart: [], // { id: x, quantity: y},
    USDRUBRate: null // Number
  },
  mutations: {
    loadGoods (state, payload) {
      state.goods = payload
    },
    addToCart (state, item) {
      const { id, C } = item
      const cartItemIndex = state.goodIdsInCart.findIndex(item => item.id === id)
      if (cartItemIndex !== -1) {
        const cartItem = state.goodIdsInCart[cartItemIndex]
        const newQuantity = cartItem.quantity + 1
        const updatedCartItem = {
          ...cartItem,
          quantity: newQuantity,
          totalUsdPrice: Number(newQuantity * C)
        }
        Vue.set(state.goodIdsInCart, cartItemIndex, updatedCartItem)
      } else {
        state.goodIdsInCart.push({
          id,
          quantity: 1,
          totalUsdPrice: totalCountItem(state, id, true)
        })
      }
    },
    removeFromCart (state, item) {
      const { id, C } = item
      const cartItemIndex = state.goodIdsInCart.findIndex((item, index) => item.id === id)
      if (cartItemIndex !== -1) {
        const cartItem = state.goodIdsInCart[cartItemIndex]
        const updatedCart = {
          ...cartItem,
          quantity: cartItem.quantity - 1,
          totalUsdPrice: (cartItem.quantity - 1) * C
        }
        Vue.set(state.goodIdsInCart, cartItemIndex, updatedCart)
      }
    },
    removeGroupFromCart (state, id) {
      const cartItem = state.goodIdsInCart.findIndex((item, index) => item.id === id)
      if (cartItem > -1) {
        state.goodIdsInCart.splice(cartItem, 1)
      }
    },
    setUSDRUBRate (state, rate) {
      state.USDRUBRate = rate
    }
  },
  actions: {
    async fetchGoods ({ commit }) {
      let [dataResult, namesResult, USDRUBRate] = await Promise.all([getData(), getNames(), getUSDRUBRate()])
      commit('setUSDRUBRate', USDRUBRate)

      const combinedData = combineData(dataResult, namesResult)

      commit('loadGoods', combinedData)
    },
    addToCart ({ commit, getters }, item) {
      commit('addToCart', item)
    },
    removeFromCart ({ commit }, id) {
      commit('removeFromCart', id)
    },
    removeGroupFromCart ({ commit }, id) {
      commit('removeGroupFromCart', id)
    }
  },
  getters: {
    getGoods (state) {
      return state.goods
    },
    getGroupedGoods (state) {
      return groupData(state.goods)
    },
    getGoodsInCart (state) {
      return groupCart(state)
    },
    getItemsNumber (state) {
      return state.goodIdsInCart.length && state.goodIdsInCart.reduce((sum, { quantity }) => sum + quantity, 0)
    },
    getTotalCount (state) {
      return totalCount(state)
    },
    getRUBUSDRate (state) {
      return state.USDRUBRate
    }
  },
  modules: {
  }
})
