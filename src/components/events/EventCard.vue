<template>
  <div class="event" :class="defineBackround()">
    <h4>{{ event.game }}</h4>
    <div class="container-teams">

      <div v-if="event.match.length === 1" class="team">
        <div class="double-team">
          <p :style="'color:' + getColorTeam(event.match[0].team1[0])+';'">{{ getTeamById(event.match[0].team1[0]) }}</p>
          <p :style="'color:' + getColorTeam(event.match[0].team1[1])+';'">{{ getTeamById(event.match[0].team1[1]) }}</p>
        </div>
        <h5>VS</h5>
        <div class="double-team">
          <p :style="'color:' + getColorTeam(event.match[0].team2[0])+';'">{{ getTeamById(event.match[0].team2[0]) }}</p>
          <p :style="'color:' + getColorTeam(event.match[0].team2[1])+';'">{{ getTeamById(event.match[0].team2[1]) }}</p>
        </div>
      </div>

      <div v-if="event.match.length === 2" class="team" style="flex-wrap: wrap;">
        <div class="one-team">
          <p :style="'color:' + getColorTeam(event.match[0].team1[0])+';'"> {{ getTeamById(event.match[0].team1[0]) }}</p>
          <h5>VS</h5>
          <p :style="'color:' + getColorTeam(event.match[0].team2[0])+';'">{{ getTeamById(event.match[0].team2[0]) }}</p>
        </div>
        <hr>
        <div class="one-team">
          <p :style="'color:' + getColorTeam(event.match[1].team1[0])+';'">{{ getTeamById(event.match[1].team1[0]) }}</p>
          <h5>VS</h5>
          <p :style="'color:' + getColorTeam(event.match[1].team2[0])+';'">{{ getTeamById(event.match[1].team2[0]) }}</p>
        </div>
      </div>

      <button @click="modalShow(event)">
        valider le score
      </button>
      
    </div>
  </div>
</template>

<script>
export default {
    name: 'EventCard',
    props: {
        event: {
            type: Object,
            default: null
        },
        teams: {
            type: Array,
            default: null
        },
        index: {
          type:Number,
          default:null
        }
    },
    data  () {
        return {
          showModal: false
        }
    },
    methods: {
        getTeamById (team) {    
            const result = this.teams.find(e => e.id === team)
            return result.name
        },
        getColorTeam (team) {
          const result = this.teams.find(e => e.id === team)
          return result.color
        },
        modalShow (event) {
          this.$emit('showTheModal', event)
        },
        defineBackround () {
          if (this.event.down === true) {
            return 'finish'
          }
        }
    }
}
</script>

<style scoped>

.event {
    width: 350px;
    background-color: #899cb9;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.35);
    display:flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 12px 48px;  
}



hr {
  width: 100%;
  height: 2px;
  background-color: rgb(22, 22, 22);
  border: none;
}

.event > h4 {
  font-family: 'Quicksand', sans-serif;
  font-size: 24px;
  line-height: 48px;
}

.finish {
  background-color: rgba(0, 255, 17, 0.397);
}

.first-event {
  background-color: rgba(236, 226, 84, 0.89);
}

.double-team {
    display: flex;
    flex-direction: column;
}

.one-team {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.one-team > * {
    display: inline-block;
}

.team {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 12px 0;
}

.container-teams {
  width: 100%;
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

h4 {
    text-align: center;
    width: 100%;
}

h5 {
    display: flex;
    align-items: center;
}

p {
    max-width: 50px;
}

h4 ,p, h5 {
    margin: 0;
    font-size: 1.2rem;
}

p, h5 {
    margin-top: 8px;
}

</style>
