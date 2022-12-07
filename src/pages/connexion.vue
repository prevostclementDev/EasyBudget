<template>
      
      <navCenterLogo></navCenterLogo>
      <connectionPart></connectionPart>

</template>

<script>

import navCenterLogo from '../components/general/navbar/centerLogo.vue';
import connectionPart from '../components/loginPage/connectionPart.vue';

  export default {
    name: 'Accueil',
    components: {
      navCenterLogo,
      connectionPart
    },
  }
</script>

<style lang="scss">

html {

  color: black;

}

</style>