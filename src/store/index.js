import Vue from "vue"
import Vuex, { Store } from "vuex"
import Localbase from "localbase"

let dblocal = new Localbase("db");

// desahabilitar resgistros en consola
dblocal.config.debug = false

import {
  collection,
  query,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import db from "@/firebase/index";
import { async } from "@firebase/util";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    file: [],
    data: [],
    loading: false,
    flat_save: false,
    dialog: {
      show: false,
      deleteAccount: false,
      dialogTitle : "Delete all data",
      dialogMessage: "Are you sure you want to delete all data?",
      

    },
    sheet:false,
    company: [],
    accountByRef: [],
    keys: ["account_txa", "rut", "company", "account_gts"],
    counter: 1,
    snackbar: {
      show: false,
      text: "",
      color: "",
    },
  },
  getters: {},
  mutations: {
    async getListAccount(state) {

/**
 * Get data from accounts collection in localbase
 */
      try {
        let accounts = await dblocal.collection('accounts')
          .orderBy('id')
          .get()

        accounts.forEach(element => {
          state.company.push(element)
        });

      }
      catch(error) {
        console.log('error: ', error)
      }


     /*  dblocal.collection('accounts').get().then(accounts => {
        console.log(accounts)
        // convertir a json
        var json = JSON.stringify(accounts);
        // convertir a objeto
        var dataObj = JSON.parse(json);
        // agregar a state     
        
        console.log(dataObj)
        state.company.push(dataObj);
      })  */

       /* const querySnapshot = await getDocs(collection(db, "accounts"));
      querySnapshot.forEach((doc) => {
        state.company.push(doc.data());
         console.log( doc.data());
      });  */ 
    },

    async addListCompany(state, data) {

/**
 * Delete all data in localbase
 */
     /*     dblocal.delete()
       .then(response => {
         console.log('Database deleted, now do something.')
       })
       .catch(error => {
         console.log('There was an error, do something else.')
       })  */
 


      // convert array to json
      var json = JSON.stringify(data);

      var dataObj = JSON.parse(json);


       try {
        
        
          dataObj.forEach(element => {

            dblocal.collection('accounts').add({
              id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
              account_txa: element.account_txa,
              rut: element.rut,
              company: element.company,
              account_gts: element.account_gts
            })

            .then(response => {
              //console.log('Update successful, now do something.')
              
            })
            .catch(error => {
              console.log('There was an error, do something else.')
            })

            state.company.push(element)


          if (dataObj.length === state.counter) {

            console.log("termino")
            state.flat_save = false
            state.loading = false
            state.counter = 0     

          }
          state.counter++;
          
          console.log("counter: ", state.counter);
        })


      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },

    onFileChange(state, file) {

      //state.file = file
      //state.loading = true 
      
    if (file) {

        console.log("file esta")
        state.flat_save = true
        const reader = new FileReader()

        reader.onload = e => {

          var contents = e.target.result
          var lines = contents.split('\r\n')

          for (var i = 0; i < lines.length; i++) {
            var line = lines[i]
            var parts = line.split(';')
            if (line.length > 0) {

              var obj = {
                account_txa: parts[0],
                rut: parts[1],
                company: parts[2],
                account_gts: parts[3],
              }

              state.data.push(obj)
            }
          }

        }

        reader.readAsText(file) 

      } else if (!file) {

        // clear file
        state.file = []
        state.flat_save = false
        
      } 


    },

    deleteFile(state) {
      state.company.splice(0, state.company.length)
    },


    copyToClipboard(state, data) {
      const el = document.createElement("textarea");
      el.value = data;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      state.snackbar.show = true;
      state.snackbar.text = "Copiado al portapapeles";
      state.snackbar.color = "success";
    },
  


    showSnackbar(state, text, color) {
      console.log("showSnackbar");
      let timeout = 0;

      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 100;
      }

      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
        state.snackbar.color = color
      }, timeout);
    },
    // funcion para ocultar snackbar
    hideSnarkbar(state) {
      state.snackbar.show = false
    },
  },

  actions: {
    getListAccount({ commit }) {
      commit("getListAccount")
      // show snackbar
      commit("showSnackbar", "Lista de cuentas cargada", "success")
    },
    onFileChange({commit}, file) {
      commit("onFileChange", file)
    },
    addListCompany({ commit }, data) {
      commit("addListCompany", data)
      // show snackbar
      commit("showSnackbar", "Informacion guardada", "success")
    },
    deleteFile({ commit }) {


       dblocal.collection('accounts')
        .delete()
        .then(response => {
          commit("deleteFile")
          // show snackbar
          commit("showSnackbar", "Archivo eliminado", "success")

          console.log('Collection deleted, now do something.')
        })
        .catch(error => {
          console.log('There was an error, do something else')
        })
 


    },

    // function copy to clipboard
    copyToClipboard({ commit }, text) {
      commit("copyToClipboard", text)
      // show snackbar
      commit("showSnackbar", "Copiado al portapapeles", "success")
    },

    error({ commit }, text) {
      commit("showSnackbar", text, "error")
    }
  },

  getters: {
    //getCompany: state => state.company,
  
  },



  modules: {},
})
