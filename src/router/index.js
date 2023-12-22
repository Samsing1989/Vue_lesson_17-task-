import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import BasketView from '../views/BasketView.vue'
import LoginView from '../views/LoginView.vue'
import CardEdit from '../views/CardEdit.vue'
import store from '@/store'
const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            requireAuth: false,
        },
        component: HomeView,
    },
    {
        path: '/product',
        name: 'product',
        meta: {
            requireAuth: false,
        },
        component: ProductView,
    },
    {
        path: '/product/edit/:id?',
        name: 'product-config',
        meta: {
            requireAuth: false,
        },
        component: CardEdit,
    },
    {
        path: '/basket',
        name: 'basket',
        meta: {
            requireAuth: true,
        },
        component: BasketView,
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            requireAuth: false,
        },
        component: LoginView,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})
router.beforeEach(async (to) => {
    if (to.meta?.requireAuth) {
        let isAuthenticated = store.state.auth.user

        if (!isAuthenticated) isAuthenticated = await store.dispatch('auth/loginWithCredential')

        if (!isAuthenticated)
            return {
                name: 'login',
            }
    }
})
export default router
