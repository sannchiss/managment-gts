<template>
    <v-row >
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    <v-icon>mdi-file-document</v-icon>
                    Add client file
                </v-btn>
            </template>
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Settings</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text @click="saveInfo">
                            Save
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <v-divider></v-divider>

                <v-card>
                    <v-card-title>
                        <span class="text-h5">Client Profile</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col class="d-flex" cols="5" sm="2">
                                    <v-select v-model="serviceType" :items="['B2B', 'B2C']" label="Service Type"></v-select>
                                </v-col>
                                <v-col cols="12" sm="5" md="4">
                                    <v-select v-model="integrationType"
                                        :items="['MANUAL GTS', 'MASIVA GTS', 'MANUAL GTS', 'MASIVA GTS', 'WEB SERVICE', 'WEB SERVICE FAME']"
                                        label="Integration Type"></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                                        transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="date" label="Date registration"
                                                prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on">
                                            </v-text-field>
                                        </template>
                                        <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                                    </v-menu>

                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" lg="10">
                                    <v-textarea v-model="infoClient" name="input-7-1" filled label="Copy and paste file client" auto-grow>
                                    </v-textarea>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-card>
        </v-dialog>
    </v-row>
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
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
            serviceType: null,
            integrationType: null,
            infoClient: null,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            
        }
    },

    methods: {
        saveInfo() {

            console.log(this.item)
            
             if(this.serviceType == null || this.integrationType == null || this.date == null){
                this.$store.dispatch('showSnackbar',  {
                    text: 'Please fill all fields',
                    color: 'red',
                })
            }else{
                let data = {
                    account_txa: this.item.account_txa,
                    rut: this.item.rut,
                    company: this.item.company,
                    account_gts: this.item.account_gts,
                    service_type: this.serviceType,
                    integration_type: this.integrationType,
                    info_client: this.infoClient,
                    date: this.date,
                }

                this.$store.dispatch('addClientFile', data)
                

                
            } 

            
        }
    }


}
</script>

<style>
</style>