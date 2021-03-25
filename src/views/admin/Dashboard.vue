<template>
  <div>
    <div class="flex flex-wrap">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <card-line-chart />
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <card-line-watts/>
      </div>
    </div>
    <div class="flex flex-wrap mt-4">
        <card-social-traffic />
    </div>
  </div>
</template>
<script>
import CardLineChart from "@/components/Cards/CardTempHumidityLineChart";
import CardLineWatts from "@/components/Cards/CardWattLineChart";
import CardSocialTraffic from "@/components/Cards/CardSocialTraffic.vue";
export default {
  name: "dashboard-page",
  components: {
    CardLineChart,
    CardLineWatts,
    CardSocialTraffic,
  },
};
</script>
