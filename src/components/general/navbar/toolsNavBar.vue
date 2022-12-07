<template>
      
    <nav class="toolsNavBar">
        <div class="rightPart">
          <img src="assets/production/img/lgblanc.png" alt="">
          <p>Numéro de compte : {{ getActiveAccountNumber }}</p>
        </div>
        <div class="leftPart">
          <button @click.prevent="(event) => openPopUp(event)" class="navButton" attributPopUp="AddCompte|add">AJOUTER</button>
          <div class="selecteur navButton">
            <p>COMPTE :</p>
            <select name="" id="" @change.prevent="changeAccountActive" ref="accountSelector">
                <option v-for="account in getAllaccount" :value="account.id" :selected="(getActiveAccountNumber == account.id)">{{ account.name }}</option>
            </select>
          </div>
          
        </div>
    </nav>

</template>

<script>

export default {
  name: 'toolsNavBar',
  computed: {

    getAllaccount() {

      return this.$store.state.banksData.AllAccount;

    },

    getActiveAccountNumber() {

      if (this.$store.state.banksData.activeAccount != undefined ) {
        return this.$store.state.banksData.activeAccount.compte_number;
      } else {

        return "";

      }

    },

  },

  methods: {

    openPopUp(event) {

        if ( event.target.getAttribute('attributPopUp') != "none" ) {

            this.emitter.emit('PopUp', {'type': event.target.getAttribute('attributPopUp')});

        }

    },

    changeAccountActive() {

        for ( let i in this.getAllaccount ) {

          if ( this.getAllaccount[i].id == this.$refs.accountSelector.value ) {

            this.$store.commit('setActiveAccount', {id : i});

          }

        }

    }

  }
}
</script>