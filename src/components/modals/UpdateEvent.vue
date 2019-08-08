<template>
  <div class="modal">
    <h1>{{ currentEvent.game }}</h1>
    <add-score
      :event="event"
      :team="team"
      :current-event="currentEvent"
    />
    <div v-if="currentEvent.match.length === 1">
      <ul
        v-for="(element, index) in event.match"
        :key="index"
      >
        <li>{{ formatState(element.state, element.team1[0]) }}</li>
        <li>{{ getTeamById(element.team1[0]) }}</li>
        <li>{{ getTeamById(element.team1[1]) }}</li>
        <li>{{ getTeamById(element.team2[0]) }}</li>
        <li>{{ getTeamById(element.team2[1]) }}</li>
      </ul>
    </div>
    
    <button @click="$emit('close-modal')">
      Quitter
    </button>
  </div>
</template>

<script>
import AddScore from '@/components/forms/AddScore.vue'

export default {
  components: {
    AddScore
  },
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
  methods: {
    closeTheModal () {
      this.$refs.modal.$emit('open');
    },
    getTeamById (team) {    
      const result = this.team.find(e => e.id === team)
      return result.name
    },
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
    }
  }
}
</script>

<style>
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  background-color: #6d80d6;
  box-shadow: 0 3px 12px black;
  z-index: 20;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 12px;
  color: white;
}

ul {
  list-style: none;
}

h1 {
  width: 100%;
  text-align: center;
}
</style>
