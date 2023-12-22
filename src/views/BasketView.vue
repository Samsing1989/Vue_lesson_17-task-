<template>
    <div class="basket">
        <h1 class="title">{{ $t('menu.basket') }}</h1>
        <basket-card v-for="item in getBasket" :key="item.id" :basket="item" />
        <div v-if="getBasketPrice === 0" class="zero">{{ $t('BasketView.basketPriceZero') }}</div>
        <div class="price">{{ getBasketPrice }} {{ $t('BasketView.basketPrice') }}</div>
        <div class="active">
            <button class="button" @click="onBack">{{ $t('BasketView.onBack') }}</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BasketCard from '../components/BasketCard.vue'
export default {
    name: 'BasketView',
    components: {
        BasketCard,
    },
    computed: {
        ...mapGetters('basket', ['getBasket', 'getBasketPrice']),
    },

    methods: {
        onBack() {
            this.$router.push({
                name: 'product',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.basket {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.zero {
    font-size: 24px;
    color: red;
    text-align: center;
    margin-bottom: 20px;
}
.price {
    font-size: 30px;
    color: rgb(47, 0, 255);
    margin-bottom: 20px;
}
</style>
