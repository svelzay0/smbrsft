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
                  :to="{ name: 'Leagues', params:{ year: '2021' } }"
                  id="1"
                  value="Список лиг"
                  >
                    {{ 'Список лиг' }}
                  </v-btn>
                  <v-btn 
                  :to="{ name: 'Teams', params:{ year: '2021' } }"
                  id="2"
                  value="Список команд"
                  >
                    {{ 'Список команд' }}
                  </v-btn>
                  <v-btn 
                  :to="{ name: 'LeagueCalendar', params:{ year: '2021' } }"
                  id="3"
                  value="Календарь лиги"
                  >
                    {{ 'Календарь лиги' }}
                  </v-btn>
                  <v-btn 
                  :to="{ name: 'TeamCalendar', params:{ year: '2021' } }"
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
            </v-row>
          </v-card-text>
        </v-card>
      </template>    
    </v-row>
  </v-container>
</template>

<script>
  import Leagues from './Leagues.vue'

  export default {
  components: { Leagues },
    name: 'Index',

    data: () => ({
      link: 'Создано с использованием Vuetify',
    }),    
  }
</script>

<style scoped>
  .container {
    font-style:italic;
  }

</style>


