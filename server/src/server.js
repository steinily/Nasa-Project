const http = require('http');
const app = require('./app');
const server = http.createServer(app);

const { loadPlanetsData, } = require('./models/planets.models')
const { mongoConnecnt } = require('./services/mongo')

const PORT = process.env.PORT || 8000;

const mongoose=require('mongoose')


async function startServer(){

    await mongoConnecnt();    
    await loadPlanetsData();
    server.listen(PORT , () => {
        console.log(` Listening on port ${PORT}...`)
})
}

startServer();