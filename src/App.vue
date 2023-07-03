<template>
  <v-app id="inspire">
    
  <!--Inicio Menu Drawer Lateral-->
    <v-navigation-drawer 
     v-model="drawer"
      app 
      >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.path"
          link            
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <!--buttom logout-->
      <v-list-item
        link
        @click="logout" v-if="isLogged"
      >
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>




    </v-navigation-drawer>

<!--Fin Menu Drawer Lateral-->

    <v-app-bar
      app
      color="indigo darken-2"
      dark
      prominent
                
    >
      <v-app-bar-nav-icon
      @click="drawer=!drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>CONTROL DE GESTIÓN</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
     
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <router-view></router-view>
          </v-flex>
        </v-layout>
        <snackbar />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth'
import router from './router'



  export default {

    setup() {

      const isLogged = ref(false)

      onMounted(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
          if (user) {
            isLogged.value = true
          } else {
            isLogged.value = false
          }
        })
      })

      const logout = () => {
        const auth = getAuth()
        signOut(auth).then(() => {
          console.log('logout')
          router.push({ name: 'loging' })
        }).catch((error) => {
          alert(error)
          console.log(error)
        }) 
      }
      

      return {
        isLogged,
        logout
      }


    },

    data: () => ({ 
      drawer: null,
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          path: '/',
          action: ''
        },
        {
          //item company
          icon: 'mdi-account-group',
          title: 'Company',
          path: '/company',
          action: ''
        },
        {
          icon: 'mdi-domain',
          title: 'Integrations',
          path: '/integrations',
          action: ''
        }
       

      ]

      }),

  

      components: {
      'snackbar': require('@/components/Shared/Snackbar.vue').default
      }
  }
</script>