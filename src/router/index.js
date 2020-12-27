import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            tr: "Ana Sayfa",
            en: "Home"
        }
    },
    {
        path: '/contact-us',
        name: 'Contact Us',
        component: () => import('../views/CountactUs.vue'),
        meta: {
            tr: "Bize Ulaşın",
            en: "Contact Us"
        }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
        meta: {
            tr: "Hakkımızda",
            en: "About"
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
