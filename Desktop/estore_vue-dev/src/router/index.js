import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Products from '@/pages/Products.vue'
import SingleProduct from '@/pages/SingleProduct.vue'
import Cart from '@/pages/Cart.vue'
import Sets from '@/pages/Sets.vue'

//Profile routes

import Profile from '../pages/profile/Profile.vue'
import UserData from '../pages/profile/UserData.vue'

// AUTHENTICATION

import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'
import Reset from '@/pages/auth/Reset.vue'

// INFO

import Agreement from '@/pages/info/Agreement.vue'
import Privacy from '@/pages/info/Privacy.vue'
import Oferta from '@/pages/info/Oferta.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/category/:slug',
      name: 'products',
      component: Products,
      props: true
    },

    {
      path: '/product/:slug/',
      name: 'product',
      component: SingleProduct,
      props: true
    },

    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/product/sets/:slug/',
      name: 'sets',
      component: Sets,
      props: true
    },

    // PROFILE ROUTER

    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },

    {
      path: '/profile/user',
      name: 'user',
      component: UserData
    },

    //AUTHENTICATION ROUTER

    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/register',
      name: 'register',
      component: Register
    },

    {
      path: '/reset',
      name: 'reset',
      component: Reset
    },

    //INFO
    {
      path: '/agreement',
      name: 'agreement',
      component: Agreement
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: Privacy
    },
    {
      path: '/oferta',
      name: 'oferta',
      component: Oferta
    },

    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'home' }
    }
  ]
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  const authNotRequiredRoutes = ['/login', '/register', '/reset']

  const authRequiredRoutes = ['/profile', '/profile/user']

  if (authRequiredRoutes.includes(to.path) && !token) {
    next({ name: 'login' })
  } else if (authNotRequiredRoutes.includes(to.path) && token) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
