import Vue from "vue"
import Vuex, { Store } from "vuex"
import Localbase from "localbase"

let dblocal = new Localbase("db");

// desahabilitar resgistros en consola
dblocal.config.debug = false

import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  orderBy,
  getDoc
} from "firebase/firestore";
import {db, auth} from "@/firebase/index";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    file: [],
    data: [],
    loading: false,
    flat_save: false,
    dialogFileClient: false,
    dialog: {
      show: false,
      deleteAccount: false,
      dialogTitle: "Delete all data",
      dialogMessage: "Are you sure you want to delete all data?",
    },
    icon: {
      iconAccounDetails: "mdi-card-account-details",
    },
    title: {
      titleForm: "Client Information",
    },

    sheet: false,
    company: [],
    integrations: [],
    keysIntegrations: ["account_txa", "rut", "company", "account_gts", "integration_type", "service_type", "date"],
    isIntegration: false,
    historyIntegration: [],  
    sliderInt: {
      label: '% Advance',      
      val: 0,
      color: 'red'
    },
    maxPorcentaje: [],


    accountByRef: [],
    keys: ["account_txa", "rut", "company", "account_gts"],
    counter: 1,
    snackbar: {
      show: false,
      text: "",
      color: "",
    },

    // Form Advance Integration
    comment: "",
    dates:[],



  },
  mutations: {
    async getListAccount(state) {

      console.log(auth.currentUser);


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
      catch (error) {
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

    /**
     *  get data client_file_gts from GTS
     * 
     */

    async getClientFile(state) {

      state.integrations.splice(0, state.integrations.length)

         // get data authentification firebase
         /*  const auth = getAuth();
          onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              console.log("uid: ", uid)
              // ...
            } else {
              // User is signed out
              // ...
            }
          }); */

        // get data from firebase
        const querySnapshot = await getDocs(collection(db, "client_file_gts"));
        querySnapshot.forEach((doc) => {
          state.integrations.push(doc.data());
          console.log(doc.data());
        });


    },

    async saveAdvanceIntegration(state, payload) {

      state.historyIntegration.splice(0, state.historyIntegration.length)

      const q = query(collection(db, "client_file_gts"), where("account_gts", "==", payload.account_gts));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());

        const colRef = collection(db, "client_file_gts/" + doc.id + "/integrations");
        addDoc(colRef, {
          dates: payload.dates,
          comment: payload.comment,
          progress: payload.progress,
        }).then(response => {

          state.loading = false


        })
          .catch(error => {
            console.log('There was an error, do something else.')
          })

          
          getDocs(colRef).then(response => {
            response.forEach((doc) => {

              // get data from doc
              state.historyIntegration.push({
                id: doc.id,
                account_gts: payload.account_gts,
                dates: doc.data().dates,
                comment: doc.data().comment,
                progress: doc.data().progress,

              })
                
              

            
            })
          }
          )


           // clear text area
           state.comment = ""
           state.dates = []


      })


  




    },

    async getHistoryIntegration(state, idIntegration) {


      state.historyIntegration.splice(0, state.historyIntegration.length)
      state.maxPorcentaje.splice(0, state.maxPorcentaje.length)


       const q = query(collection(db, "client_file_gts"), where("account_gts", "==", idIntegration))


      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {

        // get doc subcollection
        const colRef = collection(db, "client_file_gts/" + doc.id + "/integrations");
        getDocs(colRef).then(response => {

          response.forEach((doc) => {
            // order by date
            state.historyIntegration.push(
              {
                id: doc.id,
                account_gts: idIntegration,
                dates: doc.data().dates,
                comment: doc.data().comment,
                progress: doc.data().progress,
              }
            )



          }
          

          
          )


          state.historyIntegration.forEach(element => {

            state.maxPorcentaje.push(
              
              element.progress
              
              ) 
            
          });

          // get porcentaje max
          state.sliderInt.val = Math.max.apply(Math, state.maxPorcentaje)

          console.log("maxPorcentaje: ", Math.max.apply(Math, state.maxPorcentaje))


        })



      }) 


    },

      


    async deleteHistory(state, {id, account_gts}) {

      // update array historyIntegration
      state.historyIntegration.splice(0, state.historyIntegration.length)

      // delete doc subcollection integrations
      const q = query(collection(db, "client_file_gts"), where("account_gts", "==", account_gts))
      const querySnapshot = await getDocs(q)


      querySnapshot.forEach((doc) => {
          
        const colRef = collection(db, "client_file_gts/" + doc.id + "/integrations")
        getDocs(colRef).then(response => {

          response.forEach((doc) => {
            // delete doc subcollection integrations
            if (doc.id === id) {

               deleteDoc(doc.ref).then(() => {

                // get data from historyIntegration
                getDocs(colRef).then(response => {
                  response.forEach((doc) => {
                    // order by date
                    state.historyIntegration.push(
                      {
                        id: doc.id,
                        account_gts: account_gts,
                        dates: doc.data().dates,
                        comment: doc.data().comment,
                        progress: doc.data().progress,
                      }
                    )
                  })

                  // clear maxPorcentaje
                  state.maxPorcentaje.splice(0, state.maxPorcentaje.length)

                  // llamar function actualizar porcentaje max
                  state.historyIntegration.forEach(element => {
                      
                      state.maxPorcentaje.push(
                        
                        element.progress
                        
                        ) 
                      
                    })

                    console.log("maxPorcentaje: ", Math.max.apply(Math, state.maxPorcentaje))
                    // get porcentaje max
                    state.sliderInt.val = Math.max.apply(Math, state.maxPorcentaje)

                    // clear text area
                    state.comment = ""
                    state.dates = []




              }).catch((error) => {
                console.error("Error removing document: ", error);
              });


               

                console.log("Document successfully deleted!");
              }).catch((error) => {
                console.error("Error removing document: ", error);
              }); 

              
            }
          })
        })
        .catch(error => {
          console.log('There was an error, do something else.')

        })   



  
        }
    
         
  
        
      )
      

     



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



    showSnackbar(state, { text, color }) {
      console.log("text: ", text);

      let timeout = 0;

      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 10000;
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

  /**
   * 
   * ACTIONS
   * 
   */

  actions: {
    getListAccount({ commit }) {
      commit("getListAccount")
      // show snackbar
      commit("showSnackbar", {
        text: "Lista de cuentas cargada",
        color: "green"
      })
    },
    onFileChange({ commit }, file) {
      commit("onFileChange", file)
      
    },
    addListCompany({ commit }, data) {
      commit("addListCompany", data)
      // show snackbar
      commit("showSnackbar", {
        text: "Informacion guardada",
        color: "green"
      })
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

    /**
     * add file client to firebase (client_file_gts)
     */
    async addClientFile({ commit }, data) {

      try {
        const response = await addDoc(collection(db, "client_file_gts"), data)
        console.log("Document written with ID: ", response.id);
        // show snackbar
        commit("showSnackbar",
          {
            text: "Información Guardada",
            color: "green"
          })

      }
      catch (error) {
        console.log('error: ', error)
      }

    },

    /**
     * 
     * @param {*} param0 
     * @param {*} payload 
     * 
     * save advance integration
     */
    saveAdvanceIntegration({ commit }, payload) {

      const addAdvanceIntegration = () => {
        return new Promise((resolve, reject) => {
          resolve(commit("saveAdvanceIntegration", payload))
          reject(new Error('Something went wrong!'))
        })
      }

      // use then() to get the result of the promise
      addAdvanceIntegration().then(() => {
        // show snackbar
        commit("showSnackbar", {
          text: "Información Guardada",
          color: "green"
        })
      }
      )
        .catch(error => {
          commit("showSnackbar", {
            text: "Error al guardar información de avance",
            color: "red"
          })

        })



    },

    /**
     * 
     * @param {*} param0 
     * @param {*} text 
     * 
     * Get data integration advance
     */
    getHistoryIntegration({ commit }, idIntegration) {

      commit("getHistoryIntegration", idIntegration)

    },

    deleteHistory({ commit }, {id, account_gts}) {

        const deleteHistory = () => {
        return new Promise((resolve, reject) => {
          resolve(commit("deleteHistory", {id: id, account_gts: account_gts}))
          reject(new Error('Something went wrong!'))
        })
      } 

      // use then() to get the result of the promise
      deleteHistory().then(() => {
        // show snackbar
        commit("showSnackbar", {
          text: "Información Eliminada",
          color: "green"
        })
      }
      )  
    },


    // function copy to clipboard
    copyToClipboard({ commit }, text) {
      commit("copyToClipboard", text)
      // show snackbar
      commit("showSnackbar", {
        text: "Copiado al portapapeles",
        color: "green"
      })
    },

    showSnackbar({ commit }, { text, color }) {

      commit("showSnackbar", { text, color })
    }
  },

  getters: {

    getAdvances: (state) => {

      // order desc by porcentaje
      const advances = state.historyIntegration.sort((a, b) => {
        return b.progress - a.progress
      })
     
      return advances
    
    }

  



  },



  modules: {},
})
