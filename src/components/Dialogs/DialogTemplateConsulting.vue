<template>
  <v-row justify="center">

    <v-dialog
    :value="true"
    persistent max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{ title }} 
         </v-card-title>

        <v-card-text>
         {{ message }} 
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="$emit('close')"
          >
            No
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="$emit('emitDialog')"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: ['advanced', 'title', 'message'],
    data () {
      return {
        //dialog: false,
      }
    }
  }
</script>
