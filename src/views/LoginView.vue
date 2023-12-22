<template>
    <div class="login-page">
        <h1 class="title">{{ $t('messages.loginTitle') }}</h1>
        <button class="button" @click="onLogin">{{ $t('messages.loginButton') }}</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'LoginView',

    methods: {
        ...mapActions('auth', ['loginWithGoogle']),
        async onLogin() {
            try {
                await this.loginWithGoogle()
                this.$router.push({
                    name: 'home',
                })
            } catch (error) {
                alert(error.message)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.login-page {
    text-align: center;
}
.title {
    margin-bottom: 20px;
}
</style>
