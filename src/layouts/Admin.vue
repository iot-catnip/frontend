<template>
  <div>
    <sidebar />
    <div class="relative md:ml-64 bg-gray-200">
      <admin-navbar />
      <header-stats
          :temperature="{avg:this.temperature}"
          :humidity="{avg: this.humidity}"
          :consummation="{avg: this.watt}"
          :plug="{nb:plugs.length}"
      />
      <div class="px-4 md:px-10 mx-auto w-full -m-24">
        <router-view
        :name="name"/>
        <footer-admin />
      </div>
    </div>
  </div>
</template>
<script>
import AdminNavbar from "@/components/Navbars/AdminNavbar.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import HeaderStats from "@/components/Headers/HeaderStats.vue";
import FooterAdmin from "@/components/Footers/FooterAdmin.vue";
import {loadAvgHumidity, loadAvgTemperature, loadAvgWatt, loadPlug} from "@/script/dataLoading";

export default {
  name: "admin-layout",
  components: {
    AdminNavbar,
    Sidebar,
    HeaderStats,
    FooterAdmin,
  },
  props:{
    plugs:{
      default: new Array(0),
      type:Array,
    },
    temperature: {
      default: "x.x°C",
      type: String
    },
    watt: {
      default: "x.xW",
      type: String
    },
    humidity: {
      default: "x%",
      type: String
    },
    pageName:{
      type:String
    }
  },
  beforeMount() {
    const plug = loadPlug()
    plug.then((res)=>{
      this.plugs = res
    });
    const avgTemp = loadAvgTemperature()
    avgTemp.then((res)=>{
      this.temperature = `${Math.round(res.avg * 100) / 100}°C`
    })
    const avgWatt = loadAvgWatt()
    avgWatt.then((res)=>{
      this.watt = `${Math.round(res.avg * 100) / 100}W`
    })
    const avgHumidity = loadAvgHumidity()
    avgHumidity.then((res)=>{
      this.humidity = `${Math.round(res.avg * 100) / 100}%`
    })
  }
};
</script>
