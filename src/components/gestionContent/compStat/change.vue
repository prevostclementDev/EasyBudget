<template>
      
    <div class="change">
        <div class="content">
            <p class="price" :class="[getChange.type_change == 'depense' ? 'red' : '' , getChange.type_change == 'gain' ? 'green' : '']">{{getChange.montant}} <span>euros</span></p>
            <p class="intituler">{{getChange.intitule}}</p>
            <p class="date">le : {{getChange.date}}</p>
            <p class="categories">pour {{getDataCategorieByID.name}}</p>
        </div>
        <div class="modif">
            <button @click.prevent="(event) => openPopUp(event)" :attributPopUp="('debit|change|'+getChange.id)" ><img src="assets/production/img/picto-modification.svg" alt=""></button>
            <button @click.prevent="(event) => openPopUp(event)" :attributPopUp="('debit|delete|'+getChange.id+'|'+getChange.name)" ><img src="assets/production/img/picto-suppression.svg" alt=""></button>
        </div>
    </div>

</template>

<script>

export default {
  name: 'change',
  props: {
    data : []
  },
  computed : {

    getChange() {

      return this.data;

    },

    getDataCategorieByID(){

        return this.$store.state.banksData.activeCategories[this.getChange.id_categorie.toString()];

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

  }
}
</script>
