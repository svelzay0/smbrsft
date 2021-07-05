import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Leagues from '../components/Leagues'
import Teams from '../components/Teams'
import TeamCalendar from '../components/TeamCalendar'
import LeagueCalendar from '../components/LeagueCalendar'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/leagues/:year/year',
    name: 'Leagues',
    component: Leagues,
    props: (route) => ({ query: route.query.q })
  },
  {
    path: '/teams',
    name: 'Teams',
    component: Teams
  },
  {
    path: '/team_calendar',
    name: 'TeamCalendar',
    component: TeamCalendar
  },
  {
    path: '/league_calendar',
    name: 'LeagueCalendar',
    component: LeagueCalendar
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
