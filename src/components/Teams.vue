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
                  :to="{ name: 'LeagueCalendar', params:{ year: currentYear } }"
                  id="3"
                  value="Календарь лиги"
                  >
                    {{ 'Календарь лиги' }}
                  </v-btn>
                  <v-btn 
                  :to="{ name: 'TeamCalendar', params:{ year: currentYear } }"
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
              <v-row v-if="link=='Список команд'" align="center" justify="center">
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
                      <v-text-field v-model="searchString" label="Поиск"></v-text-field>                  
                    </v-col>
                    <v-col cols="auto">
                      {{ 'Количество: '+filteredArticles.length }}
                    </v-col>
                  </v-row>
                  <v-row v-if="filters.info.length > 0 || filteredArticles.length > 0" style="padding-bottom:50px" align="center" justify="center">
                    <v-col cols="6">
                      <v-row align="center" justify="center">  
                        <v-col v-for="(team, index) in filteredArticles" :key="index" cols="4" class="col1">
                          {{ index + true + ') ' }} {{ team.area.name }}
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
                  <v-row v-if="filters.info.length == 0 || filteredArticles.length == 0" style="padding-bottom:50px" align="center" justify="center">
                    <v-col cols="12">
                      <v-row align="center" justify="center">
                        <v-col cols="6">  
                          <v-col>
                            <h1>{{ 'Нет результатов' }}</h1>
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
    name: 'Teams',

    data: () => ({
      link: 'Список команд',
      apikey: '9f28e4475c2c48e3874e3c03a59876d7',
      currentYear: null,
      info: [],
      searchString: '',
      articles_array: [],
      show: false,
      filters: {
        info: []
      }
    }),
    created () {
      axios.get("https://api.football-data.org/v2/teams", {headers: {'X-Auth-Token': this.apikey}})
           .then(response => (this.info = response.data.teams, this.filters.info = response.data.teams, this.currentYear = this.$route.params.year.toString()))
      },  
    watch: {
      'filters.info': function (newVal) {
        this.show = true
        console.log(newVal)
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
    computed: {
        filteredArticles: function () {
            var articles_array = this.filters.info,
                searchString = this.searchString;
            
            if(!searchString){
                return articles_array;
            }
            searchString = searchString.trim().toLowerCase();
            articles_array = articles_array.filter(function(item){
                if(item.name.toLowerCase().indexOf(searchString) !== -1){
                    return item;
                }
            })
            return articles_array;
        }
    },
    methods: {
      yearPlus () {
        console.log(parseInt(this.currentYear) + 1)
        this.currentYear = (parseInt(this.currentYear) + 1).toString()
      },
      yearMinus () {
        this.currentYear = (parseInt(this.currentYear) - 1).toString()
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


