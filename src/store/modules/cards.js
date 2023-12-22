import DbOperations from '../helpers/DbOperations'
const collectionDB = new DbOperations('cardList')
export default {
    namespaced: true,
    state: () => ({
        cardList: [],
        filter: {
            seller: [],
            brand: [],
            search: null,
        },
        loading: false,
        error: null,
    }),
    getters: {
        isLoading: (state) => state.loading,
        hasError: (state) => state.error,

        getItemsList: (state) => state.cardList,
        getItemById: (state) => (itemId) => state.cardList.find((item) => item.id == itemId),
        getFilter: (state) => state.filter,
        getFilterCardList: ({ cardList, filter }) =>
            cardList.filter((card) => {
                if (filter.search && !card.brand.toLowerCase().includes(filter.search.toLowerCase())) return false
                if (filter.brand.length && !filter.brand.includes(card.brand)) return false
                if (filter.seller.length && !filter.seller.includes(card.seller)) return false
                return true
            }),
        getItemsBrands: ({ cardList }) => [...new Set(cardList.map((card) => card.brand))].sort(),
        getItemsSellers: ({ cardList }) => new Set(cardList.map((card) => card.seller)),
    },
    mutations: {
        setItemsList(state, itemsList) {
            state.cardList = itemsList
        },
        deleteItem(state, itemId) {
            state.cardList = state.cardList.filter((item) => item.id !== itemId)
        },

        setLoading(state, value) {
            state.loading = value
        },
        setError(state, error) {
            state.error = error
        },
        setFilter(state, filter) {
            state.filter = filter
        },
    },
    actions: {
        loadList({ commit }) {
            commit('setError', null)
            commit('setLoading', true)

            collectionDB
                .loadItemsList()
                .then((list) => {
                    commit('setItemsList', list)
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        addItem({ commit, dispatch }, item) {
            commit('setError', null)
            commit('setLoading', true)
            collectionDB
                .addItem(item)
                .then(() => {
                    dispatch('loadList')
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        deleteItem({ commit }, itemId) {
            commit('setError', null)
            commit('setLoading', true)

            collectionDB
                .deleteItem(itemId)
                .then(() => {
                    commit('deleteItem', itemId)
                    // dispatch('loadList')
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        updateItem({ commit, dispatch }, { itemId, data }) {
            commit('setError', null)
            commit('setLoading', true)

            collectionDB
                .updateItem(itemId, data)
                .then(() => {
                    dispatch('loadList')
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        loadFilteredData({ commit }, { fieldTitle, compareOperator, valueToCompare }) {
            commit('setError', null)
            commit('setLoading', true)
            collectionDB
                .loadFilteredData(fieldTitle, compareOperator, valueToCompare)
                .then((list) => {
                    commit('setItemsList', list)
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        setFilter({ commit }, filterData) {
            commit('setFilter', filterData)
        },
    },
}
