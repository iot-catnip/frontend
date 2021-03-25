<template>
  <div
      class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
  >
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <div class="flex flex-wrap">
            <div class="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
            <h6 class="uppercase text-gray-500 mb-1 text-xs font-semibold">
              Serveurs
            </h6>
            <h2 class="text-gray-800 text-xl font-semibold">
              Consomation
            </h2>
            </div>
            <div class="w-full xl:w-6/12 px-4">
              <label class="block">
                <span class="uppercase text-gray-500 mb-1 text-xs font-semibold">Période</span>
                <select v-model="intervalPicker" v-on:change="updateGraph" class="form-select block w-full mt-1">
                  <option value="20m">20 Minutes</option>
                  <option value="1h">1 Heure</option>
                  <option value="5h">5 Heures</option>
                  <option value="1j">1 Jour</option>
                  <option value="1w">1 Semaine</option>
                  <option value="1m">1 Mois</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-4 flex-auto">
      <div class="relative h-350-px">
        <canvas id="line-chart-watt"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "chart.js";
import {formatApiData, loadWatts} from "@/script/dataLoading";

export default {
  props:{
    intervalPicker:{
      type: String,
      default:'20m'
    }
  },
  mounted: async function () {
    await this.initGraph();
    this.timer = setInterval(() => {
      this.updateGraph()
    }, 60000)
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods:{
    initGraph:async function () {
      const formattedWatt = formatApiData(await loadWatts(this.intervalPicker))
      this.$nextTick(function () {
        var config = {
          type: "line",
          data: {
            labels: formattedWatt.date,
            datasets: [
              {
                label: 'Consomation (W)',
                backgroundColor: "#ed64a6",
                borderColor: "#ed64a6",
                data: formattedWatt.data,
                fill: false,
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            title: {
              display: false,
              text: "Graphique de Consomation",
            },
            tooltips: {
              mode: "index",
              intersect: false,
            },
            hover: {
              mode: "nearest",
              intersect: true,
            },
            legend: {
              labels: {
                fontColor: "rgba(0,0,0,.4)",
              },
              align: "end",
              position: "bottom",
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontColor: "rgb(160,174,191)",
                  },
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: "Month",
                  },
                  gridLines: {
                    display: false,
                    borderDash: [2],
                    borderDashOffset: [2],
                    color: "rgba(33, 37, 41, 0.3)",
                    zeroLineColor: "rgba(33, 37, 41, 0.3)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    fontColor: "rgb(160,174,191)",
                  },
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: "Value",
                    fontColor: "white",
                  },
                  gridLines: {
                    borderDash: [3],
                    borderDashOffset: [3],
                    drawBorder: false,
                    color: "rgba(33, 37, 41, 0.2)",
                    zeroLineColor: "rgba(33, 37, 41, 0.15)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              ],
            },
          },
        };
        const ctx = document.getElementById("line-chart-watt").getContext("2d");
        window.wattLine = new Chart(ctx, config);
      });
    },
    updateGraph: async function(){
      const formattedWatt = formatApiData(await loadWatts(this.intervalPicker))
      window.wattLine.data.datasets[0].data = formattedWatt.data;
      window.wattLine.data.labels = formattedWatt.date
      window.wattLine.update()
    }

  }
};
</script>
