<template>
  <div class="container">
    <div class="row">
      <h3
        class="transparent first-element"
        style="padding: 0 1px;"
      >
        Equipe
      </h3>
      <h3
        v-for="element in event"
        :key="element.id"
        class="game-score"
        style="text-align:center;padding: 0 1px;"
      >
        {{ element.game }}
      </h3>
      <h3
        class="game-score"
        style="padding: 0 1px;"
      >
        Total
      </h3>
    </div>
    <team
      v-for="oneTeam in sortedEvent"
      :key="oneTeam.id"
      :score="totalScoreTeam(oneTeam)"
      :rule="rule"
      :team="oneTeam"
      :teams="team"
      :event="event"
    />
  </div>
</template>

<script>
import Team from '@/components/tabs/TeamTabs.vue'

export default {
    name: 'Tabs',
    components: {
        Team
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
            type: Array,
            default: null
        }
    },
    computed: {
        sortedEvent () {
            let teamArray = new Object(this.team)
            let result

            result = teamArray.map(e => {
                e.score = this.totalScoreTeam(e)
                return e    
            })

            result = result.sort((a,b) => {
                return b.score - a.score
            })

            return result
        }
    },
    methods: {
        totalScoreTeam (team) {
            let currentTeam
            let Victory = false
            let score = 0

            this.event.forEach(element => {
                let currentRule = this.findRule(element.rule)
                element.match.forEach(match => {

                    if (match.team1.includes(team.id)) {
                        currentTeam = 'team1'
                    } else if (match.team2.includes(team.id)) {
                        currentTeam = 'team2'                        
                    } else {
                        currentTeam = 'nope'
                    }

                   if (currentTeam !== 'nope') {
                        if (currentTeam === match.state) {
                            Victory = true
                            score += parseInt(currentRule.win)
                        }
                        if (match.state === 'EQ') {
                            score += parseInt(currentRule.equality)
                        }
                        if (match.state !== 'NP' && match.state !== 'EQ' && !Victory) {
                            score += parseInt(currentRule.lost)
                        }
                    }
                    
                })
            }) 
            
            return score
        },
        findRule (ruleId) {
            return this.rule.find(e => e.id === ruleId)
        },
    }
}
</script>

<style scoped>

h3 {
    color: white;
    font-weight: 400;
    margin: 0;
    flex: 0.2;
}

p {
    text-align: center;
    color: white;
    width: 100%;
    line-height: 33px;
}

.game-score {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Quicksand', sans-serif;
}

hr {
    height: 100%;
    width: 2px;
    background-color: white;
    border:none;
    margin: 0;
}

.transparent {
    opacity: 0;
}

.game {
    line-height: 24px;
}

.first-element {
    margin-right: 12px;
}

.container .row {
    background-color: rgba(255, 255, 255, 0.123);
    width: 90%;
    margin-top: 16px;
    padding: 0 12px;
    height: 65px;
    display: flex;
    align-items: center;
}

.row > * {
    flex:0.2;
}

.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 48px;
}

.container-games-title {
    width: 90%;
    display: flex;
    padding:0 12px;
}

.container-games-title > * {
    text-align: center;
}

.container-games-title > * {
    flex:0.2;
}
</style>
