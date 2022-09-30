<template>

<div>
  <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
      </template>

      <v-list>
          <v-list-item v-for="(item, i) in items" :key="i" @click="handlerClick(i)">
              <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
      </v-list>
  </v-menu>

  <dialog-form-mail 
  v-if="dialog"
  :item="item" 
  :mailTitle="mailTitle"  
  :mailFileClient="mailFileClient" 
  @close="dialog = false"
  @send="sendMail"
  />




</div>


</template>

<script>
    export default {
      props: {
        item: {
          type: Object,
       
        }
      },
      data: () => ({
        dialog: false,
        mailFileClient: false,
        mailTitle: '',
        items: [
          { 
            title: 'Send mail client File',
            icon: 'mdi-email',
            click() {
              console.log('Send mail client File')
              this.mailTitle = "Draft mail client File" 
              this.dialog = true
              this.mailFileClient = true
            },        
          },
          { 
            title: 'Send mail 2',
            icon: 'mdi-email',
            click() {
              console.log('Send mail client File 2')
            }, 
        
        },
          { 
            title: 'Send mail 3',
            icon: 'mdi-email',
            click() {
              console.log('Send mail client File 3')
            },  
        },
        ],
      }),

      methods: {
        handlerClick(index) {
            this.items[index].click.call(this)           
        },

        sendMail() {

          this.$store.state.loading = true

          var payload = {
            company: this.item.company,
            phase_of_day:this.$store.state.sendMailFileClient.phase_of_day, 
            service_type: this.item.service_type,
            id_project:this.$store.state.sendMailFileClient.id_project, 
            integration_type: this.item.integration_type,
            print_type: this.$store.state.sendMailFileClient.print_type ,
            trained_user: this.$store.state.sendMailFileClient.trained_user,
            property_print: this.$store.state.sendMailFileClient.property_print,
            email: this.$store.state.sendMailFileClient.email,
            reply_to:this.$store.state.sendMailFileClient.reply_to
          } 
      


          this.$store.commit('sendMailFileClient', payload)

        }



      },

      components: {

        "dialog-form-mail": require('@/components/Dialogs/DialogFormMail.vue').default,

      },
    }
  </script>

<style>

</style>