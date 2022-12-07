<template>
      
    <nav class="sideBar">
        <div class="topPart">
            <ul class="menu">
                <li><router-link to="/all-transactions" class="first">Toutes les transactions</router-link></li>
                <li><router-link to="/mensualites-categories">Mensualités & Catégories</router-link></li>
            </ul>
            <div class="livretGestion" v-if="(getActiveAccount.length != 0)">
                <div class="selecteur navButton">
                    <p>Livret :</p>
                    <select name="" id="" @change.prevent="ChangeActiveLivret" ref="livretChange">
                        <option v-for="livret in getAllLivret" :value="livret.id" :selected="(livret.id == getActiveLivret.id)">{{ livret.name }}</option>
                    </select>
                </div>
                <div class="secondButton">
                    <button  @click.prevent="(event) => openPopUp(event)" class="navButton" :attributPopUp="('livret|add|'+getActiveLivret.id)">Ajout livret</button>
                    <button v-if="(getActiveLivret.length != 0)" @click.prevent="(event) => openPopUp(event)" class="navButton" :attributPopUp="('livret|change|'+getActiveLivret.id)">Gérer</button>
                </div>
            </div>
        </div>
        <div class="bottomPart">
            <div class="containsButton">
                <button v-if="transactionPage == 'lol'" @click.prevent="(event) => openPopUp(event)" class="navButton" attributPopUp="none">Transfere entre livret</button>
                <button  v-if="(!transactionPage && getActiveAccount.length != 0)" @click.prevent="(event) => openPopUp(event)" class="navButton" attributPopUp="categorie|add">Ajouter Categories</button>
                <button v-if="(!transactionPage && getActiveLivret.length != 0)" @click.prevent="(event) => openPopUp(event)" class="navButton" attributPopUp="mensualite|add">Ajouter mensualité</button>
                <button v-if="(transactionPage && getActiveLivret.length != 0)" @click.prevent="(event) => openPopUp(event)" class="navButton" attributPopUp="debit|add">Ajout débit/crédit</button>
            </div>
            <button @click.prevent="(event) => openPopUp(event)" class="navButton" attributPopUp="AccountGestion|change">Gerer le compte</button>
        </div>
    </nav>

</template>

<script>

export default {
  name: 'sideBar',
  data() {

    return {

        transactionPage : false,

    }

  },
  computed : {

    getAllLivret(){

        if (this.$store.state.banksData.activeAccount != undefined ) {

            return this.$store.state.banksData.activeAccount.livrets;

        } else {

            return [];

        }

    },

    getActiveLivret() {

        if ( this.$store.state.banksData.activeLivret != undefined && this.$store.state.banksData.activeLivret != [] ) {

            return this.$store.state.banksData.activeLivret;

        } else {

            return {

                id: "none",

            }

        }

    },

    getActiveAccount() {
        
        return this.$store.state.banksData.activeAccount;
        
    },

  },
  methods : {

    openPopUp(event) {

        if ( event.target.getAttribute('attributPopUp') != "none" ) {

            this.emitter.emit('PopUp', {'type': event.target.getAttribute('attributPopUp')});

        }

    },

    ChangeActiveLivret() {

        console.log(this.$refs.livretChange.value);

        for ( let i in this.getAllLivret ) {

            if ( this.getAllLivret[i].id == this.$refs.livretChange.value ) {

                console.log(i);

                this.$store.commit("SetActualLivret",{
                    id : i,
                });

            }

        }

    }

  },
  mounted(){

    if ( this.$router.currentRoute._value.name == "AllTransaction" ) {

        this.transactionPage = true;

    }

  }
}
</script>