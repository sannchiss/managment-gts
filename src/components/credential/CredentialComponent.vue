<template>
  
    <v-form  ref="form" lazy-validation>

        <v-text-field
        v-model="account.company"
        label="Company"
        :rules="[v => !!v || 'Company is required']"
        ></v-text-field>
        <v-text-field
        v-model="account.rut"
        label="Rut"
        :rules="[v => !!v || 'Rut is required']"
        ></v-text-field>
        <v-text-field
        v-model="account.account_txa"
        label="Account Txa"
        :rules="[v => !!v || 'Account Txa is required']"
        ></v-text-field>
        <v-text-field
        v-model="account.account_gts"
        label="Account Gts"
        :rules="[v => !!v || 'Account Gts is required']"
        ></v-text-field>
   
       
        <v-btn
        color="primary"
        @click="saveAccount"

        :disabled="loading"
        >Submit</v-btn
        >


    </v-form>

</template>

<script>
import { collection,query, getDocs, addDoc, deleteDoc, doc  } from "firebase/firestore"
import db from '@/firebase/index'



export default {


    data() {

        return {

            account: 
                {
                    company: 'COMPANY',
                    rut: '12313213',
                    account_txa: '2313154',
                    account_gts: '1545454'
                }
            ,
            items: [],
            itemsPerPage: 5,
            page: 1,
            search: '',
            arrayJson : [
                {
                    company: 'COMPANY 1 ',
                    rut: '12313213-1',
                    account_txa: '2313154-1',
                    account_gts: '1545454-1'
                },
                 {
                    company: 'COMPANY 2 ',
                    rut: '12313213-2',
                    account_txa: '2313154-2',
                    account_gts: '1545454-2'
                },
               /* {
                    company: 'COMPANY 3 ',
                    rut: '12313213-3',
                    account_txa: '2313154-3',
                    account_gts: '1545454-3'
                },
                {
                    company: 'COMPANY 4 ',
                    rut: '12313213-4',
                    account_txa: '2313154-4',
                    account_gts: '1545454-4'
                },
                {
                    company: 'COMPANY 5 ',
                    rut: '12313213-5',
                    account_txa: '2313154-5',
                    account_gts: '1545454-5'
                },
                {
                    company: 'COMPANY 6 ',
                    rut: '12313213-6',
                    account_txa: '2313154-6',
                    account_gts: '1545454-6'
                },
                {
                    company: 'COMPANY 7 ',
                    rut: '12313213-7',
                    account_txa: '2313154-7',
                    account_gts: '1545454-7'
                },
                {
                    company: 'COMPANY 8 ',
                    rut: '12313213-8',
                    account_txa: '2313154-8',
                    account_gts: '1545454-8'
                },
                {
                    company: 'COMPANY 9 ',
                    rut: '12313213-9',
                    account_txa: '2313154-9',
                    account_gts: '1545454-9'
                },
                {
                    company: 'COMPANY 10 ',
                    rut: '12313213-10',
                    account_txa: '2313154-10',
                    account_gts: '1545454-10'
                }, */
             ],
             success: false,
             counter: 1,
                loading: false,

             
             

            


        }


    },
    methods: {

        async saveAccount() {

            // get all docRef
            /* const q = query(collection(db, "account"));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            }); */
            
            

             // await deleteDoc(doc(db, "account", "1tdSlCiMSCSzODDeTHwp"));


/* 
            
            this.error = null
            this.success = false
            try {
                // show loading
                this.$store.state.progress.show = true
                this.percent = this.arrayJson.length

                this.arrayJson.forEach(async (doc) => {
        
                    const docRef = await addDoc(collection(db, "accounts"), doc)
                   
                   console.log("Document written with ID: ",docRef.id) 

                 
                  if(this.arrayJson.length == this.counter) {

                     //this.$store.state.progress.show = false

                     console.log("informacion guardada")
                 } 

                    
                     this.counter = this.counter + 1


                })

                console.log("counter: ", this.arrayJson.length)

            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
                console.log("final")
            } 
                 */    

         
          const querySnapshot = await getDocs(collection(db, "accounts"))
         querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            });    


/* 
        const docRef = await addDoc(collection(db, "account"), arrayJson)
        console.log("Document written with ID: ",docRef.id)  */


       

        },

    },


}
</script>

<style>

</style>