<template>
  <div class="container-add-score">
    <div v-for="(element, index) in currentEvent.match" :key="element.id" class="container">
      <h5>Match {{ index+1 }}</h5>
      <div class="container-team-versus">
        <div class="team-1">
          <h6>Team 1</h6>
          <p
            v-for="(elementTeam1, indexTeam1) in element.team1"
            :key="indexTeam1"
          >
            {{ getTeamById(elementTeam1) }}
          </p>
        </div>
        
        <h6>VS</h6>
        <div class="team-2">
          <h6>Team 2</h6>
          <p
            v-for="(elementTeam2, indeTeam2) in element.team2"
            :key="indeTeam2"
          >
            {{ getTeamById(elementTeam2) }}
          </p>
        </div>
      </div>      
      <p>Statut : {{ formatState(element.state, element.team1[0], element.team2[0], index) }}</p>
      <select
        v-if="index === 0"
        v-model="firstTeam"
        name="teamVictorious"
      >
        <option value="Choisissez">
          Choisissez
        </option>
        <option value="team1">
          Team 1
        </option>
        <option value="team2">
          Team 2
        </option>
        <option value="EQ">
          Egalité
        </option>
      </select>
      <select
        v-if="index === 1"
        v-model="secondTeam"
        name="teamVictorious"
      >
        <option value="Choisissez">
          Choisissez
        </option>
        <option value="team1">
          Team 1
        </option>
        <option value="team2">
          Team 2
        </option>
        <option value="EQ">
          Egalité
        </option>
      </select>
      <button
        class="update-result"
        style="background-color: #398e40;"
        @click="addOneVictorious(element.id, index)"
      >
        Modifier le résultat
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name:"AddScore",
  props: {
    event: {
      type: Array,
      default: null
    },
    currentEvent: {
      type: Object,
      default: null
    },
    team: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      firstTeam: 'Choisissez',
      secondTeam: 'Choisissez'
    }
  },
  computed: {
    mutableEvent () {
      var clone = this.event.slice(0);
      return clone;
    }
  },
  mounted  () {
    if (this.currentEvent.match[0].state !== 'NP') {
      this.firstTeam = this.currentEvent.match[0].state      
    }
    if (this.currentEvent.match[1] && this.currentEvent.match[1].state !== 'NP') {
      this.secondTeam = this.currentEvent.match[1].state      
    }
  },
  methods: {
    formatState (state, team1, team2) {
      if (state === 'EQ') {
        return 'égalité'
      } else if (state === 'NP') {
        return 'Le match n\'a pas encore été joué'
      } else if (state === "team1") {
        const result = this.team.find(e => e.id === team1)
        return 'L\'équipe ' + result.name + ' a gagné'
      } else if (state === "team2") {
        const result = this.team.find(e => e.id === team2)
        return 'L\'équipe ' + result.name + ' a gagné'
      } 
    },
    getTeamById (team) {    
      const result = this.team.find(e => e.id === team)
      return result.name
    },
    checkCompletedEvent () {
      let isCompleted = false

      this.currentEvent.match.forEach(element => {
        if (element.state === 'team1' || element.state === 'team2' || element.state === 'EQ') {
          isCompleted = true
        } else {
          isCompleted = false
        }
      });

      return isCompleted
    },
    async postData (data) {
      try {
        await axios.post('http://localhost:3000/events', data)
      } catch (error) {
        console.log(error)
      }
    },
    indexOfEventAndMatch(event, match) {
      let result = []
      let foundEvent = this.mutableEvent.findIndex(x => x.id === this.currentEvent.id);
      let foundMatch = this.mutableEvent[foundEvent].match.findIndex(x => x.id === match)
      result.push(foundEvent)
      result.push(foundMatch)
      return result
    },
    addOneVictorious (currenMatch, index) {
      let keys = this.indexOfEventAndMatch(this.currentEvent, currenMatch)

      if (index === 0) {
        this.mutableEvent[keys[0]].match[keys[1]].state = this.firstTeam
      } else {
        this.mutableEvent[keys[0]].match[keys[1]].state = this.secondTeam
      }
      this.mutableEvent[keys[0]].down = this.checkCompletedEvent()

      this.postData(this.mutableEvent)
    }
  }
}
</script>

<style scoped>

.container-team-versus {
  display: flex;
  width: 100%;
  justify-content: space-between;
  width: 70%;
}

.container-team-versus > * {
  width: 35%;
}

select {
  width: 20%;
  border: none;
  height: 31px;
  font-size: 16px;
  font-family: 'Quicksand';
}

option {
  padding: 12px;
}

h6 {
  text-align: center;
  font-size: 24px;
}

.team-1 > p {
  text-align: center;
}

.team-2 > p {
  text-align: center;
}

h5, h6 {
  margin: 12px 0;
}

.container-add-score {
  width: 100%;
}

h5 {
  font-size: 24px;
}

.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.update-result {
  display:inline-block;
  padding:0.3em 1.2em;
  margin:0 0.1em 0.1em 0;
  border:0.16em solid rgba(255,255,255,0);
  border-radius:2em;
  box-sizing: border-box;
  text-decoration:none;
  font-weight:300;
  color:rgb(255, 255, 255);
  text-shadow: 0 0.04em 0.04em rgba(0,0,0,0.35);
  text-align:center;
  transition: all 0.2s;
  background-color:#5b87da;
  font-weight: 500;
  font-size: 16px;
  margin-top: 16px;
}

.update-result:hover{
  border-color: rgb(75, 75, 75);
  cursor: pointer;
}


</style>
