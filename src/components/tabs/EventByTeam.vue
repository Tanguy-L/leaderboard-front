<template>
  <div
    class="game-score default"
    :class="getResultByTeam"
  >
    <hr>
    <p>{{ getResultByTeam }}</p>
  </div>
</template>

<script>
export default {
    name: 'EventByTeam',
    props: {
        event: {
            type: Object,
            default: null
        },
        rule: {
            type: Array,
            default: null
        },
        team: {
            type: Object,
            default: null
        }
    },
    computed: {
        getResultByTeam () {
            let result

            this.event.match.forEach(element => {
                if (element.team1.includes(this.team.id)) {
                    if (element.state === 'team1') {
                        result = 'victory'
                    } if (element.state === 'team2') {
                        result = 'lose'
                    }
                    if (element.state === 'EQ') {
                        result = 'equality'
                    }
                }
                if (element.team2.includes(this.team.id)) {
                    if (element.state === 'team2') {
                        result = 'victory'
                    } if (element.state === 'team1') {
                        result = 'lose'
                    }
                    if (element.state === 'EQ') {
                        result = 'equality'
                    }                               
                }
            });
            return result
        }
    } 
}
</script>

<style scoped>
.default {
    background-color: rgba(201, 201, 201, 0.089);
}

.victory {
    background-color: rgba(0, 255, 17, 0.397);
}

.lose {
    background-color: rgba(255, 0, 0, 0.397);
}

.equality {
    background-color: rgba(255, 166, 0, 0.397);
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
}

hr {
    height: 100%;
    width: 2px;
    background-color: white;
    border:none;
    margin: 0;
}
</style>
