const axios = require("axios");

export const prises = async function(){
    let resp = await axios({url: '/api/prises', method: 'GET'});
    return resp;
};