<template>

  <div class="connectionBloc">

      <div class="centerBloc">

          <h1>
            Connexion
            <p>à votre compte</p>
          </h1>

          <p><button @click.prevent="googleLogin" class="cta bleu">Connexion avec <br> google</button></p>
          <p style="margin-top: 10px;">{{ state }}</p>

      </div>

  </div>

</template>

<script lang="ts">

import { getAuth , signInWithPopup , GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: 'connectionPart',
  props : {

    borderBottom : Boolean,

  },
  data () {
    return {
      state: '',
      userId : 0,
    }
  },
  methods : {

    HandlingSignOut () {

        let auth = getAuth();
        signOut(auth).then(()=> {

            this.state = "disconnect"; 

        })

    },

    googleLogin() {

      const provider = new GoogleAuthProvider();
      const auth = getAuth();

      signInWithPopup(auth, provider)
      .then((data)=> {

          this.state = "connected";

      })
      .catch((error) => {

            this.state = error.code;

      });

    }
    
  },

  mounted () {

    let auth = getAuth();

    onAuthStateChanged(auth, (user) => {

      if (user) {

        this.$store.commit('setUser', {
          id :  user.providerData[0].uid,
          mail : user.email
        });

        this.$store.commit('call_api_banks',{
            userId : user.providerData[0].uid,
            userEmail : user.email,
        })

        this.state = "connected";

        this.$router.push('/all-transactions');

      }

    })

  }

};
</script>