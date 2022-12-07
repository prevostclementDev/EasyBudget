<template>
      
    <section class="transaction">
        <topBarStat></topBarStat>
        <div class="allTransaction">
            <boxContent title="Débits & Crédits :">
                <change v-if="getChange != 0" v-for="change in getChange.sort(sortedChange(a,b))" :data="change"></change>
                <div class="error" v-if="(getChange.length == 0)">Aucune donnée</div>
            </boxContent>
        </div>
    </section>

</template>

<script>

import topBarStat from './compStat/topBarStat.vue'
import boxContent from './compStat/boxContent.vue'
import change from './compStat/change.vue'

export default {
  name: 'transaction',
  components:{
    topBarStat,
    boxContent,
    change
  },
  computed : {

    getChange() {

      return this.$store.state.banksData.activeChange;

    }

  },
  methods : {

    sortedChange(a, b){

      return (a, b) => {

        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;

      }

    }

  }
}
</script>
