<template>
    <div class="container">
        <div>
            <nav>
                <router-link to="/">{{ $t('menu.home') }}</router-link> |
                <router-link to="/product">{{ $t('menu.product') }}</router-link> |
                <router-link to="/basket">{{ $t('menu.basket') }}</router-link>
            </nav>
        </div>
        <div class="lang">
            {{ currentLanguage }}
            <button class="button" @click="changeLocale('ua')">Укр</button>
            <button class="button" @click="changeLocale('en')">Eng</button>
        </div>
        <div>
            <div v-if="getUser" class="container-login">
                <div class="name">
                    <span>{{ getUser.displayName }}</span>
                </div>
                <div class="image"><img :src="getUser.photoURL" /></div>
                <div class="active">
                    <button class="button" @click="onLogout">{{ $t('actionTitles.logout') }}</button>
                </div>
            </div>
            <button v-else class="button" @click="loginWithGoogle">{{ $t('messages.loginButton') }}</button>
        </div>
    </div>
    <router-view />
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters('auth', ['getUser']),
        currentLanguage() {
            return this.$i18n.locale === 'ua' ? 'UA' : 'EN'
        },
    },

    created() {
        this.$i18n.locale = localStorage.getItem('lastLocale') ?? process.env.VUE_APP_I18N_LOCALE
        this.currentLang = localStorage.getItem('lastLocale') ?? process.env.VUE_APP_I18N_LOCALE
        const self = this
        window.addEventListener('storage', function () {
            if (self.$i18n.locale !== this.localStorage.getItem('lastLocale')) {
                self.$i18n.locale = this.localStorage.getItem('lastLocale')
                self.$router.go()
            }
        })
    },
    methods: {
        ...mapActions('auth', ['loginWithGoogle', 'logout']),
        onLogout() {
            this.logout()
            this.$router.push({
                name: 'login',
            })
        },
        changeLocale(lang) {
            this.$i18n.locale = lang
            localStorage.setItem('lastLocale', lang)
        },
    },
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    padding: 0px 100px;
}

nav {
    padding: 30px;
    //  text-align: center;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}
.container-login {
    display: flex;
    align-items: center;
    gap: 5px;
}
.name {
    display: flex;
    flex-direction: column;
    span {
        color: green;
        font-weight: 700;
        font-size: 20px;
    }
}
.image {
    max-width: 50px;
    img {
        border-radius: 50%;
        max-width: 100%;
    }
}
.button {
    padding: 4px 8px;
    color: white;
    font-size: 15px;
    transition: all 0.3s;
    border-radius: 10px;
    background-color: #2c3e50;
    &:hover {
        background-color: #42b983;
    }
}
.lang {
    display: flex;
    gap: 10px;
    align-items: center;
}
</style>
