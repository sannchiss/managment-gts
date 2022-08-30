<template>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon                
                @click="copyToClipboard(item)"
            >mdi-content-copy</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-share-variant</v-icon>
        </v-btn>
    </v-card-actions>

</template>

<script>
export default {

    props: {
        item: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
           // item: {}
        }
    },
    methods: {
        copyToClipboard(item) {
            var el = item.company+"\n"+item.rut+"\n"+item.account_txa+"\n"+item.account_gts
             this.$store.dispatch('copyToClipboard', el)
          
        }
    }

}
</script>

<style>
</style>