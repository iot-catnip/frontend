<template>
  <!-- Header -->
  <div class="relative bg-green-600 md:pt-32 pb-32 pt-12">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <!-- Card stats -->
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="Température"
              :statTitle="temperature.avg"
              :statArrow="temperature.arrow"
              :statPercent="temperature.percent"
              statPercentColor="text-green-500"
              statDescripiron="Since last month"
              statIconName="far fa-chart-bar"
              statIconColor="bg-red-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="Humidité"
              :statTitle="humidity.avg"
              :statArrow="humidity.arrow"
              :statPercent="humidity.percent"
              statPercentColor="text-red-500"
              statDescripiron="Since last week"
              statIconName="fas fa-chart-pie"
              statIconColor="bg-orange-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="Consommation"
              :statTitle="consummation.avg"
              :statArrow="consummation.arrow"
              :statPercent="consummation.percent"
              statPercentColor="text-orange-500"
              statDescripiron="Since yesterday"
              statIconName="fas fa-users"
              statIconColor="bg-pink-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="Nombre de prise"
              :statTitle="plug.nb"
              statIconName="fas fa-percent"
              statIconColor="bg-green-500"
              :sub-stat="false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardStats from "@/components/Cards/CardStats.vue";

export default {
  name: "header-stats",
  props:{
    temperature:{
      avg: 0,
      percent:0,
      arrow:"up"
    },
    humidity:{
      avg: 0,
      lastPeriod:0,
      arrow:"up"
    },
    consummation:{
      avg: 0,
      lastPeriod:0,
      arrow:"up"
    },
    plug:{
      nb:1,
    }
  },
  data() {
  },
  components: {
    CardStats,
  }
};
</script>
