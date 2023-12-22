<template>
    <div class="card">
        <div class="items">
            <a :href="card.link" target="_blank" class="item">
                <div class="image-card"><img :src="card.imgSrc" /></div>
                <div class="title-card">{{ $t('CardItem.cardTitle') }} {{ card.title }}</div>
                <div class="price">
                    <div v-if="isDiscont" class="old-price-card">
                        {{ card.oldPrice }} {{ $t('CardItem.cartPrice') }}
                    </div>
                    <div class="price-card">{{ card.price }}{{ $t('CardItem.cartPrice') }}</div>
                </div></a
            >
            <div class="active">
                <button v-if="userPermissions.update" class="button" @click="onEdit">
                    {{ $t('CardItem.onEdit') }}
                </button>
                <button v-if="userPermissions.delete" class="button" @click="onDeleteItem">
                    {{ $t('CardItem.onDeleteItem') }}
                </button>
                <button class="button" @click="onAddBasket">{{ $t('CardItem.onAddBasket') }}</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'CardItem',
    props: {
        card: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        ...mapGetters('users', ['userPermissions', 'isLoading', 'hasError']),
        isDiscont() {
            if (this.card.oldPrice) {
                return this.card.oldPrice - this.card.price
            } else return null
        },
    },

    methods: {
        ...mapActions('cards', ['deleteItem', 'updateProduct']),
        ...mapActions('basket', ['addBasket']),
        onAddBasket() {
            this.addBasket(this.card)
        },
        onEdit() {
            this.$router.push({
                name: 'product-config',
                params: {
                    id: this.card.id,
                },
            })
        },
        onDeleteItem() {
            this.deleteItem(this.card.id)
        },
    },
}
</script>

<style lang="scss" scoped>
.card {
    display: inline-block;
    margin-bottom: 20px;
    margin-right: 20px;
}
.items {
    max-width: 280px;
    height: 380px;
    font-size: 20px;
    border: 1px solid rgba(0, 0, 0, 0.406);
    padding: 20px;
    border-radius: 10px;
    transition: all 0.3s;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.359);
    &:hover {
        box-shadow: 7px 5px 5px 5px rgba(0, 0, 0, 0.378);
        border: 1px solid rgba(0, 0, 0, 0.442);
    }
}
.item {
    color: inherit;
    text-decoration: none;
}

.image-card {
    margin: 0 auto;
    margin-bottom: 20px;
    img {
        width: 250px;
        height: 150px;
    }
}
.title-card {
    text-align: center;
    margin-bottom: 10px;
    flex: 1 1 auto;
}
.price {
    padding-left: 30px;
    &:not(:last-child) {
        margin-bottom: 15px;
    }
    margin-bottom: 30px;
}

.old-price-card {
    text-decoration: line-through;
    color: gray;
    &:not(:last-child) {
        margin-bottom: 10px;
    }
}
.price-card {
    color: red;
    font-size: 32px;
    &:not(:last-child) {
        margin-bottom: 15px;
    }
}
.button {
    display: block;
    margin: 0 auto;
    margin-bottom: 5px;
}
.active {
    display: flex;
}
</style>
