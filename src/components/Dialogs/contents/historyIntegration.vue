<template>

  <v-card max-width="auto" class="mx-auto">
    <v-card-title class="blue darken-2">
      <span class="text-h5 white--text">Item History</span>
    </v-card-title>
    <v-spacer></v-spacer>
    <v-list flat subheader three-line v-if="advances.length > 0">
      <v-list-item v-for="advance in advances" :key="advance.id" three-line>
        <template v-slot:default="">
          <v-list-item-action>
          
            
            <v-chip :color="getColor(advance.progress)" dark >

             <v-icon v-if="completed" >
              mdi-star-check
            </v-icon>
            <v-icon v-else>
              mdi-star-outline
            </v-icon>

              {{ advance.progress }}
              %
            </v-chip>

          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{advance.dates[0]}} - {{advance.dates[1]}}</v-list-item-title>
            <v-list-item-subtitle>{{advance.comment}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>            
            <menu-history-integration :advanced="advance" />
          </v-list-item-action>

        </template>
      </v-list-item>


    </v-list>

    <empty-list v-else />


  </v-card>

</template>

<script>
export default {
  props: {
    idInt: {
      type: String,
      required: true
    }
  },
  data: () => ({

    completed: false,

  }),
  computed: {

    advances() {
      return this.$store.getters.getAdvances
    }

  },

  methods: {
    getColor(advance) {

      console.log(advance)
       if (advance > 0 && advance <= 50) {
        this.completed = false
        return 'green'
       }
      else if (advance > 50 && advance <= 80) {
        this.completed = false
        return 'orange'
      } 
      else if (advance > 80 && advance <=99 ) {
        this.completed = false
        return 'red'
      }
        
       else if (advance == 100) {
        this.completed = true
        return 'blue'
      }
    }
  },
  mounted() {

    this.$store.dispatch('getHistoryIntegration', this.idInt)
  },
  errorCaptured(err, vm, info) {
    console.log(err)
  },
  components: {
    // "dialog-consulting": require('@/components/Dialogs/DialogTemplateConsulting.vue').default,
    "menu-history-integration": require('@/components/Dialogs/contents/menuHistoryIntegration.vue').default,
    "empty-list": require('@/components/Dialogs/alerts/EmptyList.vue').default,
  },



}
</script>

<style>

</style>