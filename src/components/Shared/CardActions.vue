<template>

      <v-card-actions>

        <div v-if=isIntegration>
           <dialog-integration :item="item" :isIntegration=isIntegration />
        </div>
        <div v-else>
           <dialog-client-file :item="item" />
        </div>

        <v-spacer></v-spacer>

        <v-btn icon
        color="white"
        >
            <v-icon                
                @click="copyToClipboard(item)"
            >mdi-content-copy</v-icon>
        </v-btn>
        
        <dialog-form 
        v-if="isIntegration"  
        :item=item 
        :title="$store.state.title.titleForm"
        :isInfoClient="isInfoClient"  
        />

    </v-card-actions>


</template>

<script>
export default {

    props: {
        item: {
            type: Object,
            required: true
        },
        isIntegration: {
            type: Boolean,
            default: false
        }, 
    },
    data() {
        return {
           // item: {}
           isInfoClient: true,
        }
    },
    methods: {
        copyToClipboard(item) {
            var el = item.company+"\n"+item.rut+"\n"+item.account_txa+"\n"+item.account_gts
             this.$store.dispatch('copyToClipboard', el)
          
        }
    },
    components: {
    "dialog-client-file": require('@/components/Dialogs/DialogClientFile.vue').default,
    "dialog-integration": require('@/components/Dialogs/DialogIntegration.vue').default,
    "dialog-form": require('@/components/Dialogs/DialogForm.vue').default,
    },
}
</script>

<style>
</style>