<template>
    
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="white"
            dark
            v-bind="attrs"
            v-on="on"
            icon
          >
            <v-icon>{{ icon }}</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-toolbar
              color="primary"
              dark
            >
            <span class="text-h5">{{ title }}</span>
          </v-toolbar>
          
          <v-card-text>
            <div v-if="isInfoClient">
              <inputs-card-client :itemInfo=item.info_client />
            </div>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn v-if=!isInfoClient
              color="blue darken-1"
              text
              @click="dialog = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>

<script>
    export default {
        props: { 
          item:{
            type: Object,
            required: true          
          },           
            icon: {
                type: String,
                default: 'mdi-account-circle'
            },
            title: {
                type: String,
                default: ''
            },
            isInfoClient: {
                type: Boolean,
                default: false
            },
        },
      data: () => ({
        dialog: false,
      }),
      components: {
        "inputs-card-client": require("@/components/Dialogs/contents/inputsCardClient.vue").default,
            
      },
      mounted() {
      },
    }
  </script>

<style>

</style>