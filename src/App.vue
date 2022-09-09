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
    </v-navigation-drawer>

<!--Fin Menu Drawer Lateral-->

    <v-app-bar
      app
      color="indigo darken-2"
      dark
      shrink-on-scroll
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
  export default {
    data: () => ({ 
      drawer: null,
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          path: '/'
        },
        {
          //item company
          icon: 'mdi-account-group',
          title: 'Company',
          path: '/company'
        },
        {
          icon: 'mdi-domain',
          title: 'Integrations',
          path: '/integrations'
        },
        {
          icon: 'mdi-cog-outline',
          title: 'Settings',
          to: '/settings'
        }
      ]

      }),
      components: {
      'snackbar': require('@/components/Shared/Snackbar.vue').default
      }
  }
</script>