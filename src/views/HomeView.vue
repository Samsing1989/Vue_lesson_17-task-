<template>
    <h1 class="title">{{ $t('messages.welcome') }}</h1>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'HomeView',
    computed: {
        ...mapGetters('auth', ['getUser']),
    },
}
</script>
<style lang="scss" scoped>
.title {
    text-align: center;
    font-weight: 700;
}
</style>
