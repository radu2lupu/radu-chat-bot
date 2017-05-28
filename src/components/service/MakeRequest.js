import React from 'react';
import axios from 'axios';

function makeRequest(url) {
  let data;
  axios.get(url)
    .then(response => { 
      data = response.data;
    })
    .catch(error => {
      console.log("Error fetching data", error);
    });
  return data;
};

export default makeRequest;