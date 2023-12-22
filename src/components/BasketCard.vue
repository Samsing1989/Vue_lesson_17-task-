<template>
    <div class="basket-containe">
        <div class="basket-card">
            <div class="basket-image">
                <img :src="basket.imgSrc" />
            </div>
            <div class="basket-info">
                <div class="basket-title">{{ basket.title }}</div>
                <div class="basket-price">{{ basket.price }} {{ $t('BasketView.basketPrice') }}</div>
            </div>
            <div>
                <button class="button" @click="deleteBasket">{{ $t('CardItem.onDeleteItem') }}</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'BasketCard',

    props: {
        basket: {
            type: Object,
            default: () => ({}),
        },
    },
    methods: {
        ...mapActions('basket', ['removeBasket']),
        deleteBasket() {
            this.removeBasket(this.basket.id)
        },
    },
}
</script>

<style lang="scss" scoped>
.basket-containe {
    margin: 0 auto;
    margin-bottom: 10px;
    width: 1000px;
    border-radius: 20px;
    border: 2px solid #000;
    padding: 20px;
}
.basket-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}
.basket-image {
    width: 200px;
    img {
        max-width: 100%;
    }
}
.basket-info {
    display: flex;
    gap: 30px;
    align-items: center;
}
.basket-title {
    font-size: 24px;
}
.basket-price {
    font-size: 30px;
    color: red;
}
</style>
