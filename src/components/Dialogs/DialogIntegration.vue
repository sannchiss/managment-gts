<template>
<v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
                <v-icon>mdi-pen-plus</v-icon>
                CLIENT ADVANCED
            </v-btn>
        </template>
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Client Settings {{ item.account_gts }}</v-toolbar-title>
                <v-spacer></v-spacer>                
            </v-toolbar>

            <v-card>
                <v-card-title>
                    <span class="text-h5">Advance Integration</span>
                </v-card-title>
                <v-card-text>
                    <v-container>

                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-date-picker v-model="dates" range></v-date-picker>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="dateRangeText" label="Date range" prepend-icon="mdi-calendar" readonly>
                                </v-text-field>
                                model: {{ dates }}

                                <v-spacer></v-spacer>

                                <v-divider inset></v-divider>

                                <v-card>
                                    <v-textarea name="input-7-1" v-model="comment" filled label="Comment" auto-grow></v-textarea>
                                    <v-slider 
                                    v-model="$store.state.sliderInt.val" 
                                    :label="$store.state.sliderInt.label" 
                                    :thumb-color="$store.state.sliderInt.color"
                                    :rules="rules"
                                    hint="The client phase initialization"
                                    persistent-hint 
                                    thumb-label="always"
                                    ticks
                                    >
                                    </v-slider>
                                </v-card>

                                <v-col cols="pl-15" sm="0">
                                    <div class="text-center">
                                        <v-btn class="ma-9" :loading="$store.state.loading" :disabled="loading" color="primary" @click="saveAdvance">
                                            <v-icon darken-1 left>mdi-content-save-move</v-icon>
                                            Save advance
                                        </v-btn>
                                    </div>
                                </v-col>

                            </v-col>

                        </v-row>

                    </v-container>

                </v-card-text>

            </v-card>

            <v-divider></v-divider>

            <v-card>
                <v-card-title>
                    <span class="text-h5">Historical Integration</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>

                            <content-history-integration :idInt="item.account_gts"/>

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
        },       
        
    },
    data() {
        return {
            loading: false,
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
            dates: [],
            comment: '',
            
            rules: [
            v => v <= 90 || 'The client has been integrated',
            v => v >= 10 || 'The client phase initialization',  
            v => v >= 90 || 'The client fase integration',        
            
            ],

        }
    },
    methods: {
        closeDialog() {
            this.dialog = false
            this.$store.commit('getClientFile')
        },
        

        saveAdvance() {

            this.$store.state.loading = true

            const payload = {
                account_gts: this.item.account_gts,
                dates: this.dates,
                comment: this.comment,
                progress: this.$store.state.sliderInt.val,                
            }
             this.$store.dispatch("saveAdvanceIntegration", payload)
            
        },

       
    },
    computed: {
        dateRangeText() {
            return this.dates.join(' ~ ')
        },
    },
    components: {
        "content-history-integration": require("@/components/Dialogs/contents/historyIntegration.vue").default,
    },
    

}
</script>

<style>

</style>
