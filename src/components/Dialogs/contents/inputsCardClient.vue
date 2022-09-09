<template>

  <v-container fluid>
    <v-row>
      <v-col cols="12" >
        <v-textarea
        v-model="itemInfo"
        name="input-7-1"
        filled
        auto-grow
        readonly
      >   
    </v-textarea>
      </v-col>
    </v-row>
  </v-container>



</template>

<script>
export default {
  props:{
    itemInfo: {
      type: String
    }

  },

  data() {
    return {

    

    }
  }


  
  
}
</script>

<style>

</style>