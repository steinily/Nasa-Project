const http = require('http');
const app = require('./app');
const { loadPlanetsData, } = require('./models/planets.models')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 8000;


const MONGO_URL= `mongodb://steinily:samsung@localhost:3000`

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('Mongose connection ready!')
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function startServer(){
    await mongoose.connect(MONGO_URL);    
    await loadPlanetsData();
    server.listen(PORT , () => {
        console.log(` Listening on port ${PORT}...`)
})
}

startServer();