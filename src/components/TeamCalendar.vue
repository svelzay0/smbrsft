<template>
  <v-container>
    <v-row class="text-center" style="padding-top:50px;">
      <template>
        <v-card elevation="12">
          <v-card-text>
            <v-row class="container" align="center" justify="center">
              <v-col cols="12">
                <v-btn-toggle
                  v-model="link"
                >
                  <v-btn 
                  :to="{ name: 'Leagues', params:{ year: currentYear } }"
                  id="1"
                  value="Список лиг"
                  >
                    {{ 'Список лиг' }}
                  </v-btn>
                  <v-btn 
                  :to="{ name: 'Teams', params:{ year: currentYear } }"
                  id="2"
                  value="Список команд"
                  >
                    {{ 'Список команд' }}
                  </v-btn>
                  <v-btn 
                  :to="{ name: 'LeagueCalendar', params:{ year: currentYear, id: 2018 } }"
                  id="3"
                  value="Календарь лиги"
                  >
                    {{ 'Календарь лиги' }}
                  </v-btn>
                  <v-btn 
                  :to="{ name: 'TeamCalendar', params:{ year: currentYear, id: 58 } }"
                  id="4"
                  value="Календарь одной команды"
                  >
                    {{ 'Календарь одной команды' }}
                  </v-btn>
                </v-btn-toggle>
              </v-col>
              <v-col cols="12">
                <span class="headline">{{ link }}</span>
              </v-col>
              <v-col v-if="link=='Создано с использованием Vuetify' || link==null" cols="12">
                <v-img
                  :src="require('../assets/logo.svg')"
                  class="my-3"
                  contain
                  height="200"
                />
              </v-col>              
              <v-row v-if="link=='Календарь одной команды'" align="center" justify="center">
                <v-row v-if="show==true" align="center" justify="center">
                  <v-row align="center" justify="center">
                    <v-col cols="auto">                   
                      <v-text-field v-model="currentYear" label="Укажите год"></v-text-field>                                     
                    </v-col>
                    <v-col cols="auto">
                      <v-icon color="success" @click="yearPlus()">mdi-plus-box</v-icon>
                      <v-icon color="red" @click="yearMinus()">mdi-minus-box</v-icon>
                    </v-col>
                    <v-col cols="auto">
                      <v-text-field v-model="dateFrom" label="Дата с "></v-text-field>                  
                    </v-col>
                    <v-col cols="auto">
                      <v-text-field v-model="dateTo" label="Дата по "></v-text-field>                  
                    </v-col>
                  </v-row>
                  <v-row v-if="filters.info.length > 0" style="padding-bottom:50px" align="center" justify="center">
                    <v-col cols="6">
                      <v-row align="center" justify="center">  
                        <v-col v-for="team in this.team" :key="team.id" cols="12" class="col1">
                          {{ team.area.name }}
                          <br>
                          <b>{{ team.name }}</b>
                          <br>
                          {{ team.venue }}
                          <div>
                            <v-img
                              max-height="350"
                              max-width="350"
                              :src="team.crestUrl"
                            ></v-img>
                            
                          </div>
                        </v-col>
                      </v-row> 
                    </v-col>
                  </v-row>
                  <v-row v-if="matches.length == 0" style="padding-bottom:50px" align="center" justify="center">
                    <v-col cols="12">
                      <v-row align="center" justify="center">
                        <v-col cols="6">  
                          <v-col>
                            <h1>{{ 'Нет данных в заданный промежуток времени' }}</h1>
                          </v-col>
                        </v-col> 
                      </v-row> 
                    </v-col>
                  </v-row>
                  <v-row v-if="matches.length == 0" style="padding-bottom:50px" align="center" justify="center">
                    <v-col cols="12">
                      <v-row align="center" justify="center">
                        <v-col cols="6">  
                          <v-col>
                            <!-- <h1>{{ matches.done }}</h1> -->
                          </v-col>
                        </v-col> 
                      </v-row> 
                    </v-col>
                  </v-row>
                </v-row>
              </v-row>
            </v-row>
          </v-card-text>
        </v-card>
      </template>    
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import Vue from 'vue'
  import Vuex from 'vuex'

  export default {
    name: 'TeamCalendar',

    data: () => ({
      link: 'Календарь одной команды',
      apikey: '9f28e4475c2c48e3874e3c03a59876d7',
      currentYear: null,
      dateFrom: '2021-06-25',
      dateTo: '2021-07-05',
      info: [],
      team: [],
      teamId: null,
      searchString: '',
      articles_array: [],
      matches: [],
      show: false,
      filters: {
        info: []
      }
    }),
    created () {
      axios.get("https://api.football-data.org/v2/teams", {headers: {'X-Auth-Token': this.apikey}})
           .then(response => 
              (this.info = response.data.teams, 
              this.filters.info = response.data.teams, 
              this.currentYear = this.$route.params.year.toString(), 
              this.teamId = this.$route.params.id))
      ,
      
      axios.get("https://https://api.football-data.org/v2/matches", {headers: {'X-Auth-Token': this.apikey}}, {params: {'dateFrom': this.dateFrom, 'dateTo': this.dateTo}})
           .then(response => (this.matches = response.data))  
      },
      
    watch: {
      dateFrom: {
        handler () {
        }
        
      },
      info: {
        handler () {
          Vue.use(Vuex)
            const store = new Vuex.Store({
              state: {
                info: this.info
              },
              getters: {
                getTeamById: state => id => {
                  return state.info.find(info => info.id === id);
                }
              }
            });
          // this.filters.info = []
          this.team.push(store.getters.getTeamById(this.teamId))
          // this.filters.info[0] = store.getters.getTeamById(58)
          console.log(this.$route.params.id)
          console.log(this.team)
        }
      },
      'filters.info': function (newVal) {
        this.show = true
      },
      currentYear: {
        handler() {
          Vue.use(Vuex)
          const store = new Vuex.Store({
            state: {
              info: this.info
            },
            getters: {
              getCompetitionsByYear: state => lastUpdated => {
                return state.info.filter(info => info.lastUpdated.split('-', 1)[0] === lastUpdated);
              }
            }
          });
          this.filters.info = store.getters.getCompetitionsByYear(this.currentYear)
        }
      }
    },
    methods: {
      yearPlus () {
        if (this.currentYear == null || this.currentYear == '') {
          this.currentYear = '2021'
        }
        else {
          this.currentYear = (parseInt(this.currentYear) + 1).toString()
        } 
      },
      yearMinus () {
        if (this.currentYear == null || this.currentYear == '') {
          this.currentYear = '2021'
        }
        else {
          this.currentYear = (parseInt(this.currentYear) - 1).toString()
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    font-style:italic;
  }
  .col1 {
    background-color: whitesmoke;
    border: 1px solid whitesmoke;
    border-radius: 50px;
  }
</style>


