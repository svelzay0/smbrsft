<template>
  <v-container>
    <v-row class="text-center" style="padding-top:50px">
      <template>
        <v-card elevation="12">
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <span class="headline">{{ 'Championship tables with' }}</span>
              </v-col>
              <v-img
                :src="require('../assets/logo.svg')"
                class="my-3"
                contain
                height="200"
              />
            </v-row>
          </v-card-text>
        </v-card>
      </template>    
    </v-row>
    <v-row class="text-center" style="padding-top:50px">
      <template>
        <v-card elevation="12">
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <span class="headline">{{ 'Испанский чемпионат' }}</span>
              </v-col>
              <v-img
                :src="require('../assets/logo.svg')"
                class="my-3"
                contain
                height="200"
              />
            </v-row>
          </v-card-text>
        </v-card>
      </template>    
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      
    }),
    created () {
      axios
      .get('https://api.football-data.org/v2/competitions', {
        headers: {
          'X-Auth-Token': '9f28e4475c2c48e3874e3c03a59876d7'
        }
      })
      .then(
        response => {
          console.log(response)
        }
      ) 
    },
  }
</script>