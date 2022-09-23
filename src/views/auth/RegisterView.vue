<template>

  <v-container>
    <v-card class="mx-auto my-12" max-width="374">
      <template slot="progress">
        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
      </template>

      <v-img height="200" src="https://loremflickr.com/640/480/abstract"></v-img>

      <v-card-title>Register user</v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">

        </v-row>

        <div>
          <v-text-field label="Email of register" type="email" v-model="email" hide-details="auto"></v-text-field>
          <v-text-field type="password" v-model="password" label="Password"></v-text-field>
        </div>

        <div>-</div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-actions class="justify-center">
        <div class="text-center">
          <v-btn 
          rounded 
          class="mx-4"
          color="deep-purple" 
          dark @click="register"
          >
            <v-icon center>mdi-account-plus</v-icon>
            Save
          </v-btn>
        </div>
        <div class="text-center">
          <v-btn rounded color="deep-purple" dark @click="signInWithGoogle">
            <v-icon center>mdi-google</v-icon>
            Login
          </v-btn>




        </div>
      </v-card-actions>
    </v-card>

  </v-container>


</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup } from '@firebase/auth'
import router from '../../router'

const email = ref('')
const password = ref('')
//const router = useRouter()

const register = async () => {
  const auth = getAuth()
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    console.log(userCredential)

    // call router here
    router.push({ name: 'loging' })

  } catch (error) {
    console.log(error)
  }

}

const signInWithGoogle = async () => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }


</script>

