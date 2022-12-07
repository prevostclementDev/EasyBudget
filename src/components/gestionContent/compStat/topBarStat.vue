<template>
      
    <section class="topStat">
       <div class="leftPart">
            <div class="information">
                Solde : <span class="price " :class="[ activeTotal == 0 ? 'yellow' : '' ,  activeTotal < 0 ? 'red' : '' , activeTotal > 0 ? 'green' : '' ]">{{ activeTotal }} <span>euros</span></span>
            </div>
            <div class="information">
                Solde prévisionnel : <span class="price " :class="[ activeTotalPrevisionnel == 0 ? 'yellow' : '' ,  activeTotalPrevisionnel < 0 ? 'red' : '' , activeTotalPrevisionnel > 0 ? 'green' : '' ]">{{ activeTotalPrevisionnel }} <span>euros</span></span>
            </div>
       </div>
       <div class="rightPart">
            <div class="information">
                <p>Total de gains :</p>
                <p class="price " :class="[ activeTotalGain == 0 ? 'yellow' : '' ,  activeTotalGain < 0 ? 'red' : '' , activeTotalGain > 0 ? 'green' : '' ]" >{{ activeTotalGain }} <span>euros</span></p>
            </div>
            <div class="information">
                <p>Total de dépenses :</p>
                <p class="price " :class="[ activeTotalDepense == 0 ? 'yellow' : '' ,  activeTotalDepense < 0 ? 'red' : '' , activeTotalDepense > 0 ? 'red' : '' ]">{{ activeTotalDepense }} <span>euros</span></p>
            </div>
            <div class="information">
                <p>Balances :</p>
                <p class="price " :class="[ activeBalance == 0 ? 'yellow' : '' ,  activeBalance < 0 ? 'red' : '' , activeBalance > 0 ? 'green' : '' ]">{{ activeBalance }} <span>euros</span></p>
            </div>
       </div>
    </section>

</template>

<script>

export default {
  name: 'transaction',
  computed: {

    activeTotal(){
        return this.$store.state.banksData.activeTotal;
    },
    activeTotalPrevisionnel(){
        return this.$store.state.banksData.activeTotalPrevisionnel;
    },
    activeTotalGain(){
        return this.$store.state.banksData.activeTotalGain;
    },

    activeTotalDepense(){
        return this.$store.state.banksData.activeTotalDepense;
    },
    activeBalance(){
        return this.$store.state.banksData.activeBalance;
    },

  }
}
</script>
