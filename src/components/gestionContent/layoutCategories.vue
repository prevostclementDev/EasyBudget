<template>
      
    <section class="layoutCategories">
        <topBarStat></topBarStat>
        <div class="globalContainer">
            <div class="mensualitesContainers">
                <boxContent title="Mensualités :">
                    <mensualitesVue v-for="mensualites in getMensualites" :data="mensualites.id"></mensualitesVue>
                    <div class="error" v-if="(getMensualites == 0)" >Pas de mensualités</div>
                </boxContent>
            </div>
            <div class="resultMensualites">
                <div class="information">
                    <p>Totales gains mensualités :</p>
                    <p class="price" :class="[ totalGainMensualites == 0 ? 'yellow' : '' ,  totalGainMensualites < 0 ? 'red' : '' , totalGainMensualites > 0 ? 'green' : '' ]" >{{ totalGainMensualites }} <span>euros</span></p>
                </div>
                <div class="information">
                    <p>Totales dépenses mensualités :</p>
                    <p class="price" :class="[ totalDepenseMensualites == 0 ? 'yellow' : '' ,  totalDepenseMensualites < 0 ? 'red' : '' , totalDepenseMensualites > 0 ? 'red' : '' ]">-{{ totalDepenseMensualites }} <span>euros</span></p>
                </div>
                <div class="information">
                    <p>Balances mensualités :</p>
                    <p class="price " :class="[ balanceMensualites == 0 ? 'yellow' : '' ,  balanceMensualites < 0 ? 'red' : '' , balanceMensualites > 0 ? 'green' : '' ]">{{ balanceMensualites }} <span>euros</span></p>
                </div>
            </div>
            <div class="containsCategories">
                <boxContent title="Catégories :">
                    <categoriesVue v-for="categories in getCategories" :data="categories"></categoriesVue>
                    <div class="error" v-if="(getCategories == 0)" >Pas de catégories</div>
                </boxContent>
            </div>
        </div>
    </section>

</template>

<script>

import topBarStat from './compStat/topBarStat.vue'
import boxContent from './compStat/boxContent.vue'
import mensualitesVue from './compStat/mensualites.vue';
import categoriesVue from './compStat/categories.vue';

export default {
  name: 'layoutCategories',
  components:{
    topBarStat,
    boxContent,
    mensualitesVue,
    categoriesVue,
  },
  computed : {

    getMensualites(){
        
        return this.$store.state.banksData.activeMensualites;

    },

    getCategories(){

        return this.$store.state.banksData.activeCategories;

    },

    totalGainMensualites(){
        
        return this.$store.state.banksData.totalGainMensualites;

    },

    totalDepenseMensualites(){
        
        return this.$store.state.banksData.totalDepenseMensualites;

    },

    balanceMensualites(){
        
        return this.$store.state.banksData.balanceMensualites;

    },

  }
}
</script>
