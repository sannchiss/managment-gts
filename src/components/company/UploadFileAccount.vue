<template>

  <v-container fluid class="grey lighten-5">

    <v-row>

      <v-col md="5">

        <v-file-input v-model="$store.state.file" prepend-icon="mdi-paperclip" accept="txt/*" label="File account Txa" show-size
          @change="onFileChange">
        </v-file-input>

      </v-col>

      <v-col md="2">

        <v-btn :loading="$store.state.loading" :disabled="!$store.state.flat_save" color="blue-grey"
          class="ma-2 white--text" fab @click="saveFile">
          <v-icon>
            mdi-cloud-upload
          </v-icon>
        </v-btn>

      </v-col>

      <v-col md="4">
        <v-btn color="error" class="white--text" @click.stop="dialog.delete = true"
          :disabled="$store.state.company.length === 0">
          Delete Accounts
          <v-icon dark>
            mdi-delete-alert
          </v-icon>
        </v-btn>

      </v-col>

    </v-row>

    <dialog-consulting 
    v-if="dialog.delete" 
    @emitDialog="deleteFile" 
    :title="dialog.dialogTitle"
    :message="dialog.dialogMessage"
    @close = "dialog.delete = false" 
    />

  </v-container>


</template> 

<script>


export default {

  data: () => ({

    dialog: {
            dialogTitle: 'Delete all accounts',
            dialogMessage: 'Are you sure you want to delete all accounts?',
            delete: false,
        },

  }),

  methods: {

    saveFile: function () {

      if (this.$store.state.data.length > 0) {


        this.$store.state.loading = true
        this.$store.dispatch("addListCompany", this.$store.state.data)


      }
      else {

        this.$store.dispatch("error", "File is empty")

      }


    },

    onFileChange: function (file) {

      this.$store.dispatch("onFileChange", file)

    },
    deleteFile: function () {
      
      this.$store.dispatch("deleteFile")

      this.dialog.delete = false
    }



  },
  components: {
    "dialog-consulting": require('@/components/Dialogs/DialogTemplateConsulting.vue').default,
  },

}
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
</style>