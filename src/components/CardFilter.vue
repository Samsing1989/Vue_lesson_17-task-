<template>
    <div class="filter-container">
        <div>
            <h3>{{ $t('CardFilter.cardSellerTitle') }}</h3>
            <label v-for="seller in getItemsSellers" :key="seller" class="lable">
                {{ seller }}
                <input v-model="filter.seller" type="checkbox" :value="seller" />
            </label>
        </div>

        <div>
            <h3>{{ $t('CardFilter.cardBrandTitle') }}</h3>
            <label class="lable">
                <input v-model="filter.search" type="text" />
            </label>
        </div>
        <div>
            <h3>{{ $t('CardFilter.cardAlphabeticalTitle') }}</h3>
            <label v-for="brand in getItemsBrands" :key="brand" class="lable"
                >{{ brand }}
                <input v-model="filter.brand" type="checkbox" :value="brand" />
            </label>
        </div>
        <button class="button" @click="clearFilter">{{ $t('CardEdit.onCancel') }}</button>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'CardFilter',
    data() {
        return {
            filter: {
                seller: [],
                brand: [],
                search: null,
            },
        }
    },
    computed: {
        ...mapGetters('cards', ['getItemsBrands', 'getItemsSellers', 'getFilter']),
    },

    watch: {
        filter: {
            handler(newVal) {
                this.setFilter(newVal)
            },
            deep: true,
        },
    },
    methods: {
        ...mapActions('cards', ['setFilter']),
        clearFilter() {
            this.filter = {
                seller: [],
                brand: [],
                search: null,
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.lable {
    display: flex;
    gap: 50px;
    justify-content: space-between;
    margin-bottom: 10px;
}
</style>
