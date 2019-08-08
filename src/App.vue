<template>
  <div id="app">
    <app-header />
    <app-page 
      v-if="event.length && team.length"
      :event="event"
      :rule="rule"
      :team="team"
    />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppPage from './components/AppPage.vue'
import rule from './data/rule.json'
import axios from 'axios'


export default {
  name: 'App',
  components: {
    AppHeader,
    AppPage
  },
  data () {
    return {
      event: [],
      rule: rule,
      team: []
    }
  },
  async mounted () {
    const url = 'http://localhost:3000'
    await this.getEvents(url)
    await this.getTeams(url)
    this.$el.addEventListener("eventtriggered", () => this.getEvents())
  },
  methods: {
    async getEvents(url) {
      try {
        const response = await axios.get(url + '/events');
        console.log(response);
        this.event = await response.data
      } catch (error) {
        console.error(error);
      }
    },
      async getTeams(url) {
      try {
        const response = await axios.get(url + '/teams');
        this.team = await response.data
      } catch (error) {
        console.error(error);
      }
  }
  }

}
</script>

<style>
#app {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(#e48f8f, #4750b3);
}

p, button {
  font-family: 'Quicksand', sans-serif;
}

h1 ,h2, h3, h4, h5 ,h6 {
  font-family: 'Josefin Sans';
}

button {
  display: inline-block;
  padding: 0.3em 1.2em;
  margin: 0 0.1em 0.1em 0;
  border: 0.16em solid rgba(255, 255, 255, 0);
  border-radius: 2em;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 300;
  color: rgb(255, 255, 255);
  text-shadow: 0 0.04em 0.04em rgba(0,0,0,0.35);
  text-align: center;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  background-color: #364052;
  font-weight: 500;
  font-size: 16px;
  margin-top: 16px;
}

button:hover{
  border-color: rgb(255, 255, 255);
  cursor: pointer;
}

body, html {
  margin: 0;
  padding: 0;
}
</style>
