import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Edit from "../components/todo/Edit";
import Favourite from "../views/Favourite.vue";
import Create from "../views/Create";


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
    path: '/edit/:id',
    name: 'Edit',
    component: Edit
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass : "active",
})

export default router
