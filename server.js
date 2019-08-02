'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

app.use(cors());

const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;

let test1 = [];
//create a route with a method of get and a path of location
app.get('/location', (request, response) => {
    try {
        let locationData = getData(request.query.data);
        response.send(locationData);
    } catch (error) {
        console.log('There was an error!');
    }
});

app.get('/weather', (request, response) => {
    try {
        let jsonData = require('./data/darksky.json');
        const test = Object.values(jsonData.daily.data);
        // let test2 = test.map(data => new Weather(data));
        response.send();
    } catch (error) {
        console.log('There was an error loading the weather data')
    }
})

//function to be invoked by the get() 

function getData(locationName) {
    let jsonData = require('./data/geo.json');
    let location = new Location(locationName, jsonData);
    return location;
}

// function constructor
function Location(query, jsonData) {
    this.sear_query = query;
    this.formatted_query = jsonData.results[0].formatted_address, this.latitude = jsonData.results[0].geometry.location.lat, this.longitude = jsonData.results[0].geometry.location.lng
}

function Weather(data) {
    this.summary = data.summary;
    this.time = new Date(data.time * 1000).toString().slice(0,15);
}

function search(request, response) {
    const locationName = request.query.data;
    const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${GEOCODE_API_KEY}`;
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))