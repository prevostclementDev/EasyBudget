<template>
    
    <div class="pop_up" :class="[openPopUp === true ? 'active' : '']">
        
        <div class="centerInformation">

            <form action="" ref="DeleteVerification" class="DeleteVerification" :class="[DeletePopUp === true ? 'active' : '']">
                <h2>Vous êtes sur ?</h2>
                <p>Vous allez supprimez : {{deletePopUpText}}</p>

                <div class="action">
                    <button class="navButton transparent" @click.prevent="closePopUp">Retour</button>
                    <button class="navButton red" @click.prevent="deleteActionOn">Supprimer</button>
                </div>

            </form>

            <form action="" ref="AccountGestion" class="AccountGestion" :class="[activePopUp === 'AccountGestion' ? 'active' : '']">
                <h2>Gerer mes comptes :</h2>

                <div class="infoMail">
                    <input type="email" disabled="disabled" :value="getMailUser">
                    <button class="navButton bleu little" @click.prevent="loggout">Déconnexion</button>
                </div>

                <div class="separation"></div>

                <div class="compteExistant">

                    <label for="" v-if="(getAllAccount.length != 0)">
                        <p>Mes comptes bancaire :</p>
                        <select name="" id="" @change="changeSelectAccount" ref="selectAccount"> 
                            <option v-for="account in getAllAccount" :value="account.id">{{ account.name }}</option>
                        </select>
                    </label>

                    <div class="col">
                        <label for="">
                            <p>Nom :</p>
                            <input ref="accountValue" type="text" disabled="disabled" :value="getActiveAccount.name">
                        </label>
                        <label for="">
                            <p>Numéro de compte :</p>
                            <input ref="accountNumberValue" type="text" disabled="disabled" :value="getActiveAccount.compte_number">
                        </label>
                        <button class="navButton red little" @click.prevent="(event) => DeletePopUpWithAction(event)" setDelete="account_banks|compte_number|=">Supprimer</button>
                    </div>

                </div>

                <div class="bottomButton">
                    <button class="navButton transparent" @click.prevent="closePopUp">Fermer</button>
                </div>

            </form>

            <form action="" ref="AddCompte" class="AddCompte pop_up_add " :class="[activePopUp === 'AddCompte' ? 'active' : '']">
                <h2>Ajouter un compte</h2>
                <div class="champs">
                    <label for="">
                        <p>Nom :</p>
                        <input ref="accountName" type="text" placeholder="nom du compte...">
                    </label>
                    <label for="">
                        <p>Numéro de compte :</p>
                        <input ref="accountNumber" type="text" placeholder="Numéro de compte...">
                    </label>
                </div>
                <div class="bottomButton">
                    <button class="navButton transparent" @click.prevent="closePopUp">Retour</button>
                    <button class="navButton bleu little" @click.prevent="addAccount">Enregistrer</button>
                </div>
            </form>

            <form action="" ref="livret" class="livret pop_up_add" :class="[activePopUp === 'livret' ? 'active' : '']">
                <h2>{{ wording }} un Livret</h2>
                <div class="champs">
                    <label for="">
                        <p>Nom :</p>
                        <input type="text" ref="livretName" placeholder="nom du compte..." :value="[wording == 'Modification' ? getActiveLivret.name : '']">
                    </label>
                    <label for="">
                        <p>Solde de base  :</p>
                        <input type="text" ref="livretSolde" placeholder="Solde de base..." :value="[wording == 'Modification' ? getActiveLivret.solde_base : '']">
                    </label>
                </div>
                <div class="bottomButton">
                    <button class="navButton transparent" @click.prevent="closePopUp">Retour</button>
                    <button v-if="activeModuleTypeChange == 'change'" class="navButton red little" @click.prevent="(event) => DeletePopUpWithAction(event)" setDelete="livret|id|=">Supprimer</button>
                    <button class="navButton bleu little" @click.prevent="addLivret">Enregistrer</button>
                </div>
            </form>

            <form action="" ref="debit" class="debit pop_up_add " :class="[activePopUp === 'debit' ? 'active' : '']">
                <h2>{{ wording }} de debit</h2>
                <div class="champs">
                    <label for="">
                        <p>Nom :</p>
                        <input ref="nameDebit" type="text" :value="getActiveDebit.name">
                    </label>
                </div>
                <div class="champs">
                    <label for="">
                        <p>Montant :</p>
                        <input type="number" ref="montantDebit" :value="getActiveDebit.montant">
                    </label>
                    <label for="">
                        <p>Intituler :</p>
                        <input type="text" ref="intituleDebit" placeholder="Intituler..." :value="getActiveDebit.intitule">
                    </label>
                </div>
                <div class="champs">
                    <label for="">
                        <p>Date :</p>
                        <input type="date" ref="dateDebit" :value="getActiveDebit.date">
                    </label>
                    <label for="">
                        <p>Catégorie :</p>
                        <select name="" id="" ref="CategorieDebit">
                            <option v-for="categorie in getAllActiveCategorie" :value="categorie.id" :selected="(getActiveDebit.id_categorie == categorie.id)">{{ categorie.name }}</option>
                        </select>
                    </label>
                </div>
                <div class="champs">
                    <label for="">
                        <p>Type :</p>
                        <select name="" id="" ref="type_changeDebit">
                            <option value="depense" :selected="getActiveDebit.type_change == 'depense'">Dépense</option>
                            <option value="gain" :selected="getActiveDebit.type_change == 'gain'">Gain</option>
                        </select>
                    </label>
                </div>
                <div class="bottomButton">
                    <button class="navButton transparent" @click.prevent="closePopUp">Retour</button>
                    <button class="navButton bleu little" @click.prevent="registerDebit">Enregistrer</button>
                </div>
            </form>

            <form action="" ref="categorie" class="categorie pop_up_add" :class="[activePopUp === 'categorie' ? 'active' : '']">
                <h2>{{ wording }} de categorie :</h2>
                <div class="champs">
                    <label for="">
                        <p>Nom de la catégorie :</p>
                        <input ref="categorieName" type="text" :value="getActiveCategorie.name">
                    </label>
                </div>
                <div class="bottomButton">
                    <button class="navButton transparent" @click.prevent="closePopUp">Retour</button>
                    <button class="navButton bleu little" @click.prevent="registerCategorie">Enregistrer</button>
                </div>
            </form>

            <form action="" ref="mensualite" class="mensualite pop_up_add" :class="[activePopUp === 'mensualite' ? 'active' : '']">
                <h2>{{ wording }} de mensualité :</h2>
                <div class="champs">
                    <label for="">
                        <p>Nom de la mensualité :</p>
                        <input type="text" ref="nameMensualites" placeholder="nom..." :value="getMensualites.name">
                    </label>
                    <label for="">
                        <p>Montant de la mensualité :</p>
                        <input type="number" ref="montantMensualies" :value="getMensualites.montant">
                    </label>
                </div>
                <div class="champs">
                    <label for="">
                        <p>Date :</p>
                        <input type="date" ref="dateMensualites" :value="getMensualites.date">
                    </label>
                    <label for="">
                        <p>Intitulé  :</p>
                        <input type="text" ref="intituleMensualites" placeholder="intitulé..." :value="getMensualites.intitule">
                    </label>
                </div>
                <div class="champs">
                    <label for="">
                        <p>Catégorie :</p>
                        <select name="" id="" ref="categorieMensualites">
                            <option v-for="categorie in getAllActiveCategorie" :value="categorie.id" :selected="(getMensualites.id_categorie == categorie.id)">{{ categorie.name }}</option>
                        </select>
                    </label>
                    <label for="">
                        <p>Actif :</p>
                        <input type="checkbox" ref="actifMensualites" name="" id="" :checked="getMensualites.actif == 1">
                    </label>
                </div>
                <div class="champs">
                    <label for="">
                        <p>Type :</p>
                        <select name="" id="" ref="typeMensualites">
                            <option value="depense" :selected="getMensualites.type_change == 'depense'">Dépense</option>
                            <option value="gain" :selected="getMensualites.type_change == 'gain'">Gain</option>
                        </select>
                    </label>
                </div>
                <div class="bottomButton">
                    <button class="navButton transparent" @click.prevent="closePopUp">Retour</button>
                    <button class="navButton bleu little" @click.prevent="registerMensualite">Enregistrer</button>
                </div>
            </form>

        </div>
    </div>

</template>

<script>
import { getAuth , signOut } from "firebase/auth";

export default {
  name: 'popUp',
  data() {

    return {

        openPopUp : false,
        activePopUp : "",
        DeletePopUp : false,

        activeId : 0,

        activeModuleChange : 0,
        activeModuleTypeChange : 'change',

        wording : "Ajout",

        deletePopUpText : "",

        SetDelete : [
            ["what",''],
            ["whereType",''],
            ["whereEqual",''],
            ["whereValue",''],
        ]

    }

  },
  computed : {

    getMailUser() {

        return this.$store.state.user.mail;

    },

    getAllAccount() {

        return this.$store.state.banksData.AllAccount;

    },

    getActiveAccount() {
        
        if ( this.$store.state.banksData.activeAccount != undefined && this.$store.state.banksData.activeAccount != [] ) {

            return this.$store.state.banksData.activeAccount;

        } else {

            return {
                id : 0,
                name: "none",
            }

        }

    },

    getActiveDebit() {
        
        if ( this.activeModuleTypeChange == 'change' ) {

            for ( let i in this.$store.state.banksData.activeChange ) {

                if ( this.$store.state.banksData.activeChange[i].id == this.activeModuleChange ) {

                    return this.$store.state.banksData.activeChange[i];

                }

            }

        }

        return {
            montant : 0,
            intitule : "",
            date : "",
            categorie : "",
            type_change : 'gain',
            id_categories : 0,
            name : "",
        }

    },

    getAllActiveCategorie() {

        return this.$store.state.banksData.activeCategories;

    },

    getActiveLivret() {

        if ( this.$store.state.banksData.activeLivret != undefined && this.$store.state.banksData.activeLivret != [] ) {

            return this.$store.state.banksData.activeLivret;

        }

        return {
            name : "",
            id : 0,
            solde_base : 0
        }

    },

    getMensualites(){

        if ( this.activeModuleTypeChange == 'change' ) {

            for ( let i in this.$store.state.banksData.activeMensualites ) {

                if ( this.$store.state.banksData.activeMensualites[i].id == this.activeModuleChange ) {

                    return this.$store.state.banksData.activeMensualites[i];

                }

            }

        }

        return {
            montant : 0,
            intitule : "",
            date : "",
            categorie : "",
            type_change : 'gain',
            id_categories : 0,
            name : "",
            actif : 1,
        }

    },

    getActiveCategorie() {

        if ( this.activeModuleTypeChange == 'change' ) {

            for ( let i in this.$store.state.banksData.activeCategories ) {

                if ( this.$store.state.banksData.activeCategories[i].id == this.activeModuleChange ) {

                    return this.$store.state.banksData.activeCategories[i];

                }

            }

        }

        return {
            name : "",
            id  :""
        }

    },

  },
  methods : {

    closePopUp() {

        this.DeletePopUp = false;
        this.openPopUp = false;
        this.activePopUp = "";

    },

    loggout() {

        let auth = getAuth();
        signOut(auth).then(()=> {

            this.$router.push('/');

        })

    },

    captureEvent() {

        this.emitter.on('PopUp', (evt) => {
        
            const popUpToOpen = evt.type.split("|");

            console.log(popUpToOpen)

            // SET BASE DATA
            this.activeModuleChange = popUpToOpen[2];
            this.activeModuleTypeChange = popUpToOpen[1];

            this.deletePopUpText = popUpToOpen[3] != undefined ? popUpToOpen[3] : popUpToOpen[3];
            
            // WORDING
            if ( popUpToOpen[1] == 'change' ) {

                this.wording = 'Modification';

            } else {

                this.wording = 'Ajout';

            }

            /* DELETE POP UP */
            if ( popUpToOpen[1] == "delete" ) {

                this.DeletePopUp = true;

                if ( popUpToOpen[0] == "debit" ) {

                    this.SetDelete = [
                        ["what",'base_change'],
                        ["whereType",'id'],
                        ["whereEqual",'='],
                        ["whereValue",this.activeModuleChange],
                    ]

                }

                if ( popUpToOpen[0] == "mensualite" ) {

                    this.SetDelete = [
                        ["what",'mensualites'],
                        ["whereType",'id'],
                        ["whereEqual",'='],
                        ["whereValue",this.activeModuleChange],
                    ]

                }

                if ( popUpToOpen[0] == "categorie" ) {

                    this.SetDelete = [
                        ["what",'categories'],
                        ["whereType",'id'],
                        ["whereEqual",'='],
                        ["whereValue",this.activeModuleChange],
                    ]

                }


            } else {

                this.DeletePopUp = false;
                this.activePopUp = popUpToOpen[0];

            }

            this.openPopUp = true;
            
        })

    },

    addAccount(){

        const data = {

            info : [
                ['accountNumber', this.$refs.accountNumber.value],
                ['accountName',this.$refs.accountName.value]
            ],
            action : 'createAccount',
            callback : (response) => {

                this.closePopUp();

            }

        }

        this.$store.commit('callApi', data);

    },

    addLivret() {

        if ( this.activeModuleTypeChange == "change" ) {

            const data = {

                info : [
                    ['what', 'livret'],
                    ['modif',`name="${this.$refs.livretName.value}",solde_base=${this.$refs.livretSolde.value}`],
                    ['whereType','id'],
                    ['whereEqual','='],
                    ['whereValue',this.getActiveLivret.id]
                ],
                action : 'UpdateValue',
                callback : (response) => {

                    this.closePopUp();

                }

            }
            
            this.$store.commit('callApi', data);

        } else {

            const data = {

                info : [
                    ['AccountNumber', this.getActiveAccount.compte_number],
                    ['livretName',this.$refs.livretName.value],
                    ['livretSolde',this.$refs.livretSolde.value]
                ],
                action : 'createLivret',
                callback : (response) => {

                    this.closePopUp();

                }

            }

            this.$store.commit('callApi', data);

        }

    },

    registerDebit(){
    
        if ( this.activeModuleTypeChange == "change" ) {

            const data = {
        
                info : [
                    ['what', 'base_change'],
                    ['modif',`name="${this.$refs.nameDebit.value}",id_categorie=${this.$refs.CategorieDebit.value},montant=${this.$refs.montantDebit.value},date="${this.$refs.dateDebit.value}",intitule="${this.$refs.intituleDebit.value}",type_change="${this.$refs.type_changeDebit.value}"`],
                    ['whereType','id'],
                    ['whereEqual','='],
                    ['whereValue',this.activeModuleChange]
                ],
                action : 'UpdateValue',
                callback : (response) => {
        
                    this.closePopUp();
        
                }
        
            }

            this.$store.commit('callApi', data);

        } else {

            const data = {
        
                info : [
                    ['name', this.$refs.nameDebit.value],
                    ['id_livret', this.getActiveLivret.id],
                    ['id_categorie', this.$refs.CategorieDebit.value],
                    ['montant', this.$refs.montantDebit.value],
                    ['date', this.$refs.dateDebit.value],
                    ['intitule', this.$refs.intituleDebit.value],
                    ['type', this.$refs.type_changeDebit.value]
                ],
                action : 'createChanges',
                callback : (response) => {
        
                    this.closePopUp();
        
                }
        
            }
        
            this.$store.commit('callApi', data);

        }
    
    },

    registerCategorie() {

        if ( this.activeModuleTypeChange == "change" ) {

            const data = {
        
                info : [

                    ['what', 'categories'],
                    ['modif',`name="${this.$refs.categorieName.value}"`],
                    ['whereType','id'],
                    ['whereEqual','='],
                    ['whereValue',this.activeModuleChange]

                ],
                action : 'UpdateValue',
                callback : (response) => {
        
                    this.closePopUp();
        
                }
        
            }
        
            this.$store.commit('callApi', data);

        } else {

            const data = {
        
                info : [
                    ['name', this.$refs.categorieName.value],
                    ['accountNumber', this.getActiveAccount.compte_number],
                ],
                action : 'createCategories',
                callback : (response) => {
        
                    this.closePopUp();
        
                }
        
            }
        
            this.$store.commit('callApi', data);

        }

    },

    changeSelectAccount(){

        const accountId = this.$refs.selectAccount.value;
        for (let i in this.getAllAccount) {

            if ( this.getAllAccount[i].id == accountId ) {

                this.$refs.accountValue.value = this.getAllAccount[i].name;
                this.$refs.accountNumberValue.value = this.getAllAccount[i].id;

            }

        }

    }, 

    DeletePopUpWithAction(e) {

        this.closePopUp();

        const data = e.target.getAttribute('setDelete').split("|");

        if ( data[0] == "account_banks" ) {

            this.activeModuleChange = this.$refs.accountNumberValue.value;
            this.deletePopUpText = this.$refs.accountValue.value;

        }

        if ( data[0] == "livret" ) {

            this.activeModuleChange = this.getActiveLivret.id;
            this.deletePopUpText = this.$refs.livretName.value;

        }

        this.SetDelete = [
            ["what",data[0]],
            ["whereType",data[1]],
            ["whereEqual",data[2]],
            ["whereValue",this.activeModuleChange]
        ]

        this.DeletePopUp = true;
        this.openPopUp = true;  

    },

    deleteActionOn() {

        const data = {

            info : this.SetDelete,
            action : 'deleteValue',
            callback : (response) => {

                this.closePopUp();

            }

        }

        this.$store.commit('callApi', data);

    },

    registerMensualite() {

        if ( this.activeModuleTypeChange == "change" ) {

            let actif = 1;

            if ( this.$refs.actifMensualites.checked == false ) {

                actif = 0;

            }

            const data = {
        
                info : [

                    ['what', 'mensualites'],
                    ['modif',`name="${this.$refs.nameMensualites.value}",id_categorie=${this.$refs.categorieMensualites.value},montant=${this.$refs.montantMensualies.value},date="${this.$refs.dateMensualites.value}",actif=${actif},type_change="${this.$refs.typeMensualites.value}",intitule="${this.$refs.intituleMensualites.value}"`],
                    ['whereType','id'],
                    ['whereEqual','='],
                    ['whereValue',this.activeModuleChange]

                ],
                action : 'UpdateValue',
                callback : (response) => {
        
                    this.closePopUp();
        
                }
        
            }
        
            this.$store.commit('callApi', data);

        } else {

            let actif = 1;

            if ( this.$refs.actifMensualites.checked == false ) {

                actif = 0;

            }

            const data = {
        
                info : [
                    ['name',this.$refs.nameMensualites.value],
                    ['id_livret',this.getActiveLivret.id],
                    ['id_categories',this.$refs.categorieMensualites.value],
                    ['montant',this.$refs.montantMensualies.value],
                    ['date',this.$refs.dateMensualites.value],
                    ['intitule',this.$refs.intituleMensualites.value],
                    ['actif',actif],
                    ['type_change',this.$refs.typeMensualites.value]
                ],
                action : 'createMensualites',
                callback : (response) => {
        
                    this.closePopUp();
        
                }
        
            }

            this.$store.commit('callApi', data);

        }

    }
    
  },
  mounted(){

    this.captureEvent();

  }
}
</script>
