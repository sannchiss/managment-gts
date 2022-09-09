<template>

  <v-card max-width="auto" class="mx-auto">
    <v-card-title class="blue darken-2">
      <span class="text-h5 white--text">Item History</span>
    </v-card-title>
    <v-spacer></v-spacer>
    <v-list three-line>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(item, i) in itemInt" :key="i" >
          <v-list-item-icon>
            <v-icon v-text="item.progress"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.dates"></v-list-item-title>
            <v-list-item-subtitle v-html="item.comment"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>

  </v-card>

</template>

<script>
export default {
  props: {
    idInt: {
      type: String,
      required: true
    },
  },
  data: () => ({
    selectedItem: 1,
  }),
  computed: {
    itemInt() {
      return this.$store.state.historyIntegration
    }

  },
  mounted() {
    this.$store.dispatch('getHistoryIntegration', this.idInt)
  },
  errorCaptured(err, vm, info) {
    console.log(err)
  }


}
</script>

<style>

</style>