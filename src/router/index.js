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
    path: '/teams/:year/year',
    name: 'Teams',
    component: Teams,
    props: (route) => ({ query: route.query.q })
  },
  {
    path: '/team_calendar/:year/year/:id/club',
    name: 'TeamCalendar',
    component: TeamCalendar,
    props: (route) => ({ query: route.query.q })
  },
  {
    path: '/league_calendar/:year/year/:id/competition',
    name: 'LeagueCalendar',
    component: LeagueCalendar,
    props: (route) => ({ query: route.query.q })
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
