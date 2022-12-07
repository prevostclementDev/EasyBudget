<template>
      
    <toolsNavBar></toolsNavBar>
    <baseContent>
      <template #sidebar>
        <sideBar></sideBar>
      </template>
      <template #content>
        <layoutCategories></layoutCategories>
      </template>
    </baseContent>

    <popUpVue></popUpVue>

</template>

<script>

import toolsNavBar from '../components/general/navbar/toolsNavBar.vue'
import sideBar from '../components/general/leftBar/sidebar.vue'
import baseContent from '../components/general/baseContent.vue'
import transactionVue from '../components/gestionContent/transaction.vue'
import layoutCategories from '../components/gestionContent/layoutCategories.vue'

import popUpVue from '../components/popUp/popUp.vue'

export default {
  name: 'mensualitesCategories',
  components:{
    toolsNavBar,
    sideBar,
    baseContent,
    transactionVue,
    layoutCategories,
    popUpVue
  },
  data () {
    return {

      reservation : this.$store.state.userId,

    }
  },
  computed: {

    getUserId() {

      return this.reservation.id;

    }

  },

  mounted() {


  }

}
</script>