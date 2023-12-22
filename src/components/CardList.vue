<template>
    <div>
        <card-item v-for="product in getFilterCardList" :key="product.id" :card="product" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CardItem from '../components/CardItem.vue'
export default {
    name: 'CardList',
    components: {
        CardItem,
    },
    computed: {
        ...mapGetters('cards', ['getItemsList', 'getFilterCardList']),
    },
    created() {
        return this.loadList()
    },
    methods: {
        ...mapActions('cards', ['loadList']),
    },
}
</script>

<style lang="scss" scoped></style>
