<template>
    <button v-if="userPermissions.update" class="button" @click="onAddProduct">
        {{ $t('messages.onAddProduct') }}
    </button>
    <div class="card-list">
        <card-filter />
        <card-list />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CardFilter from '../components/CardFilter.vue'
import CardList from '../components/CardList.vue'
export default {
    name: 'ProductView',
    components: {
        CardList,
        CardFilter,
    },
    computed: {
        ...mapGetters('users', ['userPermissions']),
    },
    methods: {
        onAddProduct() {
            this.$router.push({
                name: 'product-config',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.card-list {
    margin-bottom: 50px;
    padding: 40px;
    border: 3px solid #000;
    display: flex;

    gap: 70px;
}
.button {
    display: inline-flex;
    margin: 0 auto;
    text-decoration: none;
    font-size: 24px;
    color: white;
    margin-bottom: 30px;
    padding: 20px;
}
</style>
