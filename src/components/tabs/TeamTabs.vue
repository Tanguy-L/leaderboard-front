<template>
  <div class="row">
    <h3
      class="first-element"
      :style="'color : ' + team.color + ';'"
    >
      {{ team.name }}
    </h3>  
    <event-by-team
      v-for="element in event"
      :key="element.id"
      :event="element"
      :team="team"
      :rule="rule"
    />
    <div class="game-score">
      <hr>
      <p>{{ score }}</p>
    </div>
  </div>
</template>

<script>
import EventByTeam from '@/components/tabs/EventByTeam.vue'

export default {
    components: {
        EventByTeam
    },
   props: {
        event: {
            type: Array,
            default: null
        },
        rule: {
            type: Array,
            default: null
        },
        team: {
            type: Object,
            default: null
        },
        score: {
            type: Number,
            default: 0
        }
    },
    methods: {
        findRule (ruleId) {
            return this.rule.find(e => e.id === ruleId)
        },
        
    }
}
</script>

<style scoped>

.row > * {
    flex:0.2;
}

.full {
    width: 100%;
    height: 100%;
}

.first-element {
    margin-right: 12px;
}

h3 {
    color: rgb(0, 26, 255);
    font-weight: 600;
    margin: 0;
    flex: 0.2;
    font-size: 22px;    
}

p {
    text-align: center;
    color: white;
    width: 100%;
    line-height: 33px;
}

.game-score{
    height: 100%;
    display: flex;
    justify-content: center;
}

.game-score > p{
    font-size: 32px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;    
}

hr {
    height: 100%;
    width: 2px;
    background-color: white;
    border:none;
    margin: 0;
}
</style>
