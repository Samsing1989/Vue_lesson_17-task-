export default {
    namespaced: true,
    state: {
        basketList: [],
    },
    getters: {
        getBasket: (state) => state.basketList,
        getBasketPrice: (state) => state.basketList.reduce((sum, item) => sum + item.price, 0),
    },
    mutations: {
        addBasket(state, product) {
            state.basketList.push(product)
        },
        removeBasket(state, ItemId) {
            state.basketList = state.basketList.filter((Item) => Item.id !== ItemId)
        },
    },
    actions: {
        addBasket({ commit }, product) {
            commit('addBasket', product)
        },
        removeBasket({ commit }, ItemId) {
            commit('removeBasket', ItemId)
        },
    },
    modules: {},
}
