import { createStore } from 'vuex'
import auth from './modules/auth.js'
import cards from './modules/cards.js'
import users from './modules/users.js'
import basket from './modules/basket.js'
export default createStore({
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: { auth, cards, users, basket },
})
