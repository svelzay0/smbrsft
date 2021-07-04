<template>
  <v-container>
    <v-row class="text-center" style="padding-top:50px;">
      <template>
        <v-card elevation="12">
          <v-card-text>
            <v-row class="container">
              <v-col cols="12">
                <v-btn-toggle
                  v-model="link"
                >
                  <v-btn 
                  id="1"
                  value="Список лиг"
                  >
                    {{ 'Список лиг' }}
                  </v-btn>
                  <v-btn 
                  id="2"
                  value="Список команд"
                  >
                    {{ 'Список команд' }}
                  </v-btn>
                  <v-btn 
                  id="3"
                  value="Календарь лиги"
                  >
                    {{ 'Календарь лиги' }}
                  </v-btn>
                  <v-btn 
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
              <v-row v-if="link=='Список лиг'">
                <v-row>

                  <v-col cols="auto" style="padding-left:210px">                   
                    <v-text-field v-model="currentYear" label="Укажите год"></v-text-field>                                     
                  </v-col>
                  <v-col cols="auto" style="padding-top:30px;">
                    <v-icon color="success" @click="yearPlus()">mdi-plus-box</v-icon>
                    <v-icon color="red" @click="yearMinus()">mdi-minus-box</v-icon>
                  </v-col>
                  <v-col cols="auto" style="padding-left:30px">
                    <v-text-field v-model="search" label="Поиск"></v-text-field>                  
                  </v-col>
                  <v-col v-if="filters.info.length > 0" cols="auto" style="padding-left:90px">
                    <h3 style="padding-top:20px">{{ 'Количество: '+filters.info.length }}</h3>                  
                  </v-col>
                  <v-col v-else cols="auto" style="padding-left:90px"> 
                    <h3 style="padding-top:20px">{{ 'Нет результатов' }}</h3>                        
                  </v-col>
                </v-row>
                <v-row style="padding-bottom:50px">
                  <v-col cols=2>
                  </v-col>
                  <v-col cols="8">
                    <v-row>  
                      <v-col v-for="(competition, index) in filters.info" :key="index" cols="4" class="col1">
                        {{ index + true + ') ' }} {{ competition.area.name }}
                        <br>
                        <b>{{ competition.name }}</b>
                        <br>
                        {{ competition.plan }}
                      </v-col>
                    </v-row> 
                  </v-col>
                  <v-col cols=2>
                  </v-col>
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
  // import cloneDeep from 'lodash/cloneDeep'

  export default {
    name: 'HelloWorld',

    data: () => ({
      link: 'Создано с использованием Vuetify',
      apikey: '9f28e4475c2c48e3874e3c03a59876d7',
      currentYear: '2021',
      info: [],
      search: '',
      filters: {
        info: []
      }
    }),
    created () {
      axios.get("https://api.football-data.org/v2/competitions", {headers: {'X-Auth-Token': this.apikey}})
           .then(response => (this.info = response.data.competitions,
                              this.filters.info = response.data.competitions))       
      },
    watch: {
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
              },
              getCompetitionById: state => id => {
                return state.info.find(info => info.id === id);
              }
            }
          });
          // console.log(this.info)
          this.filters.info = store.getters.getCompetitionsByYear(this.currentYear)
          console.log(this.filters.info)
          // console.log(store.getters.getCompetitionsByYear(this.currentYear))
        }
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
    /* min-width: 1300px; */
    font-style:italic;
  }
  .col1 {
    background-color: whitesmoke;
    border: 1px solid whitesmoke;
    border-radius: 50px;
  }
</style>


