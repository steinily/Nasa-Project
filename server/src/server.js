const http = require('http');

require('dotenv').config();
const app = require('./app');
const { loadPlanetsData, } = require('./models/planets.models')
const { mongoConnecnt } = require('./services/mongo')
const {loadLaunchData} = require('./models/launches.models')

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
const mongoose=require('mongoose')


async function startServer(){

    await mongoConnecnt();    
    await loadPlanetsData();
    await loadLaunchData();
    server.listen(PORT , () => {
        console.log(` Listening on port ${PORT}...`)
})
}

startServer();