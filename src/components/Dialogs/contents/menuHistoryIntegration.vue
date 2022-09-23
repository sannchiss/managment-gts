<template>

    <div>

        <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="(item, index) in items" :key="index" @click="handlerClick(index)">
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>  
        </v-menu>
        <dialog-consulting v-if="dialog.delete" @emitDialog = "deleteHistory" :advanced="advanced" :title="dialog.dialogTitle"
                    :message="dialog.dialogMessage" @close = "dialog.delete = false" />

    </div>

</template>

<script>
export default {

    props: ['advanced'],


    data: () => ({

        dialog: {
            dialogTitle: 'Delete History',
            dialogMessage: 'Are you sure you want to delete the history?',
            delete: false,
        },
        items: [
            {
                title: "Edit",
                icon: "mdi-pencil",
                click() {
                    console.log("Edit")
                },
            },
            {
                title: "Delete",
                icon: "mdi-delete",
                // add click event
                click() {

                    this.dialog.delete = true

                    console.log(this.dialog.delete)

                },
            },
           

        ],



    }),

    methods: {
        handlerClick(index) {
            this.items[index].click.call(this)
        },

        deleteHistory: function () {
    
            console.log(this.advanced.id)
             this.$store.dispatch('deleteHistory', 
             {
                id: this.advanced.id,
                account_gts: this.advanced.account_gts

             }
             )
             this.$emit('close')


    },
    },

    components: {
       "dialog-consulting": require('@/components/Dialogs/DialogTemplateConsulting.vue').default,
    },




}
</script>

<style>

</style>