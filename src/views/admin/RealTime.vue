<template>
    <div class="flex flex-wrap mb-10">
      <div class="w-full lg:w-6/12 xl:w-4/12 px-4">
        <real-time-temp/>
      </div>
      <div class="w-full lg:w-6/12 xl:w-4/12 px-4">
        <real-time-humidity/>
      </div>
      <div class="w-full lg:w-6/12 xl:w-4/12 px-4">
        <real-time-watt/>
      </div>
    </div>
</template>
<script>
import RealTimeWatt from "@/components/Cards/CardWattRealTimeLineChart"
import RealTimeTemp from "@/components/Cards/CardTempRealTimeLineChart"
import RealTimeHumidity from "@/components/Cards/CardHumidityRealTimeLineChart"

export default {
  components: {
    RealTimeWatt,
    RealTimeTemp,
    RealTimeHumidity
  },
};
</script>
