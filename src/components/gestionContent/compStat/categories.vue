<template>
      
    <div class="Categories">
        <div class="content">
            <div class="top">
                <div class="left">
                    <p class="name">{{ data.name }}</p>
                    <p class="price" :class="[ getStatCategorie.total == 0 ? 'yellow' : '' ,  getStatCategorie.total < 0 ? 'red' : '' , getStatCategorie.total > 0 ? 'green' : '' ]">{{parseFloat(getStatCategorie.total).toFixed(2)}} <span>euros</span></p>
                </div>
                <div class="right">
                    <button @click.prevent="(event) => openPopUp(event)" :attributPopUp="'categorie|change|'+data.id"><img src="assets/production/img/picto-modification.svg" alt=""></button>
                    <button @click.prevent="(event) => openPopUp(event)" :attributPopUp="('categorie|delete|'+data.id+'|'+data.name)"><img src="assets/production/img/picto-suppression.svg" alt=""></button>
                </div>
            </div>
            <div class="bottom">
                <p>Gains | Dépenses</p>
                <div class="info">
                    <p class="price" :class="[ getStatCategorie.totalGain == 0 ? 'yellow' : '' ,  getStatCategorie.totalGain < 0 ? 'red' : '' , getStatCategorie.totalGain > 0 ? 'green' : '' ]">
                        {{getStatCategorie.totalGain}}
                        <span>euros</span>
                    </p>
                    <p class="price" :class="[ getStatCategorie.totalDepense == 0 ? 'yellow' : '' ,  getStatCategorie.totalDepense < 0 ? 'red' : '' , getStatCategorie.totalDepense > 0 ? 'red' : '' ]">
                        -{{getStatCategorie.totalDepense}}
                        <span>euros</span>
                    </p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

export default {
  name: 'categories',
  props : {
    
    data : []

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

  computed : {

    getStatCategorie() {

        return this.$store.state.banksData.categoriesInformation[this.data.id];

    }

  },

  mounted(){

    

  }

}
</script>
