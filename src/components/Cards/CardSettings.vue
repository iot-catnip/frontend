<template>
  <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0"
  >
    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center flex justify-between">
        <h6 class="text-gray-800 text-xl font-bold">Parramettrage</h6>
        <button
            class="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button" v-on:click="updateSettings"
        >
          Sauvgarder
        </button>
      </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
      <form>
        <h6 class="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
          Parametttres des prises
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
              >
                Temps Entre Chaque Meusures (ms)
              </label>
              <input
                  type="number"
                  class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  value="60000"
                  min="60000"
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
              >
                Nombre maximum de requette simultanée
              </label>
              <input
                  type="number"
                  class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  value="10"
                  min="3"
              />
            </div>
          </div>
        </div>

        <hr class="mt-6 border-b-1 border-gray-400"/>

        <h6 class="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
          Noms des prise
        </h6>
        <div class="flex flex-wrap">
          <table class="items-center w-full bg-transparent border-collapse">
            <thead>
            <tr>
              <th
                  class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"
              >
                Adresse Mac
              </th>
              <th
                  class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"
              >
                Nom
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="card of cards" :key="card.nom">
              <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
              >{{ card.mac }}</th>
              <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left"
              >
                <input
                    type="text"
                    class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    :value="card.nom">
              </th>
            </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {loadPlug} from "@/script/dataLoading";

export default {
  mounted: async function () {
    this.cards = await loadPlug();
  },
  props: {
    cards: {}
  },
  methods:{
    updateSettings:function (){
      console.log(this.cards)
    }
  }
}
</script>