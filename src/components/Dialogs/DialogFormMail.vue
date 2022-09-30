<template>
    <v-row justify="center">
      <v-dialog
      :value="true"
       persistent
        max-width="800px"
      >
        <v-card>
          <v-toolbar
              color="primary"
              dark
            >{{ mailTitle }}
        </v-toolbar>
          <v-card-text>
            <v-container>
              <v-row>
                <div v-if="mailFileClient" >
                    <inputs-mail-file-client :item="item"/>
                </div>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="$emit('close')"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="$emit('send')"
              :loading="$store.state.loading"
            >Send
            <v-icon>
              mdi-send
            </v-icon>
              
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>

<script>
    export default {
        props: {
            item: {
                type: Object,
            },
            mailTitle: {
                type: String,
                default: 'Mail file cliente'
            },
            mailFileClient:{
                type: Boolean,
                default: false
            }
        },
      data: () => ({
        dialog: false,
      }),
      components: {
        "inputs-mail-file-client": require('@/components/Dialogs/contents/inputsMailFileClient.vue').default,
      }
    }
  </script>