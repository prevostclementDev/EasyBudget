import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state () {

    return {

      user : {

        id : 0,
        mail : ""


      },

      banksData : {

        data : null,
        AllAccount : [],
        activeAccount : [],
        activeLivret : [],
        activeChange : [],
        activeMensualites : [],
        activeCategories : [],
        activeTotal : 0,
        activeTotalPrevisionnel : 0,
        activeTotalGain : 0,
        activeTotalDepense : 0,
        activeBalance : 0,
        totalGainMensualites : 0,
        totalDepenseMensualites : 0,
        balanceMensualites : 0,
        categoriesInformation : [],

        actualsIdLivret : 0,
        actualsIdAccount : 0,

      },

      apiState : {

        statement : "",

      }

    }

  },

  mutations: {

    call_api_banks(state, info) {

      if ( info.userId == 0 ) {

        this.commit('resetData');
        return false;

      }

      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY4NTA2ODAyLCJleHAiOjE2NzEwOTg4MDJ9.W4Nlz9o5yr7CQGf6rnO8zSeOUE7b9u3YUMQ5xjPRCHk";

      axios
      .get('http://apieastbudget.clementprevost-portfolio.com/index.php?mail='+info.userEmail+'&userId='+info.userId+'&token='+token)
      .then(response => {

          if ( response.data.state == true ) {

            axios
            .get('http://apieastbudget.clementprevost-portfolio.com/api/'+info.userId+'/?dataType=all&token='+token)
            .then(response => {

              this.state.apiState.statement = "reception reussie";

              this.commit('setBanksData',{
                userId : this.state.user.id,
                userEmail : this.state.user.email,
                response : response,
              })

            }).catch(error => {

                console.log(error)
                this.state.apiState.statement = "erreur ouvrir la console. erreur sur la récéption des données après connexion";
                
            })

          }

          this.state.apiState.statement = "erreur de requête";

      }).catch(error => {

          console.log(error)
          this.state.apiState.statement = "erreur connection";
          
      })

    },

    callApi(state , data){

      if ( this.state.user.id == 0 ) {

        this.commit('resetData');
        return false;

      }

      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY4NTA2ODAyLCJleHAiOjE2NzEwOTg4MDJ9.W4Nlz9o5yr7CQGf6rnO8zSeOUE7b9u3YUMQ5xjPRCHk";
      axios
      .get('http://apieastbudget.clementprevost-portfolio.com/index.php?mail='+this.state.user.mail+'&userId='+this.state.user.id+'&token='+token)
      .then(response => {

        if ( response.data.state == true ) {

          let $param = '';

          for (let value of data.info) {

            $param += "&"+value[0]+"="+value[1];

          }

           axios
          .get('http://apieastbudget.clementprevost-portfolio.com/api/'+this.state.user.id+'/?action='+data.action+$param+'&token='+token)
          .then(response => {

            console.log(response);

            this.commit("call_api_banks",{
              userId : this.state.user.id,
              userEmail : this.state.user.mail,
            });
            data.callback(response);

          }).catch(error => {

              console.log(error)
              this.state.apiState.statement = "erreur ouvrir la console. erreur sur la récéption des données après connexion";
              
          }) 

        }

        this.state.apiState.statement = "erreur de requête";

      })
      .catch(error => {

        console.log(error)

      })

    },

    resetData(){

      this.state.banksData.data = null
      this.state.banksData.AllAccount = []
      this.state.banksData.activeAccount = []
      this.state.banksData.activeLivret = []
      this.state.banksData.activeChange = []
      this.state.banksData.activeMensualites = []
      this.state.banksData.activeCategories = []
      this.state.banksData.activeTotal = 0
      this.state.banksData.activeTotalPrevisionnel = 0
      this.state.banksData.activeTotalGain = 0
      this.state.banksData.activeTotalDepense = 0
      this.state.banksData.activeBalance = 0
      this.state.banksData.totalGainMensualites = 0
      this.state.banksData.totalDepenseMensualites = 0
      this.state.banksData.balanceMensualites = 0
      this.state.banksData.categoriesInformation = []
      this.state.banksData.actualsIdLivret = 0
      this.state.banksData.actualsIdAccount = 0

    },

    setBanksData(state, info) {

      this.state.banksData.data = info.response.data.data;
      this.state.apiState.statement = true;

      if ( this.state.banksData.data != null && this.state.banksData.data.length != 0 ) {

        this.commit('setActiveAccount',{
          id : undefined
        });

      } else {
        
        this.commit('resetData')

      }

    },

    setActiveAccount(state, data) {

      if ( data.id != undefined ) {

        this.state.banksData.actualsIdAccount = data.id;

      }

      this.state.banksData.activeAccount = this.state.banksData.data[this.state.banksData.actualsIdAccount];

      this.commit('SetActualLivret',{
        id : undefined
      })

    },

    SetActualLivret(state,data) {

      if ( data.id != undefined ) {

        this.state.banksData.actualsIdLivret = data.id;

      }

      let livretBaseSolde = 0;
      
      if ( this.state.banksData.activeAccount.livrets.length != 0 ) {

        this.state.banksData.activeLivret = this.state.banksData.activeAccount.livrets[this.state.banksData.actualsIdLivret];
        this.state.banksData.activeChange = this.state.banksData.activeLivret.change.depense.concat(this.state.banksData.activeLivret.change.gain);
        this.state.banksData.activeMensualites = this.state.banksData.activeLivret.mensualites.depense.concat(this.state.banksData.activeLivret.mensualites.gain);
        livretBaseSolde = this.state.banksData.activeLivret.solde_base;

      } else {

        this.state.banksData.activeLivret = this.state.banksData.activeAccount.livrets;
        this.state.banksData.activeChange = [];
        this.state.banksData.activeMensualites = [];

      }

      if ( this.state.banksData.AllAccount != [] ) {

        this.state.banksData.AllAccount = [];

      }

      this.state.banksData.data.forEach(element => {
        this.state.banksData.AllAccount.push(
          {
            id : element.compte_number,
            name : element.name,
          }
        )
      });

      this.state.banksData.activeCategories = this.state.banksData.activeAccount.categories;

      this.commit('calTotal',parseInt(livretBaseSolde));  

    },

    calTotal(state , soldeActiveLivret) {

      let total = soldeActiveLivret;
      let totalGain = 0;
      let totaldepense = 0;

      let totalGainMensualites = 0;
      let totalDepenseMensualites = 0;

      for ( let element in this.state.banksData.activeCategories ) {

          this.state.banksData.categoriesInformation[element] = {
            total : 0,
            totalGain : 0,
            totalDepense : 0,
          }

      }

      this.state.banksData.activeChange.forEach(element => {
        if ( element.type_change == "gain" ) {

          total += parseInt(element.montant);
          totalGain += parseInt(element.montant);

          if ( this.state.banksData.categoriesInformation[element.id_categorie] != undefined ) {

            this.state.banksData.categoriesInformation[element.id_categorie].total += parseInt(element.montant);
            this.state.banksData.categoriesInformation[element.id_categorie].totalGain += parseInt(element.montant);  

          }


        } else {

          total -= parseInt(element.montant);
          totaldepense += parseInt(element.montant);

          if ( this.state.banksData.categoriesInformation[element.id_categorie] != undefined ) {
            
            this.state.banksData.categoriesInformation[element.id_categorie].total -= parseInt(element.montant);
            this.state.banksData.categoriesInformation[element.id_categorie].totalDepense += parseInt(element.montant);

          }

        }
        
      });

      let totalPrevisionnel = total;

      this.state.banksData.activeMensualites.forEach(element => {

        if ( element.type_change == "gain" && element.actif == "1" ) {

          totalPrevisionnel += parseInt(element.montant);
          totalGainMensualites += parseInt(element.montant);

        } else if ( element.actif == "1" ) {

          totalPrevisionnel -= parseInt(element.montant);
          totalDepenseMensualites += parseInt(element.montant);

        }
        
      });

      this.state.banksData.activeTotal = total;
      this.state.banksData.activeTotalPrevisionnel = totalPrevisionnel;

      this.state.banksData.activeTotalGain = totalGain;
      this.state.banksData.activeTotalDepense = totaldepense;
      this.state.banksData.activeBalance = totalGain - totaldepense;

      this.state.banksData.totalGainMensualites = totalGainMensualites;
      this.state.banksData.totalDepenseMensualites = totalDepenseMensualites;
      this.state.banksData.balanceMensualites = totalGainMensualites - totalDepenseMensualites;

    },

    getApiState(state,callback) {

      callback(this.state.apiState.statement);

    },

    setUser(state, data) {

      this.state.user.id = data.id;
      this.state.user.mail = data.mail;

    },

    getCurrentUser(state,callback) {
      
      callback(this.state.user);
      
    },

  }

})

export default store;