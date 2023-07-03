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

                            <v-form ref="formAdvance">

                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <v-date-picker v-model="$store.state.dates" range></v-date-picker>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-row class="my-5">

                                            <v-text-field v-model="dateRangeText" :rules="dataRangeRules" label="Date range"
                                                prepend-icon="mdi-calendar" readonly>
                                            </v-text-field>

                                        </v-row>
                                        <v-row>
                                            <v-col cols="5" sm="9">
                                                <v-select v-model="e" :items="itemIntegration" label="Shortcut" multiple
                                                    hint="select one or several items" persistent-hint></v-select>
                                            </v-col>
                                            <v-col cols="5" sm="2">
                                                <div class="text-center">
                                                    <div class="my-2">
                                                        <v-btn color="primary" fab x-small dark @click="addShortcut">
                                                            <v-icon>mdi-tooltip-plus</v-icon>
                                                        </v-btn>
                                                    </div>
                                                </div>

                                            </v-col>


                                        </v-row>
                                        <v-card class="my-8">
                                            <v-textarea name="input-7-1" v-model="$store.state.comment"
                                                :rules="commentRules" filled label="Comment" auto-grow clearable
                                                clear-icon="mdi-close-circle" hint="Enter your comment" persistent-hint>
                                            </v-textarea>
                                            <v-slider v-model="$store.state.sliderInt.val"
                                                :label="$store.state.sliderInt.label"
                                                :thumb-color="$store.state.sliderInt.color" thumb-label="always">
                                            </v-slider>
                                        </v-card>

                                        <v-col cols="pl-15" sm="0">
                                            <div class="text-center">
                                                <v-btn class="ma-9" :loading="$store.state.loading" :disabled="loading"
                                                    color="primary" @click="saveAdvance">
                                                    <v-icon darken-1 left>mdi-content-save-move</v-icon>
                                                    Save advance
                                                </v-btn>
                                            </div>
                                        </v-col>

                                    </v-col>

                                </v-row>

                            </v-form>

                        </v-container>

                    </v-card-text>

                </v-card>

                <v-divider></v-divider>

                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <content-history-integration :idInt="item.account_gts" />
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
            loadingShortCut: false,
            loading: false,
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
            commentRules: [
                v => !!v || 'Required',
                v => v.length < 500 || 'The comment must be less than 100 characters',
                v => v.length > 0 || 'The comment must be greater than 0 characters',
            ],
            dataRangeRules: [
                v => !!v || 'Required',
            ],

            itemIntegration: [
                'Mail enviado al cliente con el para agendar video llamada',
                'Se agendo video llamada con el cliente',
                'Cliente no contesta llamada',
                'Cliente no contestó video llamada / no se pudo conectar',
                'Cliente integrado, se enviaron las credenciales GTS y la ficha de integración',
                'Cliente integrado por medio de los Web Services',
                'Se activó el servicio de notificaciones E-commerce',
                'Se configuró fichero de carga masiva',
                'Se solicitó el ticket en apoyo para aprobación de usuarios',
                'Se hizo asistencia remota para la instalación de impresora termica',
                'Cliente en proceso de integración por medio de los Web Services',
                'No es integración GTS',
                'Stand by',
                'Cliente por conector Woocommerce',
                'Cliente por conector Shopify',
                'Cliente por conector Magento',
                'Cliente por conector Prestashop',
                'Cliente por conector Bigcommerce',
            ],
            e: [],

        }
    },
    methods: {
        closeDialog() {
            this.dialog = false
            this.$store.commit('getClientFile')
        },

        addShortcut() {

            // add text to comment
            this.$store.state.comment = this.e + '\n'


        },

        saveAdvance() {

            if (this.$refs.formAdvance.validate()) {


                this.$store.state.loading = true

                const payload = {
                    account_gts: this.item.account_gts,
                    dates: this.$store.state.dates,
                    comment: this.$store.state.comment,
                    progress: this.$store.state.sliderInt.val,
                }
                this.$store.dispatch("saveAdvanceIntegration", payload)
                    .then(() => {
                        /* this.$store.state.loading = false
                        this.dialog = false
                        this.$store.commit('getClientFile') */
                    })


            }


        },


    },
    computed: {
        dateRangeText() {
            return this.$store.state.dates.join(' ~ ')
        },
    },
    components: {
        "content-history-integration": require("@/components/Dialogs/contents/historyIntegration.vue").default,
    },


}
</script>

<style></style>
