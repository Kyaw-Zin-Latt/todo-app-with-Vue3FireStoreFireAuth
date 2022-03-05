import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Edit from "../components/todo/Edit";
import Favourite from "../views/Favourite.vue";
import Create from "../views/Create";
import Register from "../views/Register";
import Login from "../views/Login";
import Main from "../views/Main";


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/favourite',
    name: 'Favourite',
    component: Favourite
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/main',
    name: 'Main',
    component: Main
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass : "active",
})

router.beforeEach( (to,from,next) => {
  let loginAccess = localStorage.getItem("auth");
  if (loginAccess === "false" && (to.name === 'Create' || to.name === 'Home' || to.name === 'Edit' || to.name === 'Favourite')) {
      return next({ name: 'Login' })
  } else {
    next()
  }

})

export default router
