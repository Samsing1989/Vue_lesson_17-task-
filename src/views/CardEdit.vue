<template>
    <div class="input-container">
        <label class="lable">
            {{ $t('CardEdit.imgSrc') }}
            <input v-model="cardsData.imgSrc" type="text" class="input" />
        </label>
        <label class="lable">
            {{ $t('CardEdit.title') }}
            <input v-model="cardsData.title" type="text" class="input" />
        </label>

        <label class="lable">
            {{ $t('CardEdit.oldPrice') }}
            <input v-model="cardsData.oldPrice" type="number" class="input" />
        </label>
        <label class="lable">
            {{ $t('CardEdit.price') }}
            <input v-model="cardsData.price" type="number" class="input" />
        </label>
        <label class="lable">
            {{ $t('CardEdit.link') }}
            <input v-model="cardsData.link" type="text" class="input" />
        </label>
        <label class="lable">
            {{ $t('CardEdit.brand') }}
            <input v-model="cardsData.brand" type="text" class="input" />
        </label>
        <label class="lable">
            {{ $t('CardEdit.seller') }}
            <input v-model="cardsData.seller" type="text" class="input" />
        </label>
    </div>
    <div class="active">
        <button class="button" @click="onAction">{{ buttonTitle }}</button>
        <button class="button" @click="onCancel">{{ $t('CardEdit.onCancel') }}</button>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    nama: 'CardEdit',

    data() {
        return {
            cardsData: {},
            name: {
                en: null,
                ua: null,
            },
        }
    },
    computed: {
        ...mapGetters('cards', ['getItemById']),
        ...mapGetters('users', ['userPermissions']),

        receivedCardId() {
            return this.$route.params.id
        },
        buttonTitle() {
            if (this.receivedCardId && this.$i18n.locale === 'en') return 'Save'
            else if (this.receivedCardId && this.$i18n.locale === 'ua') return 'Зберегти'
            else if (!this.receivedCardId && this.$i18n.locale === 'en') return 'Create'
            else return 'Додати товар'
        },
    },
    created() {
        if (this.receivedCardId) this.cardsData = { ...this.getItemById(this.$route.params.id) }
    },
    methods: {
        ...mapActions('cards', ['addItem', 'updateItem']),

        onAction() {
            if (!this.receivedCardId) this.addItem(this.cardsData)
            else this.updateItem({ itemId: this.receivedCardId, data: this.cardsData })

            this.$router.push({ name: 'product' })
        },

        onCancel() {
            this.$router.push({ name: 'product' })
        },
    },
}
</script>

<style lang="scss" scoped>
.input-container {
    display: flex;
    flex-direction: column;
    width: 800px;
    margin-bottom: 30px;
}
.lable {
    font-size: 18px;
    align-items: center;
    display: flex;
    gap: 20px;
    justify-content: space-between;
    &:not(:last-child) {
        margin-bottom: 5px;
    }
}
.input {
    padding: 5px 10px;
    border-radius: 5px;
    width: 500px;
}
.active {
    display: flex;
    gap: 20px;
}
</style>
