<template>
      
    <div class="Mensualites">
        <div class="content">
            <div class="group">
                <p class="price" :class="[getDataMensualites.type_change == 'depense' ? 'red' : '' , getDataMensualites.type_change == 'gain' ? 'green' : '']">{{ getDataMensualites.montant }} <span>euros</span></p>
                <p class="intituler">{{ getDataMensualites.intitule }}</p>
            </div>
            <div class="group">
                <p class="date">le : {{ getDataMensualites.date }}</p>
                <p class="categories">pour {{ getDataCategorieByID.name }}</p>
            </div>
            <div class="group">
                <button @click.prevent="(event) => openPopUp(event)" :attributPopUp="'mensualite|change|'+getDataMensualites.id"><img src="assets/production/img/picto-modification.svg" alt=""></button>
                <button @click.prevent="(event) => openPopUp(event)" :attributPopUp="('mensualite|delete|'+getDataMensualites.id+'|'+getDataMensualites.intitule)"><img src="assets/production/img/picto-suppression.svg" alt=""></button>
            </div>
        </div>
    </div>

</template>

<script>

export default {
  name: 'mensualites',
  props : {
    data: []
  },

  computed : {

    getDataMensualites(){

        for (let el in this.$store.state.banksData.activeMensualites) {

            if ( this.$store.state.banksData.activeMensualites[el].id == this.data ) {

                return this.$store.state.banksData.activeMensualites[el];

            }

        }

    },

    getDataCategorieByID(){

        return this.$store.state.banksData.activeCategories[this.getDataMensualites.id_categorie.toString()];

    }

  },

  methods : {

    openPopUp(event) {

        if ( event.target.getAttribute('attributPopUp') != "none" ) {

            if ( event.target.getAttribute('attributPopUp') == null ) {

                this.emitter.emit('PopUp', {'type': event.target.parentElement.getAttribute('attributPopUp')});

            } else {

                this.emitter.emit('PopUp', {'type': event.target.getAttribute('attributPopUp')});

            }

        }

    }

  },

}
</script>
