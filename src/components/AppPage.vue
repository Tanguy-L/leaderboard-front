<template>
  <div class="section">
    <tabs
      :team="team"
      :event="event"
      :rule="rule"
    />
    <div class="container-events">
      <event
        v-for="(oneEvent, index) in event"
        :key="oneEvent.id"
        :rule="rule"
        :event="oneEvent"
        :teams="team"
        :index="index"
        :next-event="nextEvent.id"
        @showTheModal="showModal"
      /> 
    </div>
    <modal
      v-if="isModal && event.length > 0 && team.length > 0"
      :event="event"
      :current-event="currentEvent"
      :team="team"
      @close-modal="isModal = false"
    />
    <div
      v-if="isModal"
      class="mask"
    />
  </div>
</template>

<script>
import Tabs from '@/components/tabs/Tabs.vue'
import Event from '@/components/events/EventCard.vue'
import Modal from '@/components/modals/UpdateEvent.vue'

export default {
    name: 'AppPage',
    components: {
        Tabs,
        Event,
        Modal
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
    data () {
      return {
        currentEvent: null,
        isModal: false
      }
    },
    computed: {
      nextEvent () {
          return this.event.filter(e => e.down === false)
      }
    },
    methods: {
      showModal (value) {
        this.isModal = !this.isModal
        this.currentEvent = value
      },
      closeTheModal () {
        this.isModal = false
      }
    }
}
</script>

<style scoped>

.container-events {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: space-between;
    margin-top: 12px;
}

.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0,0,0,0.6);
  z-index: 15;
}
</style>
