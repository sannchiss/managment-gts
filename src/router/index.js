import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/Login.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import HomeView from '../views/HomeView.vue'
import CompanyView from '../views/company/CompanyView.vue'
import IntegrationView from '../views/integration-view/IntegrationView.vue'
import FeedView from '../views/FeedView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'



Vue.use(VueRouter)

const routes = [
  {
    path: '/loging',
    name: 'loging',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/company',
    name: 'company',
    component: CompanyView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/integrations',
    name: 'integrations',
    component: IntegrationView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/feed',
    name: 'feed',
    component: FeedView,
    meta: {
      requiresAuth: true
    }
  },
]



// getcurrentuser function
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}


const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const currentUser = await getCurrentUser()
  if (requiresAuth && !currentUser) next('loging')
  else if (!requiresAuth && currentUser) next('home')
  else next()
})


export default router


