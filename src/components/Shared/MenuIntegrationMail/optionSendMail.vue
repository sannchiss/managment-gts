<template>

    <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>

        <v-list>
            <v-list-item v-for="(item, i) in items" :key="i" @click="handlerClick(i)">
                <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>

</template>

<script>
    export default {
      data: () => ({
        items: [
          { 
            title: 'Send mail client File',
            icon: 'mdi-email',
            click() {
              console.log('Send mail client File')
            },        
          },
          { 
            title: 'Send mail 2',
            icon: 'mdi-email',
            click() {
              console.log('Send mail client File 2')
            }, 
        
        },
          { 
            title: 'Send mail 3',
            icon: 'mdi-email',
            click() {
              console.log('Send mail client File 3')
            },  
        },
        ],
      }),

      methods: {
        handlerClick(index) {
            this.items[index].click()            
        },
      },
    }
  </script>

<style>

</style>