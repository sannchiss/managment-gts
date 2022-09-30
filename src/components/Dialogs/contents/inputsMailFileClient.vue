<template>

    <v-container>

        <v-col class="d-flex" cols="8" md="8" sm="8">

            <!--field email-->
            <v-text-field v-model="$store.state.sendMailFileClient.email" :rules="sendEmailRules" label="Email" required>
                <v-icon slot="prepend" color="red">
                    mdi-account
                </v-icon>

            </v-text-field>


        </v-col>

        <v-col class="d-flex" cols="8" md="8" sm="8">

            <v-text-field v-model="$store.state.sendMailFileClient.reply_to" :rules="replyToRules" label="Copy email">
                <v-icon slot="prepend" color="red">
                    mdi-account-multiple
                </v-icon>

            </v-text-field>

        </v-col>

        <v-divider>
            inset
        </v-divider>

        <v-row>

            <v-col class="d-flex" cols="12" md="3" sm="5">

                <v-text-field v-model="$store.state.sendMailFileClient.id_project" label="Id project">
                    <v-icon slot="prepend" color="red">
                        mdi-numeric
                    </v-icon>
                </v-text-field>

            </v-col>
            <v-col class="d-flex" cols="12" md="3" sm="6">
                <!--save select selection in variable-->
                <v-select 
                :v-model="$store.state.sendMailFileClient.phase_of_day" 
                label="Phase of day"
                attach
                chips
                :items="phases"
                v-on:change="$store.state.sendMailFileClient.phase_of_day = $event"
                >
                    <v-icon slot="prepend" color="red">
                        mdi-book-clock
                    </v-icon>
                   
                </v-select>
                
            </v-col>

            <v-col class="d-flex" cols="12" md="3" sm="6">
                <v-select 
                :v-model="$store.state.sendMailFileClient.print_type" 
                :items="print_type" 
                label="Print Type"
                attach
                chips
                v-on:change="$store.state.sendMailFileClient.print_type = $event"
                
                >
                    <v-icon slot="prepend" color="red">
                        mdi-printer-check
                    </v-icon>
                </v-select>
            </v-col>

            <v-col class="d-flex" cols="12" md="3" sm="6">
                <v-select 
                :v-model="$store.state.sendMailFileClient.property_print" 
                :items="property_print" 
                label="Print Type"
                attach
                chips
                v-on:change="$store.state.sendMailFileClient.property_print = $event"
                >
                    <v-icon slot="prepend" color="red">
                        mdi-file-find
                    </v-icon>
                </v-select>
            </v-col>

        </v-row>

        <v-row>

            <v-col class="d-flex" cols="8" md="8" sm="8">
                <v-textarea class="mx-2" v-model="$store.state.sendMailFileClient.trained_user" label="Trained Users" rows="1" auto-grow prepend-icon="mdi-account-multiple-plus" color="red"></v-textarea>
            </v-col>

        </v-row>

    </v-container>

</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => ({})
           
        }
    },
    data: () => ({
        sendEmailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        replyToRules: [
            v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        id_project: '',
        phases: [
                'día',
                'tarde',
                'noche',
        ],
        print_type: ['PDF', 'TERMICA'],
        trained_user: '',
        property_print: ['FedEx', 'Cliente'],

    }),

    methods: {
        

        onChangeSite: function(e){
        var id = e.target.value;
        var name = e.target.options[e.target.options.selectedIndex].text;
        console.log('id ',id );
        console.log('name ',name );
        },
        getData:() => {
            // get value select phase
            console.log('item', this.$store.state.sendMailFileClient)
        }
    },



}
</script>

<style>

</style>