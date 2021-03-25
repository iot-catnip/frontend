<template>
  <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-800"
  >
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <div class="flex flex-wrap">
            <div class="w-full xl:w-9/12 mb-12 xl:mb-0 px-4">
            <h6 class="uppercase text-gray-200 mb-1 text-xs font-semibold">
              Environment
            </h6>
            <h2 class="text-white text-xl font-semibold">
              Température et Humidité
            </h2>
            </div>
            <div class="w-full xl:w-3/12 px-4">
              <label class="block">
                <span class="uppercase text-gray-200 mb-1 text-xs font-semibold">Période</span>
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
      <!-- Chart -->
      <div class="relative h-350-px">
        <canvas id="line-chart"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "chart.js";
import {formatApiData, loadHumidity, loadTemperature} from "@/script/dataLoading";

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
      const formattedHumidity = formatApiData(await loadHumidity(this.intervalPicker))
      const formattedTemp = formatApiData(await loadTemperature(this.intervalPicker))
      this.$nextTick(function () {
        var config = {
          type: "line",
          data: {
            labels: formattedTemp.date,
            datasets: [
              {
                label: 'Temperature (°C)',
                backgroundColor: "#fff",
                borderColor: "#fff",
                data: formattedTemp.data,
                fill: false,
              },
              {
                label: 'Humidité (%)',
                fill: false,
                backgroundColor: "#4c51bf",
                borderColor: "#4c51bf",
                data: formattedHumidity.data,
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            title: {
              display: false,
              text: "Graphique des températures",
              fontColor: "white",
            },
            legend: {
              labels: {
                fontColor: "white",
              },
              align: "end",
              position: "bottom",
            },
            tooltips: {
              mode: "index",
              intersect: false,
            },
            hover: {
              mode: "nearest",
              intersect: true,
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontColor: "rgba(255,255,255,.7)",
                  },
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: "Month",
                    fontColor: "white",
                  },
                  gridLines: {
                    display: false,
                    borderDash: [2],
                    borderDashOffset: [2],
                    color: "rgba(33, 37, 41, 0.3)",
                    zeroLineColor: "rgba(0, 0, 0, 0)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    fontColor: "rgba(255,255,255,.7)",
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
                    color: "rgba(255, 255, 255, 0.15)",
                    zeroLineColor: "rgba(33, 37, 41, 0)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                  },
                },
              ],
            },
          },
        };
        const ctx = document.getElementById("line-chart").getContext("2d");
        window.myLine = new Chart(ctx, config);
      });
    },
    updateGraph: async function(){
      const formattedHumidity = formatApiData(await loadHumidity(this.intervalPicker))
      const formattedTemp = formatApiData(await loadTemperature(this.intervalPicker))
      window.myLine.data.datasets[0].data = formattedTemp.data;
      window.myLine.data.datasets[1].data = formattedHumidity.data;
      window.myLine.data.labels = formattedTemp.date
      window.myLine.update()
    }

  }
};
</script>
