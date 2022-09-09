<template>
    <v-snackbar  shaped v-model="$store.state.snackbar.show">
        {{ $store.state.snackbar.text }}

        <template v-slot:action="{ attrs }">
            <v-btn text :color="$store.state.snackbar.color" v-bind="attrs" @click="$store.commit('hideSnarkbar')">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>


<style lang="sass">

    div.v-snack:not(.v-snack--absolute) 
      height: 100%


</style>