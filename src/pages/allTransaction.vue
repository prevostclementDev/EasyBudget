<template>
      
    <toolsNavBar></toolsNavBar>
    <baseContent>
      <template #sidebar>
        <sideBar></sideBar>
      </template>
      <template #content>
        <transactionVue></transactionVue>
      </template>
    </baseContent>

    <popUpVue></popUpVue>

</template>

<script>

import toolsNavBar from '../components/general/navbar/toolsNavBar.vue'
import sideBar from '../components/general/leftBar/sidebar.vue'
import baseContent from '../components/general/baseContent.vue'
import transactionVue from '../components/gestionContent/transaction.vue'

import popUpVue from '../components/popUp/popUp.vue'

import { getAuth , signOut } from "firebase/auth";

export default {
  name: 'AllTransaction',
  components:{
    toolsNavBar,
    sideBar,
    baseContent,
    transactionVue,
    popUpVue
  },
  data () {
    return {

      user : this.$store.state.user,

    }
  },
  computed: {

    getCurrentUser() {

      return this.user;

    },

  },
}
</script>