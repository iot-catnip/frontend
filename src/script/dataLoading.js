const axios = require("axios");

export const loadPlug = async function () {
    let resp = await axios({url: '/api/prise/', method: 'GET'});
    return resp.data;
}

export const loadAvgTemperature = async function(){
    let resp = await axios({url: '/api/temperature/avg', method: 'GET'});
    return resp.data;
}

export const loadAvgWatt = async function (){
    let resp = await axios({url: '/api/watt/avg', method: 'GET'});
    return resp.data;
}

export const loadAvgHumidity = async function (){
    let resp = await axios({url: '/api/humidite/avg', method: 'GET'});
    return resp.data;
}

export const loadTemperature = async function (param) {
    let resp = await axios({url: `/api/temperature/${param}`, method: 'GET'});
    let data = resp.data.data
    return data
}

export const loadHumidity = async function (param) {
    let resp = await axios({url: `/api/humidite/${param}`, method: 'GET'});
    let data = resp.data.data
    return data
}

export const loadWatts = async function (param) {
    let resp = await axios({url: `/api/watt/${param}`, method: 'GET'});
    let data = resp.data.watt
    return data
}

export const formatApiData = function (data){
    let dateArray = []
    let dataArray = []
    for (let i = 0; i < data.length; i++) {
        dateArray.push(new Date(data[i].date_mesure).toISOString().slice(0, 16).replace('T', ' '))
        dataArray.push(data[i].valeur)
    }
    return {
        date : dateArray,
        data : dataArray
    }

}