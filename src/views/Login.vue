<template>


<v-container>
    <v-card  class="mx-auto my-12" max-width="374">
      <template slot="progress">
        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
      </template>

      <v-img height="200" src="https://loremflickr.com/640/480/abstract"></v-img>

      <v-card-title>Loging user</v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">

        </v-row>

        <div>
          <v-text-field 
          label="Email" 
          type="email" 
          v-model="email" 
          hide-details="auto"
          >
        </v-text-field>       
          <v-text-field type="password" v-model="password" label="Password"></v-text-field>
        </div>

        <div v-if="errMsg">
            <v-alert
            border="bottom"
            color="pink darken-1"
            close-text="Close Alert"
            dismissible
            dark
            >
            {{ errMsg }}
            </v-alert>
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-actions class="justify-center">
        <div class="text-center">
          <v-btn
            rounded
            class="mx-4"
            color="deep-purple"
            dark
            @click="register"            
          >
          <v-icon center>mdi-login</v-icon>
            Login
          </v-btn>
          
          <v-btn
            rounded
            color="red"
            dark
            @click="signInWithGoogle"
          >
          <v-icon center>mdi-google</v-icon>
            Login with Google
          </v-btn>



        </div>
      </v-card-actions>
    </v-card>

  </v-container>



</template>

<script setup>
    import { ref } from 'vue'
    import { getAuth, 
      signInWithEmailAndPassword,
      GoogleAuthProvider, 
      signInWithPopup } from '@firebase/auth'

    import router from '.././router'
    
    const email = ref('')
    const password = ref('')
    const errMsg = ref('') // Error Message
    
    const register = async () => {
      const auth = getAuth()
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log("Signed in: ", auth.currentUser)

          // call router here
          router.push({ name: 'home' })

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          console.log("Error: ", error.code)

          switch (errorCode) {
            case 'auth/invalid-email':
              errMsg.value = 'Email is not valid'
              break;
            case 'auth/user-disabled':
              errMsg.value = 'User is disabled'
              break;
            case 'auth/user-not-found':
              errMsg.value = 'User not found'
              break;
            case 'auth/wrong-password':
              errMsg.value = 'Wrong password'
              break;
            default:
              errMsg.value = errorMessage
              break;
            case 'auth/too-many-requests':
              errMsg.value = 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later'
              break;
          }

        });
    
        
    
      } catch (error) {
        console.log(error)
      }
    }

    // sign With Google
    const signInWithGoogle = async () => {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      try {
        const userCredential = await signInWithPopup(auth, provider)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log("Signed in: ", auth.currentUser)

          // call router here
          router.push({ name: 'home' })

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          console.log("Error: ", error.code)

          switch (errorCode) {
            case 'auth/invalid-email':
              errMsg.value = 'Email is not valid'
              break;
            case 'auth/user-disabled':
              errMsg.value = 'User is disabled'
              break;
            case 'auth/user-not-found':
              errMsg.value = 'User not found'
              break;
            case 'auth/wrong-password':
              errMsg.value = 'Wrong password'
              break;
            default:
              errMsg.value = errorMessage
              break;
            case 'auth/too-many-requests':
              errMsg.value = 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later'
              break;
          }

        });
    
        
    
      } catch (error) {
        console.log(error)
      }
    }

    </script>
    