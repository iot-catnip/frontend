<template>
  <div
      class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
  >
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
            <h6 class="uppercase text-gray-500 mb-1 text-xs font-semibold">
              Temps réel
            </h6>
            <h2 class="text-gray-800 text-xl font-semibold">
              Consomation
            </h2>
        </div>
      </div>
    </div>
    <div class="p-4 flex-auto">
      <div class="relative h-350-px">
        <canvas id="line-chart-real-watt"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "chart.js";
import {formatApiData, loadWatts} from "@/script/dataLoading";

export default {
  mounted: async function () {
    await this.initGraph();
    this.timer = setInterval(() => {
      this.updateGraph()
    }, 1000)
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods:{
    initGraph:async function () {
      const formattedWatt = formatApiData(await loadWatts('last'))
      this.$nextTick(function () {
        var config = {
          type: "bar",
          data: {
            labels: formattedWatt.date,
            datasets: [
              {
                label: 'Consomation (W)',
                backgroundColor: "#ed8936",
                borderColor: "#ed8936",
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
        const ctx = document.getElementById("line-chart-real-watt").getContext("2d");
        window.wattRealTimeLine = new Chart(ctx, config);
      });
    },
    updateGraph: async function(){
      const formattedWatt = formatApiData(await loadWatts('last'))
      if (!window.wattRealTimeLine.data.labels.includes(formattedWatt.date[0])) {
        window.wattRealTimeLine.data.datasets[0].data.push(formattedWatt.data[0]);
        window.wattRealTimeLine.data.labels.push(formattedWatt.date[0]);
        window.wattRealTimeLine.update()
      }
    }

  }
};
</script>
